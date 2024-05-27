export interface Anime {
  mal_id: number
  images: {
    jpg: {
      image_url: string
    }
    webp: {
      image_url: string
    }
  }
  title: string
  synopsis: string
  episodes: number
  score: number
  rating: string
  url: string
}
