import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { AnimeListPage } from '../pages/AnimeListPage'

const mockData = {
  data: [
    {
      mal_id: 1,
      images: {
        webp: {
          image_url: 'https://example.com/image1.jpg'
        }
      },
      title: 'One Piece',
      synopsis: 'The great pirate, Monkey D. Luffy...',
    },
    {
      mal_id: 2,
      images: {
        webp: {
          image_url: 'https://example.com/image2.jpg'
        }
      },
      title: 'Naruto',
      synopsis: 'Naruto Uzumaki is a young ninja...',
    },
  ],
  pagination: {
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 2,
      total: 2,
      per_page: 25,
    },
  }
}

const queryClient = new QueryClient()

jest.mock('@tanstack/react-query', () => {
  const originalModule = jest.requireActual('@tanstack/react-query');
  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

const mockedFetchAnimes = jest.fn().mockResolvedValueOnce({ data: { data: mockData, pagination: mockData }, error: false })

describe('AnimeListPage', () => {
  beforeEach(() => {
    useQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      isError: false,
    }));
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders search bar and anime list correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AnimeListPage />
        </BrowserRouter>
      </QueryClientProvider>,
    )

    // Check that the search bar is rendered
    const searchBar = screen.getByPlaceholderText('Search anime...')
    expect(searchBar).toBeInTheDocument()

    // Check that the anime list items are rendered
    await waitFor(async () => {
      const animeTitles = await screen.findByText(mockData.data[0].title)
      expect(animeTitles).toBeInTheDocument()
    })
  })
})
