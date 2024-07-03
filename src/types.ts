export interface Anime {
  mal_id: number
  images: {
    jpg: {
      image_url: string
      large_image_url: string
    }
    webp: {
      image_url: string
      large_image_url: string
    }
  }
  title: string
  synopsis: string
  episodes: number
  score: number
  rating: string
  url: string
  background: string
}

export interface MovieList {
  page: number
  results: Array<Movie>
  total_results: number
  total_pages: number
}

export interface Movie {
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  id: number
  original_language?: string
  original_title?: string
  overview: string
  popularity?: number
  poster_path?: string
  release_date?: string
  title: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  name?: string
}

export type Genre = {
  id: number
  name: string
}

export type ProductionCompany = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export type ProductionCountry = {
  iso_3166_1: string
  name: string
}

export type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: Array<Genre>
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<ProductionCompany>
  production_countries: Array<ProductionCountry>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<SpokenLanguage>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type Episode = {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string
  runtime: number
}

export type Season = {
  id: number
  name: string
  overview: string
  air_date: string
  episode_count: number
  poster_path: string
  season_number: number
  episodes: Array<Episode>
}
export interface TVSeriesDetail {
  id: number
  name: string
  overview: string
  first_air_date: string
  last_air_date: string
  number_of_episodes: number
  number_of_seasons: number
  poster_path: string
  seasons: Array<Season>
  duration: number
  episode_run_time: Array<number>
  genres: Array<Genre>
}

// export type Seasons = Array<Season>
