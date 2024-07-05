// using vitest
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { MovieListPage } from '../pages/MovieListPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { moviesAndTvSeriesQuery, moviesQuery, tvSeriesQuery } from '../__mocks__/data'

vi.mock('@tanstack/react-query', async importOriginal => {
  const original = await importOriginal()
  return {
    ...original,
    useQueries: vi.fn(() => [moviesAndTvSeriesQuery, moviesQuery, tvSeriesQuery]),
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

    expect(screen.getByText('Top Rated Movies of the Week')).toBeInTheDocument()
    expect(screen.getByText('Top Rated TV Series of the Week')).toBeInTheDocument()
    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 2')).toBeInTheDocument()
    expect(screen.getByText('TV Series 1')).toBeInTheDocument()
  })
})
