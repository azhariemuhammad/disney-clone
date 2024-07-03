import React from 'react'
import { MovieCard } from './MovieCard'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { Movie } from '../types'

interface MovieListProps {
  movies: Movie[]
}

export const List = ({ movies }: MovieListProps) => {
  console.log({ movies })
  if (movies.length === 0) {
    return (
      <Box textAlign='center' mt='4' minH='300px'>
        <Text fontSize='xl'>No anime found.</Text>
      </Box>
    )
  }

  return (
    <SimpleGrid columns={[1, null, 2, 3, 4]} spacing='4' w='full' h='100%'>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  )
}
