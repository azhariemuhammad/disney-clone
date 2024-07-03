import { Box, Heading, Button, Stack, Slide } from '@chakra-ui/react'

import { Movie } from '../types'
import { Slider } from './Slider'

interface MovieHero {
  movies: Array<Movie>
}

export const Hero = ({ movies }: MovieHero) => {
  return (
    <Slider width='1200px'>
      {movies.slice(0, 5).map(movie => (
        <Box
          as='section'
          bgImage={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          bgSize='cover'
          bgPosition='center'
          bgRepeat='no-repeat'
          color='white'
          textAlign='left'
          py={20}
          height='600px'
          mb={30}
          borderRadius='md'
          w='1200px'
        >
          <Stack spacing={8} maxW='container.lg' textAlign='left' px={6} margin={0}>
            <Heading as='h1' size='2xl' fontWeight='bold'>
              {movie.title}
            </Heading>
            <Button
              colorScheme='teal'
              size='md'
              px={8}
              py={6}
              borderRadius='full'
              w='120px'
              _hover={{ bg: 'teal.500' }}
            >
              Get Started
            </Button>
          </Stack>
        </Box>
      ))}
    </Slider>
  )
}
