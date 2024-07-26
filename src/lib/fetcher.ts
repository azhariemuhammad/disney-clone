import { tmdbApiKey } from '../config'
import { MovieList } from '../types'

export const topRatedAll = `https://api.themoviedb.org/3/trending/all/day?`
export const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?`
export const topRatedTvSeries = `https://api.themoviedb.org/3/tv/top_rated?`
export const movieParams = `&include_adult=false&include_video=true&language=en-US&page=1&api_key=${tmdbApiKey}`

export const fetchMovies = async (url: string): Promise<MovieList> => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}
