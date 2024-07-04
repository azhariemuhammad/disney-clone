import fs from 'fs/promises';
import express from 'express';

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

			template = await vite.transformIndexHtml(url, template);
			const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

			const context = {};
			const appHtml = render(url, context);

			if (context.url) {
				// Somewhere a `<Redirect>` was rendered
				return res.redirect(301, context.url);
			}

			const cssAssets = isProd ? '' : await stylesheets;
			const html = template
				.replace(`App is loading...`, appHtml)
				.replace('<!--head-->', cssAssets);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      console.log('eer', e)
			!isProd && vite.ssrFixStacktrace(e);
			console.log(e.stack);
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
