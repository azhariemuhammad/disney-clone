import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { routes } from './routes'

const App: React.FC = () => {
  return (
    <Router>
      <Box p='4'>
        <Heading as='h1' size='xl' textAlign='center' mb='4'>
          Awesome Anime
        </Heading>
        {routes}
      </Box>
    </Router>
  )
}

export default App
