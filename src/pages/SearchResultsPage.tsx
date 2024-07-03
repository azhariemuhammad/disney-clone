import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { tmdbApiKey } from '../config'
import { List } from '../components/MovieList'

const queryMovies = async (query: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${tmdbApiKey}`)
  const data = await response.json()
  return data
}

function format(query: string) {
  return query.replace(/(\w+)/g, match => match.charAt(0).toUpperCase() + match.slice(1))
}

export const SearchResultsPage = () => {
  const { query = '' } = useParams<{ query: string }>()
  const [{ data, isLoading, error }] = useQueries({
    queries: [{ queryKey: ['search', { query }], queryFn: () => queryMovies(query) }],
  })

  const movies = data?.results || []

  return (
    <div className='container container-sm-padding container-sm-margin'>
      {isLoading ? (
        <div className='spinner'></div>
      ) : error ? (
        <p className='error-text'>Error fetching data</p>
      ) : (
        <section>
          <div className='top-rated'>
            <h2>Results for "{format(query)}"</h2>
            <List movies={movies} />
          </div>
        </section>
      )}
    </div>
  )
}
