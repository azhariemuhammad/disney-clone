import fs from 'fs/promises';
import express from 'express';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const __dirname = path.dirname(import.meta.url);

const PORT = 3003;
const resolve = (p) => path.resolve(__dirname, p);

const getStyleSheets = async () => {
	const assetpath = 'dist/client/assets';
	const files = await fs.readdir(assetpath);
	const cssAssets = files.filter((l) => l.endsWith('.css'));
	const allContent = [];
	for (const asset of cssAssets) {
		const content = await fs.readFile(path.join(assetpath, asset), 'utf-8');
		allContent.push(`<style type="text/css">${content}</style>`);
	}
	return allContent.join('\n');
};

async function createServer(
	root = process.cwd(),
	isProd = process.env.NODE_ENV === 'production',
	hmrPort
) {
	const app = express();

	const vite = await createViteServer({
		root,
		server: {
			middlewareMode: true,
			hmr: {
				port: hmrPort,
			},
		},
		appType: 'custom',
	});
	app.use(vite.middlewares);

	app.use(
		(await import('serve-static')).default(resolve('dist/client'), {
			index: false,
		})
	);

	const stylesheets = getStyleSheets();

	app.get('*', async (req, res) => {
	
		try {
			const url = req.originalUrl;
			let template = await fs.readFile('dist/client/index.html', 'utf-8');
			const queryClient = new QueryClient({
				defaultOptions: {
				  queries: {
					staleTime: 60 * 1000,
				  },
				},
			});
			const { fetchMovies, movieParams, topRatedMovies, topRatedAll } = await vite.ssrLoadModule('/src/lib/fetcher.ts');

			
			await Promise.all([await queryClient.prefetchQuery(
				{
					queryKey: ['moviesAndTvSeries'],
					queryFn: () => fetchMovies(`${topRatedAll}${movieParams}`),
				  },
			), await queryClient.prefetchQuery(
				{
					queryKey: ['movies'],
					queryFn: () => fetchMovies(`${topRatedMovies}${movieParams}`),
				  },
			), await queryClient.prefetchQuery(
				{
					queryKey: ['tvSeries'],
					queryFn: () => fetchMovies(`${topRatedTvSeries}${movieParams}`),
				  },
			)]);
			
			const dehydratedState = dehydrate(queryClient);
		
			template = await vite.transformIndexHtml(url, template);
			const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

			const appHtml = render(url, queryClient, dehydratedState);

			const cssAssets =  await stylesheets;
			const html = template
				.replace(`App is loading...`, appHtml)
				.replace('<!--head-->', `${cssAssets}\n<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState).replace(/</g, '\\u003c')}</script>`);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
			!isProd && vite.ssrFixStacktrace(e);
			res.status(500).end(e.stack);
		}
	});
	return { app, vite };
}

createServer().then(({ app }) =>
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	})
);
