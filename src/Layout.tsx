import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

function Layout() {
  return (
    <Box maxW='1200px' mx='auto' px='4'>
      <Outlet />
    </Box>
  )
}

export default Layout
