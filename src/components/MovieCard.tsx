import { Link } from 'react-router-dom'
import useWatchList from '../hooks/useWatchList'
import { Movie } from '../types'
import LazyImage from './LazyImage'
import { WatchListButton } from './WatchlistBtn'
import './styles/MovieCard.css'

interface MovieCardProps {
  movie: Movie
  isTvSeries?: boolean
}

export const MovieCard = ({ movie, isTvSeries }: MovieCardProps) => {
  const { id, title, poster_path, overview, name = '' } = movie
  const { addToWatchList, removeFromWatchList, checkIfWatched } = useWatchList()
  const isWatched = checkIfWatched(String(movie.id))

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    isWatched
      ? removeFromWatchList(String(movie.id))
      : addToWatchList({
          id,
          title: title || name,
          poster_path,
          overview,
        })
  }
  return (
    <div className='movie-card'>
      <Link to={isTvSeries ? `/tv/${id}` : `/movie/${id}`}>
        <div className='aspect-ratio'>
          <LazyImage src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        </div>
        <div className='movie-details'>
          <h3>{title || name}</h3>
          <p className='overview truncate'>{overview}</p>
          <WatchListButton onClick={e => handleClick(e)} isWatchedList={isWatched} />
        </div>
      </Link>
    </div>
  )
}
