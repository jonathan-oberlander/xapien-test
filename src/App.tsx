import { Outlet } from 'react-router-dom'
import { Nav } from './components/nav'

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '30px',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <h2>Clients</h2>
      <Nav />
      <Outlet />
    </div>
  )
}
