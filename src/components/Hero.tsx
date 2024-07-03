import { Movie } from '../types'
import { Slider } from './Slider'
import './styles/Hero.css'
import { WatchListButton } from './WatchlistBtn'

interface MovieHero {
  movies: Array<Movie>
}

export const Hero = ({ movies }: MovieHero) => {
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
              <WatchListButton onClick={() => console.log('clicked')} />
            </div>
          </section>
        ))}
      </Slider>
    </div>
  )
}
