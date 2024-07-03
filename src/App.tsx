import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { routes } from './routes'
import './styles.css'
import { Sidebar } from './components/Sidebar'
import { Modal } from './components/ModalSearch'
import { useAtom } from 'jotai'
import { modalAtom } from './atom/modalAtom'

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useAtom(modalAtom)

  return (
    <Router>
      <Box p='4'>
        {/* <Heading as='h1' size='xl' textAlign='center' mb='4'>
          MOVIE DB
        </Heading> */}
        {routes}
        <Sidebar />
        <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </Box>
    </Router>
  )
}

export default App
