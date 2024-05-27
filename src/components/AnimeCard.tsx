import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Image, Heading, Text, Link } from '@chakra-ui/react'

interface AnimeCardProps {
  anime: {
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
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='4' boxShadow='md'>
      <Image src={anime.images.webp.image_url} alt={anime.title} mb='4' w='full' h='300px' />
      <Heading as='h3' size='md' mb='2'>
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
