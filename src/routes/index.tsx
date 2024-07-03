import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'

import { MovieListPage } from '../pages/MovieListPage'
import { MovieDetailPage } from '../pages/MovieDetailPage'
import { WatchListPage } from '../pages/WatchListPage'

export const routes = (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<MovieListPage />} />
      <Route element={<MovieDetailPage />} />
      <Route path='/movie/:id' element={<MovieDetailPage />} />
      <Route path='/watchlist' element={<WatchListPage />} />
    </Route>
  </Routes>
)
