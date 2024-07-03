import { Link, matchRoutes, useLocation } from 'react-router-dom'
import './styles/Sidebar.css'
import { routes } from '../routes'

const SearchIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-search'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
      <path d='M21 21l-6 -6' />
    </svg>
  )
}

const HomeIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-home'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M5 12l-2 0l9 -9l9 9l-2 0' />
      <path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />
      <path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
    </svg>
  )
}

const WatchlistIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-watchlist'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 4h16v12h-16z' />
      <path d='M8 8h8v8h-8z' />
    </svg>
  )
}

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <nav>
        <ul>
          <Link to='/'>
            <li>
              <SearchIcon />
            </li>
          </Link>
          <Link to='/'>
            <li>
              <HomeIcon />
            </li>
          </Link>
          <Link to='/watchlist'>
            <li>
              <WatchlistIcon />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}
