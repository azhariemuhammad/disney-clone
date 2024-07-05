import React, { useEffect, useState } from 'react'
import './styles/ModalSearch.css'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'

type SearchBarProps = {
  onClose: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLFormElement>) => void
}

export const SearchIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='11' cy='11' r='8'></circle>
    <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
  </svg>
)

export const SearchBar = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const queryDebounced = useDebounce(query, 500)

  useEffect(() => {
    if (queryDebounced) {
      navigate(`/search?query=${queryDebounced}`)
    }
  }, [queryDebounced])

  return (
    <form className='search-form'>
      <input
        role='searchbox'
        type='text'
        value={query}
        onChange={e => {
          setQuery(e.target.value)
        }}
        placeholder='Search...'
        className='search-input'
      />
      <button type='submit' className='search-button'>
        <SearchIcon />
      </button>
    </form>
  )
}
