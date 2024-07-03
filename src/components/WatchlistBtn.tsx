import { useState } from 'react'
import './styles/WatchListBtn.css'

const PlusIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    fill='none'
    stroke='slategray'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='12' y1='5' x2='12' y2='19' />
    <line x1='5' y1='12' x2='19' y2='12' />
  </svg>
)

const MinusIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    fill='none'
    stroke='slategray'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='5' y1='12' x2='19' y2='12' />
  </svg>
)

type WatchListBtnProps = {
  onClick: () => void
  isWatchedList: boolean
}

export const WatchListButton = ({ onClick, isWatchedList }: WatchListBtnProps) => {
  const [isWatched, setIsWatched] = useState(isWatchedList)

  const handleClick = () => {
    setIsWatched(!isWatched)
    onClick()
  }

  return (
    <>
      <button className='watchlist-button' onClick={handleClick}>
        {isWatched ? <MinusIcon /> : <PlusIcon />}
      </button>
    </>
  )
}
