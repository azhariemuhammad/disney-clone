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
  const { addToWatchList, removeFromWatchList, checkIfWatched } = useWatchList()
  const isWatched = checkIfWatched(String(movie.id))

  return (
    <Link to={isTvSeries ? `/tv/${movie.id}` : `/movie/${movie.id}`}>
      <div className='movie-card'>
        <div className='aspect-ratio'>
          <LazyImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className='movie-details'>
          <h3>{movie.title || movie.name}</h3>
          <p className='overview truncate'>{movie.overview}</p>
          <WatchListButton
            onClick={() =>
              isWatched
                ? removeFromWatchList(String(movie.id))
                : addToWatchList({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    overview: movie.overview,
                  })
            }
            isWatchedList={isWatched}
          />
        </div>
      </div>
    </Link>
  )
}
