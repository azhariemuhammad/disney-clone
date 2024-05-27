import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Heading, Text, Image, Spinner, Link, Button } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

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
  episodes: number
  score: number
  rated: string
  url: string
}

const fetchAnime = async (id: string): Promise<Anime> => {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
  const data = await response.json()
  return data
}

export const AnimeDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery({ queryKey: [{ id }], queryFn: () => fetchAnime(id || '') })
  const anime = data?.data

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' mt='4'>
        <Spinner size='xl' />
      </Box>
    )
  }

  if (!anime) {
    return (
      <Box textAlign='center' mt='4'>
        <Text fontSize='xl'>Anime not found.</Text>
      </Box>
    )
  }

  return (
    <Box p='4'>
      <Button as={RouterLink} to='/' colorScheme='teal' variant='outline' mb='4'>
        Back
      </Button>
      <Heading as='h2' size='xl' mb='4'>
        {anime.title}
      </Heading>
      <Box display='flex' alignItems='center' justifyContent='center' mb='4'>
        <Image src={anime.images.webp.image_url} alt={anime.title} maxWidth='200px' />
      </Box>
      <Text fontSize='lg' mb='2'>
        Synopsis: {anime.synopsis}
      </Text>
      <Text fontSize='lg' mb='2'>
        Episodes: {anime.episodes}
      </Text>
      <Text fontSize='lg' mb='2'>
        Score: {anime.score}
      </Text>
      <Text fontSize='lg' mb='2'>
        Rated: {anime.rated}
      </Text>
      <Link href={anime.url} isExternal color='teal.500' fontWeight='bold'>
        More info
      </Link>
    </Box>
  )
}
