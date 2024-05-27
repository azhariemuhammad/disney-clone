import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AnimeListPage } from './pages/AnimeListPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AnimeListPage />} />
      </Routes>
    </Router>
  )
}

export default App
