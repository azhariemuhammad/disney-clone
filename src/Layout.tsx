import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

function Layout() {
  return (
    // <Box maxW='1400px' mx={['none', 'auto']} px='4'>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4px' }}>
      <Outlet />
    </div>
    // </Box>
  )
}

export default Layout
