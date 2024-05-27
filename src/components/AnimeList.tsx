import React from 'react'
import { AnimeCard } from './AnimeCard'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'

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
  if (animes.length === 0) {
    return (
      <Box textAlign='center' mt='4' minH='300px'>
        <Text fontSize='xl'>No anime found.</Text>
      </Box>
    )
  }

  return (
    <SimpleGrid columns={[1, null, 2, 3, 4]} spacing='4' minH='300px'>
      {animes.map(anime => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </SimpleGrid>
  )
}
