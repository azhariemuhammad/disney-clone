import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'

import { MovieListPage } from '../pages/MovieListPage'
import { MovieDetailPage } from '../pages/MovieDetailPage'
import { WatchListPage } from '../pages/WatchListPage'
import { TVseriesDetailPage } from '../components/TVseriesDetailPage'

export const routes = (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<MovieListPage />} />
      <Route element={<MovieDetailPage />} />
      <Route path='/movie/:id' element={<MovieDetailPage />} />
      <Route path='/tv/:id' element={<TVseriesDetailPage />} />
      <Route path='/watchlist' element={<WatchListPage />} />
    </Route>
  </Routes>
)
