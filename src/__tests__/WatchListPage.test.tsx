// using vitest
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { WatchListPage } from '../pages/WatchListPage'
import { moviesQuery } from '../__mocks__/data'
import { Provider as JotaiProvider } from 'jotai'
import { watchListAtom } from '../atom/watchlistAtom'
import { useHydrateAtoms } from 'jotai/utils'

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues)
  return children
}

const TestProvider = ({ initialValues, children }) => (
  <JotaiProvider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </JotaiProvider>
)

vi.mock('react-router-dom', () => ({
  Link: ({ children }) => <a>{children}</a>,
}))

// @ts-ignore
window.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('WatchListPage', () => {
  it('renders WatchListPage', async () => {
    render(
      <TestProvider initialValues={[[watchListAtom, [moviesQuery.data?.results[0], moviesQuery.data?.results[1]]]]}>
        <WatchListPage />
      </TestProvider>,
    )

    expect(screen.getByText('Movie 2')).toBeInTheDocument()
    expect(screen.getByText('Overview of movie 2')).toBeInTheDocument()
  })

  it('should be able to remove a movie from watchlist', async () => {
    render(
      <TestProvider initialValues={[[watchListAtom, [moviesQuery.data?.results[0], moviesQuery.data?.results[1]]]]}>
        <WatchListPage />
      </TestProvider>,
    )

    const movie = screen.queryByText('Movie 1')
    expect(movie).toBeInTheDocument()
    const removeButton = screen.getAllByTestId('remove-button')
    fireEvent.click(removeButton[0])
    expect(movie).not.toBeInTheDocument()
  })
})
