import React from 'react'
import { routes } from './routes'
import { Sidebar } from './components/Sidebar'
import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
      <div className='app-container'>
        <h1 className='large-text-center'>Movie DB</h1>
        {routes}
        <Sidebar />
      </div>
    </QueryClientProvider>
  )
}

export default App
