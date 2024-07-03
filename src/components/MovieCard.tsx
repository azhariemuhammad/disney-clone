import { Movie } from '../types'
import LazyImage from './LazyImage'
import { WatchListButton } from './WatchlistBtn'
import './styles/MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className='movie-card'>
      <div className='aspect-ratio'>
        <LazyImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className='movie-details'>
        <h3>{movie.title || movie.name}</h3>
        <p className='overview truncate'>{movie.overview}</p>
        <WatchListButton onClick={() => console.log('clicked')} />
      </div>
    </div>
  )
}