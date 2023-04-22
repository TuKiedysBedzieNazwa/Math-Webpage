import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import App from './main/routes/app/app'
import Calculator from './main/routes/calculator/calculator'
import About from './main/routes/about/about'
import Technologies from './main/routes/technologies/technologies'

import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  }, {
    path: '/Calculator',
    element: <Calculator />
  }, {
    path: 'About',
    element: <About />
  }, {
    path: 'Technologies',
    element: <Technologies />
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
