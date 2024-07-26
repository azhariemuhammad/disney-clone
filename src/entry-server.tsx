import React from 'react'

import ReactDOMServer from 'react-dom/server'
import { QueryClient, HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { StaticRouter } from 'react-router-dom/server'

import App from './App'

export function render(url: string, queryClient: QueryClient, dehydratedState: any) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </StaticRouter>,
  )
}
