import { MovieContentDetail } from './MovieContentDetail'
import { TVSeriesDetail } from '../types'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { tmdbApiKey } from '../config'

const fetchTVseriesById = async (id: string): Promise<TVSeriesDetail> => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${tmdbApiKey}`)
  const data = await response.json()
  return data
}

export const TVseriesDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading } = useQuery({ queryKey: [{ id }], queryFn: () => fetchTVseriesById(id || '') })
  console.log({ data, error, isLoading })

  return (
    <div
      className='container c
    ontainer-sm-padding container-sm-margin'
    >
      {isLoading ? (
        <div className='spinner'></div>
      ) : data ? (
        <MovieContentDetail tvSeries={data} />
      ) : (
        <p className='error-text'>Error fetching data</p>
      )}
    </div>
  )
}
