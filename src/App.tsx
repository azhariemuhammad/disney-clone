import React from 'react'
import { routes } from './routes'
import { Sidebar } from './components/Sidebar'
import './styles.css'
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query'

const dehydratedState = typeof window !== 'undefined' ? window.__REACT_QUERY_STATE__ : {}

const App = () => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <div className='app-container'>
          <h1 className='large-text-center'>Movie DB</h1>
          {routes}
          <Sidebar />
        </div>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default App
