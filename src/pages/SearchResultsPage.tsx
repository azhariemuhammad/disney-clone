import { UseQueryOptions, UseQueryResult, useQueries } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { tmdbApiKey } from '../config'
import { List } from '../components/MovieList'
import { SearchBar } from '../components/ModalSearch'
import { MovieList, TVSeriesDetail } from '../types'

const queryMovies = async (query: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${tmdbApiKey}`)
  const data = await response.json()
  return data
}

const tvseriesQueryMovies = async (query: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${tmdbApiKey}`)
  const data = await response.json()
  return data
}

function format(query: string) {
  return query.replace(/(\w+)/g, match => match.charAt(0).toUpperCase() + match.slice(1))
}

export const SearchResultsPage = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get('query') ?? ''

  const queryOptions: UseQueryOptions<MovieList | TVSeriesDetail, Error>[] = [
    {
      queryKey: ['movies', { query }],
      queryFn: () => queryMovies(query),
    },
    {
      queryKey: ['tvSeries', { query }],
      queryFn: () => tvseriesQueryMovies(query),
    },
  ]

  const queryResults: UseQueryResult<MovieList, Error>[] = useQueries({ queries: queryOptions })
  const [moviesQuery, tvseriesQuery] = queryResults

  const { data: moviesData, isLoading: moviesIsLoading, error: moviesError } = moviesQuery
  const { data: tvseriesData } = tvseriesQuery

  return (
    <>
      <div className='container container-sm-padding container-sm-margin'>
        <SearchBar />
        {moviesIsLoading ? (
          <div className='spinner'></div>
        ) : moviesError ? (
          <p className='error-text'>Error fetching data</p>
        ) : (
          <section>
            <div className='movie-list'>
              <h2>Results for "{format(query)}"</h2>
            </div>
            <div className='movie-list'>
              <h3>Movies</h3>
              <List movies={moviesData?.results?.slice(0, 10) ?? []} />
            </div>
            <div className='movie-list'>
              <h3>TV Series</h3>
              <List movies={tvseriesData?.results?.slice(0, 10) ?? []} isTvSeries />
            </div>
          </section>
        )}
      </div>
    </>
  )
}
