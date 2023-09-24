import './App.css'

import Home from './pages/Home'
import AddEditBlog from './pages/AddEditBlog'
import Auth from './pages/Auth'
import About from './pages/About'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'

import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'


function App() {

  const [active, setActive] = useState("")


  const route = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout setActive={setActive} active={active} />} >
      <Route index element={<Home />} />
      <Route path='create' element={<AddEditBlog />} />
      <Route path='about' element={<About />} />
      <Route path='auth' element={<Auth />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  ))

  return (
    <>
      <ToastContainer />
      <RouterProvider router={route} />
    </>
  )
}

export default App
