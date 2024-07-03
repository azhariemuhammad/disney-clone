import React, { useState } from 'react'
import './styles/ModalSearch.css'
import { Search, useNavigate } from 'react-router-dom'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}
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

export const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>
          ×
        </button>
        <div className='modal-content'>
          <SearchBar onClose={onClose} onKeyDown={handleKeyDown} />
        </div>
      </div>
    </div>
  )
}

const SearchBar = ({ onClose, onKeyDown }: SearchBarProps) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onClose()
    navigate(`/search/${query}`)
  }

  return (
    <form onSubmit={handleSearch} className='search-form' onKeyDown={onKeyDown}>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='Search...'
        className='search-input'
      />
      <button type='submit' className='search-button'>
        <SearchIcon />
      </button>
    </form>
  )
}
