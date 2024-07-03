import { useState } from 'react'
import { UseQueryOptions, UseQueryResult, useQueries } from '@tanstack/react-query'
import { List } from '../components/MovieList'
import { MovieList } from '../types'
import { Hero } from '../components/Hero'
import { tmdbApiKey } from '../config'
import './movieListPage.css'

// Top Rated Movie of the week
const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}`
const topRatedTvSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${tmdbApiKey}`

const fetchMovies = async (url: string): Promise<MovieList> => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export const MovieListPage = () => {
  const queryOptions: UseQueryOptions<MovieList, Error>[] = [
    {
      queryKey: ['movies'],
      queryFn: () => fetchMovies(`${topRatedMovies}&include_adult=false&include_video=true&language=en-US&page=1`),
    },
    {
      queryKey: ['tvSeries'],
      queryFn: () => fetchMovies(`${topRatedTvSeries}&include_adult=false&include_video=true&language=en-US&page=1`),
    },
  ]

  const queryResults: UseQueryResult<MovieList, Error>[] = useQueries({ queries: queryOptions })

  const [moviesQuery, tvSeriesQuery] = queryResults
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
            <Hero movies={movies || {}} />
          </div>
          <section>
            <div className='top-rated'>
              <h2>Top Rated Movies</h2>
              <List movies={movies.slice(0, 8)} />
            </div>
            <div className='top-rated'>
              <h2>Top Rated TV Series</h2>
              <List movies={tvSeries.slice(0, 8)} isTvSeries />
            </div>
          </section>
        </>
      )}
    </div>
  )
}
