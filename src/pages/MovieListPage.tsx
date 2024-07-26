import { UseQueryOptions, UseQueryResult, useQueries } from '@tanstack/react-query'
import { List } from '../components/MovieList'
import { MovieList } from '../types'
import { Hero } from '../components/Hero'
import './movieListPage.css'
import { fetchMovies, movieParams, topRatedAll, topRatedMovies, topRatedTvSeries } from '../lib/fetcher'

export const MovieListPage = () => {
  const queryOptions: UseQueryOptions<MovieList, Error>[] = [
    {
      queryKey: ['moviesAndTvSeries'],
      queryFn: () => fetchMovies(`${topRatedAll}${movieParams}`),
    },
    {
      queryKey: ['movies'],
      queryFn: () => fetchMovies(`${topRatedMovies}${movieParams}`),
    },
    {
      queryKey: ['tvSeries'],
      queryFn: () => fetchMovies(`${topRatedTvSeries}${movieParams}`),
    },
  ]

  const queryResults: UseQueryResult<MovieList, Error>[] = useQueries({ queries: queryOptions })

  const [moviesAndTvSeries, moviesQuery, tvSeriesQuery] = queryResults
  const moviesAndTvs = moviesAndTvSeries?.data?.results || []
  const movies = moviesQuery?.data?.results || []
  const moviesIsLoading = moviesQuery?.isLoading
  const moviesError = moviesQuery?.error
  const tvSeries = tvSeriesQuery?.data?.results || []

  return (
    <div className='container container-sm-padding container-sm-margin'>
      {moviesIsLoading ? (
        <div className='spinner'></div>
      ) : moviesError ? (
        <p className='error-text'>Error fetching data</p>
      ) : (
        <>
          <div className='hero-container hero-container-sm-padding hero-container-sm-margin'>
            <Hero movies={moviesAndTvs} />
          </div>
          <section>
            <div className='movie-list'>
              <h2>Top Rated Movies of the Week</h2>
              <List movies={movies.slice(0, 8)} />
            </div>
            <div className='movie-list'>
              <h2>Top Rated TV Series of the Week</h2>
              <List movies={tvSeries.slice(0, 8)} isTvSeries />
            </div>
          </section>
        </>
      )}
    </div>
  )
}
