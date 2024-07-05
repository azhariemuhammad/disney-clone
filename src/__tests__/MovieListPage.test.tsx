// using vitest
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import { MovieListPage } from '../pages/MovieListPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { moviesQuery, tvSeriesQuery } from '../__mocks__/data'

vi.mock('@tanstack/react-query', async importOriginal => {
  const original = await importOriginal()
  return {
    ...original,
    useQueries: vi.fn(() => [moviesQuery, tvSeriesQuery]),
  }
})

vi.mock('react-router-dom', () => ({
  Link: ({ children }) => <a>{children}</a>,
  useNavigate: vi.fn(),
}))

// @ts-ignore
window.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('MovieListPage', () => {
  const queryClient = new QueryClient()

  it('renders MovieListPage', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MovieListPage />
      </QueryClientProvider>,
    )
    await waitFor(() => expect(screen.getByText('Top Rated Movies')).toBeInTheDocument())

    expect(screen.getAllByText('Movie 1')).toHaveLength(2)
    expect(screen.getAllByText('Movie 2')).toHaveLength(2)

    expect(screen.getAllByText('TV Series 1')).toHaveLength(1)
  })
})
