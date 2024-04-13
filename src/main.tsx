import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App.tsx'
import { CompanyView } from './components/CompanyView.tsx'
import { ErrorBoundary } from './components/errorBoundary.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    ErrorBoundary,
    children: [
      {
        path: ':companyName',
        ErrorBoundary,
        element: <CompanyView />,
      },
    ],
  },
  {
    path: '/404',
    element: <h1>404</h1>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
