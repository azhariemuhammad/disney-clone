import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Button, Spinner, Text } from '@chakra-ui/react'
// import SearchBar from '../components/SearchBar';
import { AnimeList } from '../components/AnimeList'

interface Anime {
  mal_id: number
  image_url: string
  title: string
  synopsis: string
}

const fetchAnimes = async (query: string, page: number): Promise<Anime[]> => {
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=${page}`)
  const data = await response.json()
  return data
}

export const AnimeListPage = () => {
  const [page, setPage] = useState<number>(1)
  const [query, setQuery] = useState<string>('')

  const { data, error, isLoading } = useQuery({ queryKey: [{ page }], queryFn: () => fetchAnimes(query, page) })
  console.log({ data, error, page })

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    setPage(1)
  }

  return (
    <Box p='4' m='8'>
      {/* <SearchBar onSearch={handleSearch} /> */}
      {isLoading ? (
        <Box display='flex' justifyContent='center' mt='4'>
          <Spinner size='xl' />
        </Box>
      ) : error ? (
        <Text color='red.500' mt='4'>
          Error fetching data
        </Text>
      ) : (
        <AnimeList animes={data.data || []} />
      )}
      <Box display='flex' justifyContent='space-between' mt='4'>
        <Button onClick={() => setPage(old => Math.max(old - 1, 1))} isDisabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage(old => (data?.data.length ? old + 1 : old))}>Next</Button>
      </Box>
    </Box>
  )
}
