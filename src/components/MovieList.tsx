import { MovieCard } from './MovieCard'
import { Movie } from '../types'
import './styles/MovieList.css'

interface MovieListProps {
  movies: Movie[]
}

export const List = ({ movies }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className='container'>
        <p className='no-anime-text'>No anime found.</p>
      </div>
    )
  }

  return (
    <div className='grid-container'>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
