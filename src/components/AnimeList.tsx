import React from 'react'
import { AnimeCard } from './AnimeCard'
import { SimpleGrid } from '@chakra-ui/react'

interface Anime {
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
}

interface AnimeListProps {
  animes: Anime[]
}

export const AnimeList = ({ animes }: AnimeListProps) => {
  return (
    <SimpleGrid columns={[1, null, 2, 3, 4]} spacing='4'>
      {animes.map(anime => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </SimpleGrid>
  )
}
