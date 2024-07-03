import { MovieDetail, TVSeriesDetail } from '../types'
import { WatchListButton } from './WatchlistBtn'
import useWatchList from '../hooks/useWatchList'
import '../components/styles/Hero.css'

type MovieContentDetailProps = {
  movie?: MovieDetail
  tvSeries?: TVSeriesDetail
}

type MovieContentProps = {
  children: React.ReactNode
  movie: MovieDetail
}

type TVSeriesContentProps = {
  children: React.ReactNode
  tvSeries: TVSeriesDetail
}

const MovieContent = ({ children, movie }: MovieContentProps) => {
  return (
    <div className='hero-content bg-transparant'>
      <h1>{movie.title}</h1>
      <p className='overview'>{movie.overview}</p>
      <p className='hero-date'>{movie.release_date}</p>
      <p className='hero-genres'>{movie.genres.map(genre => genre.name).join(', ')}</p>
      {children}
    </div>
  )
}

const TVSeriesContent = ({ children, tvSeries }: TVSeriesContentProps) => {
  return (
    <div className='hero-content bg-transparant'>
      <h1>{tvSeries.name}</h1>
      <p className='overview'>{tvSeries.overview}</p>
      <div className='flex'>
        <p className='hero-date'>{tvSeries.number_of_seasons} Seasons</p>
        <p className='hero-date'>{tvSeries.number_of_episodes} Episodes</p>
      </div>
      <p>Playback time: {tvSeries.episode_run_time?.[0]} Minutes</p>
      <p className='hero-genres'> {tvSeries.genres.map(genre => genre.name).join(', ')}</p>
      {children}
    </div>
  )
}
export const MovieContentDetail = ({ movie, tvSeries }: MovieContentDetailProps) => {
  const { addToWatchList, removeFromWatchList, checkIfWatched } = useWatchList()

  return (
    <div className='hero-slide'>
      {movie && (
        <section
          key={movie.id}
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})` }}
        >
          <MovieContent movie={movie}>
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
          </MovieContent>
        </section>
      )}

      {tvSeries && (
        <section
          key={tvSeries.id}
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvSeries.poster_path})` }}
        >
          <TVSeriesContent tvSeries={tvSeries}>
            <WatchListButton
              onClick={() =>
                checkIfWatched(String(tvSeries.id))
                  ? removeFromWatchList(String(tvSeries.id))
                  : addToWatchList({
                      id: tvSeries.id,
                      title: tvSeries.name,
                      poster_path: tvSeries.poster_path,
                      overview: tvSeries.overview,
                    })
              }
              isWatchedList={checkIfWatched(String(tvSeries.id))}
            />
          </TVSeriesContent>
        </section>
      )}

      {/* //TODO: more like movies */}
    </div>
  )
}
