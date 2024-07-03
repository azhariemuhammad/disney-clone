import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Center, Spinner, Text } from '@chakra-ui/react'
import { List } from '../components/MovieList'
import { SearchBar } from '../components/SearchBar'
import { PaginationButtons } from '../components/PaginationButtons'
import { MovieList } from '../types'
import { Hero } from '../components/Hero'
import { tmdbApiKey } from '../config'

interface PaginationData {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}`

const fetchMovies = async (query: string, page: number): Promise<MovieList> => {
  const response = await fetch(
    `${url}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
  )
  const data = await response.json()
  console.log({ data2: data })
  return data
}

export const MovieListPage = () => {
  const [page, setPage] = useState<number>(1)
  const [query, setQuery] = useState<string>('')

  const { data, error, isLoading } = useQuery({ queryKey: [{ page, query }], queryFn: () => fetchMovies(query, page) })

  console.log({ data: data?.results, error, isLoading })
  // const paginationData = data?.pagination

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    setPage(1)
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <Box p={['0', '4']} m={['0', '8']} minH='300px'>
      <Center>
        <SearchBar onSearch={handleSearch} />
      </Center>
      {isLoading ? (
        <Box display='flex' justifyContent='center' mt='12'>
          <Spinner size='xl' />
        </Box>
      ) : error ? (
        <Text color='red.500' mt='4'>
          Error fetching data
        </Text>
      ) : (
        <>
          <Box width='100%' height='100%' position='relative' overflow='hidden' p={['0', '4']} m={['0', '8']}>
            <Hero movies={data?.results || {}} />
          </Box>
          <List movies={data?.results || []} />
        </>
      )}
      {/* {paginationData && (
        <PaginationButtons
          currentPage={paginationData.current_page}
          lastVisiblePage={paginationData.last_visible_page}
          hasNextPage={paginationData.has_next_page}
          onPageChange={handlePageChange}
        />
      )} */}
    </Box>
  )
}
