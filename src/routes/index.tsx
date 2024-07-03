import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'

import { MovieListPage } from '../pages/MovieListPage'
import { MovieDetailPage } from '../pages/MovieDetailPage'

export const routes = (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<MovieListPage />} />
      <Route element={<MovieDetailPage />} />
      <Route path='/anime/:id' element={<MovieDetailPage />} />
    </Route>
  </Routes>
)
