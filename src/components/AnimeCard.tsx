import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Image, Heading, Text, Link } from '@chakra-ui/react'
import { Anime } from '../types'
import LazyImage from './LazyImage'

interface AnimeCardProps {
  anime: Anime
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='4' boxShadow='md'>
      <LazyImage
        src={anime.images.webp.image_url}
        alt={anime.title}
        sx={{ marginBottom: '4', width: 'full', height: '300px', borderRadius: 'sm' }}
      />
      <Heading as='h3' size='md' mb='2' data-testid='anime-title'>
        {anime.title}
      </Heading>
      <Text noOfLines={3} mb='4'>
        {anime.synopsis}
      </Text>
      <Link as={RouterLink} to={`/anime/${anime.mal_id}`} color='teal.500' fontWeight='bold'>
        View Details
      </Link>
    </Box>
  )
}
