import useWatchList from '../hooks/useWatchList'
import { Movie } from '../types'
import { Slider } from './Slider'
import './styles/Hero.css'
import { WatchListButton } from './WatchlistBtn'

interface MovieHero {
  movies: Array<Movie>
}

export const Hero = ({ movies }: MovieHero) => {
  const { addToWatchList, removeFromWatchList, checkIfWatched } = useWatchList()

  return (
    <div className='hero-slide'>
      <Slider width='1200px'>
        {movies.slice(0, 5).map(movie => (
          <section
            key={movie.id}
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})` }}
          >
            <div className='hero-content'>
              <h1>{movie.title}</h1>
              <p className='truncate'>{movie.overview}</p>
              <WatchListButton
                onClick={() =>
                  checkIfWatched(String(movie.id))
                    ? removeFromWatchList(String(movie.id))
                    : addToWatchList({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        overview: movie.overview,
                      })
                }
                isWatchedList={checkIfWatched(String(movie.id))}
              />
            </div>
          </section>
        ))}
      </Slider>
    </div>
  )
}
