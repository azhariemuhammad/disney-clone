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
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  name: string
}
