import React from 'react'
import { Button, Flex } from '@chakra-ui/react'

interface PaginationButtonsProps {
  currentPage: number
  lastVisiblePage: number
  hasNextPage: boolean
  onPageChange: (pageNumber: number) => void
}

export const PaginationButtons = ({
  currentPage,
  lastVisiblePage,
  hasNextPage,
  onPageChange,
}: PaginationButtonsProps) => {
  const renderPageButtons = () => {
    let startPage = Math.max(currentPage - 2, 1) // Start 2 pages before the current page
    let endPage = Math.min(startPage + 4, lastVisiblePage) // Show 5 pages, or less if near the end

    // Adjust the start and end pages if the endPage is less than 5
    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1)
    }

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button key={i} colorScheme={i === currentPage ? 'teal' : 'gray'} onClick={() => onPageChange(i)}>
          {i}
        </Button>,
      )
    }

    return (
      <>
        <Button onClick={() => onPageChange(currentPage - 1)} isDisabled={currentPage === 1}>
          Previous
        </Button>
        {pages}
        <Button onClick={() => onPageChange(currentPage + 1)} isDisabled={!hasNextPage}>
          Next
        </Button>
      </>
    )
  }

  return (
    <Flex justifyContent={['center', 'flex-end']} mt='12' gap={2} flexWrap='wrap'>
      {renderPageButtons()}
    </Flex>
  )
}
