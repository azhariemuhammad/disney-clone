import { useState } from 'react'
import { UseQueryOptions, UseQueryResult, useQueries, useQuery } from '@tanstack/react-query'
import { List } from '../components/MovieList'
import { SearchBar } from '../components/SearchBar'
import { Movie, MovieList } from '../types'
import { Hero } from '../components/Hero'
import { tmdbApiKey } from '../config'
import './movieListPage.css'
import { useEditable } from '@chakra-ui/react'

interface PaginationData {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

// Top Rated Movie of the week
const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}`
const topRatedTvSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${tmdbApiKey}`

const fetchMovies = async (query: string, page: number, url: string): Promise<MovieList> => {
  const response = await fetch(url)
  const data = await response.json()
  console.log({ data2: data })
  return data
}

export const MovieListPage = () => {
  const [page, setPage] = useState<number>(1)
  const [query, setQuery] = useState<string>('')

  const queryOptions: UseQueryOptions<MovieList, Error>[] = [
    {
      queryKey: ['movies', { page, query }],
      queryFn: () =>
        fetchMovies(
          query,
          page,
          `${topRatedMovies}&include_adult=false&include_video=true&language=en-US&page=${page}`,
        ),
    },
    {
      queryKey: ['tvSeries', { page, query }],
      queryFn: () =>
        fetchMovies(
          query,
          page,
          `${topRatedTvSeries}&include_adult=false&include_video=true&language=en-US&page=${page}`,
        ),
    },
  ]

  const queryResults: UseQueryResult<MovieList, Error>[] = useQueries({ queries: queryOptions })

  const [moviesQuery, tvSeriesQuery] = queryResults
  const movies = moviesQuery?.data?.results || []
  const moviesIsLoading = moviesQuery?.isLoading
  const moviesError = moviesQuery?.error
  const tvSeries = tvSeriesQuery?.data?.results || []

  console.log({ moviesQuery, tvSeriesQuery })

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    setPage(1)
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <div className='container container-sm-padding container-sm-margin'>
      {moviesIsLoading ? (
        <div className='spinner'></div>
      ) : moviesError ? (
        <p className='error-text'>Error fetching data</p>
      ) : (
        <>
          <div className='hero-container hero-container-sm-padding hero-container-sm-margin'>
            <Hero movies={movies || {}} />
          </div>
          <section>
            <div className='top-rated'>
              <h2>Top Rated Movies</h2>
              <List movies={movies.slice(0, 8)} />
            </div>
            <div className='top-rated'>
              <h2>Top Rated TV Series</h2>
              <List movies={tvSeries.slice(0, 8)} />
            </div>
          </section>
        </>
      )}
    </div>
  )
}