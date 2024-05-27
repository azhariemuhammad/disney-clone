import React, { useState } from 'react'
import { Box, Input, Button } from '@chakra-ui/react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box display='flex' mb='4'>
      <Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='Search anime...'
        mr='2'
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch} colorScheme='teal'>
        Search
      </Button>
    </Box>
  )
}
