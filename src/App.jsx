import './App.css'

import Home from './pages/Home'
import AddEditBlog from './pages/AddEditBlog'
import Auth from './pages/Auth'
import About from './pages/About'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { auth } from './firebase-config'
import { signOut } from 'firebase/auth'
import Detail from './pages/Detail'
import TagBlog from './pages/TagBlog'
import CategoryBlog from './pages/CategoryBlog'


function App() {

  const [active, setActive] = useState("")
  const [user, setUser] = useState(null)
  // const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      setActive("auth")
      // navigate("auth")
    })
  }


  const route = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout setActive={setActive} active={active} user={user} handleLogout={handleLogout} />} >
      <Route index element={<Home setActive={setActive} user={user} />} />
      <Route path='create' element={user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />} />
      <Route path='update/:id' element={user?.uid ? <AddEditBlog user={user} setActive={setActive} /> : <Navigate to="/" />} />
      <Route path=':id' element={<Detail setActive={setActive} user={user} />} />
      <Route path='about' element={<About />} />
      <Route path='auth' element={<Auth setActive={setActive} />} />
      <Route path='*' element={<NotFound />} />
      <Route path='tag/:tag' element={<TagBlog />} />
      <Route path='category/:category' element={<CategoryBlog />} />
    </Route>
  ))

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
