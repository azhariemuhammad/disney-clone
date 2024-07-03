import { Box, AspectRatio } from '@chakra-ui/react'
import { Movie } from '../types'
import LazyImage from './LazyImage'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Box borderRadius='lg' overflow='hidden' p='4' boxShadow='md' height='100%'>
      <AspectRatio ratio={16 / 9} width='100%'>
        <LazyImage
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{ width: '100%', height: 'auto', borderRadius: 'sm', objectFit: 'cover' }}
        />
      </AspectRatio>
    </Box>
  )
}
