import { routes } from './routes'
import { Sidebar } from './components/Sidebar'
import './styles.css'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <h1 className='large-text-center'>Movie DB</h1>
        {routes}
        <Sidebar />
      </div>
    </Router>
  )
}

export default App
