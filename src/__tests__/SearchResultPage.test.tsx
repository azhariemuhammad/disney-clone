// using vitest
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { SearchResultsPage } from '../pages/SearchResultsPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { moviesQuery, tvSeriesQuery } from '../__mocks__/data'

vi.mock('@tanstack/react-query', async importOriginal => {
  const original = await importOriginal()
  return {
    // @ts-ignore
    ...original,
    useQueries: vi.fn(() => [moviesQuery, tvSeriesQuery]),
  }
})

const mockUseNavigate = vi.fn()
const mockUseLocation = vi.fn()

vi.mock('react-router-dom', () => ({
  // @ts-ignore
  Link: ({ children }) => <a>{children}</a>,
  useNavigate: () => mockUseNavigate,
  useLocation: () => mockUseLocation,
  useSearchParams: vi.fn(),
}))

// @ts-ignore
window.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('SearchResultsPage', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  it('should navigate to search page with query param', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchResultsPage />
      </QueryClientProvider>,
    )

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'jack' } })
    expect(screen.getByRole('searchbox')).toHaveValue('jack')
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith('/search?query=jack'))
  })
})
