import { Link, useNavigate } from 'react-router-dom'
import useWatchList from '../hooks/useWatchList'
import { Movie } from '../types'
import { Slider } from './Slider'
import './styles/Hero.css'
import { WatchListButton } from './WatchlistBtn'

interface MovieHero {
  movies: Array<Movie>
  width: string
}

const PlayButtonIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 24 24'
      fill='none'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polygon points='5 3 19 12 5 21 5 3'></polygon>
    </svg>
  )
}

export const Hero = ({ movies, width }: MovieHero) => {
  const navigate = useNavigate()
  const { addToWatchList, removeFromWatchList, checkIfWatched } = useWatchList()

  return (
    <div className='hero-slide'>
      <Slider>
        {movies.slice(0, 5).map(movie => (
          <a key={movie.id}>
            <section
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                ...(width && { width }),
              }}
            >
              <div className='hero-content'>
                <h1>{movie.title}</h1>
                <p className='truncate'>{movie.overview}</p>
                <div className='d-flex'>
                  <button className='play' onClick={() => navigate(`/movie/${movie.id}`)}>
                    <PlayButtonIcon />
                  </button>
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
              </div>
            </section>
          </a>
        ))}
      </Slider>
    </div>
  )
}
