import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import About from './components/About'
import Cart from './components/Cart'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import Shop from './components/Shop'
import './index.css'

const router = createBrowserRouter([
 {
    path: "/",
    element: 
        <Navbar />,
    children:[
      {index: true, element: <Homepage />},
      {path:'Cart',element:<Cart/>},
      {path:'About', element:<About/>},
      {path:'Shop',element:<Shop/>}
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
