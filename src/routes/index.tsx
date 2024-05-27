import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'

import { AnimeListPage } from '../pages/AnimeListPage'
import { AnimeDetailPage } from '../pages/AnimeDetailPage'

export const routes = (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<AnimeListPage />} />
      <Route element={<AnimeListPage />} />
      <Route path='/anime/:id' element={<AnimeDetailPage />} />
    </Route>
  </Routes>
)
