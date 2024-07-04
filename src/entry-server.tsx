import React from 'react'

import ReactDOMServer from 'react-dom/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { StaticRouter } from 'react-router-dom/server'

import App from './App'

const queryClient = new QueryClient()

export function render(url: string, context: Record<string, unknown>) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </StaticRouter>,
  )
}
