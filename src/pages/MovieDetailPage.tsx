import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MovieDetail } from '../types'
import { tmdbApiKey } from '../config'
import '../components/styles/Hero.css'
import { MovieContentDetail } from '../components/MovieContentDetail'

const fetchMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`)
  const data = await response.json()
  return data
}

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery({ queryKey: [{ id }], queryFn: () => fetchMovieById(id || '') })

  return (
    <div className='container container-sm-padding container-sm-margin'>
      {isLoading ? (
        <div className='spinner'></div>
      ) : data ? (
        <MovieContentDetail movie={data} />
      ) : (
        <p className='error-text'>Error fetching data</p>
      )}
    </div>
  )
}
