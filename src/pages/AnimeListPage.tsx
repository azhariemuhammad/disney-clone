import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Center, Flex, Spinner, Text } from '@chakra-ui/react'
import { AnimeList } from '../components/AnimeList'
import { SearchBar } from '../components/SearchBar'
import { PaginationButtons } from '../components/PaginationButtons'

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

  const { data, error, isLoading } = useQuery({ queryKey: [{ page, query }], queryFn: () => fetchAnimes(query, page) })
  const paginationData = data?.pagination

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    setPage(1)
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <Box p='4' m='8' minH='300px'>
      <Center>
        <SearchBar onSearch={handleSearch} />
      </Center>
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
      {paginationData && (
        <PaginationButtons
          currentPage={paginationData.current_page}
          lastVisiblePage={paginationData.last_visible_page}
          hasNextPage={paginationData.has_next_page}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  )
}
