import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { routes } from './routes'
import './styles.css'
import { Sidebar } from './components/Sidebar'

const App = () => {
  return (
    <Router>
      <Box p='4'>
        <Heading as='h1' size='xl' textAlign='center' mb='4'>
          MOVIE DB
        </Heading>
        {routes}
        <Sidebar />
      </Box>
    </Router>
  )
}

export default App
