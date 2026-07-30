import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import useFavoritesCall from '../hooks/useFavoritesCall'

const UserLayout = () => {
  const {token} = useSelector((state) => state.auth)
  const {getMyFavorites} = useFavoritesCall()

  useEffect(() => {
    if (token) {
      getMyFavorites()
    }
  }, [token])

  return (
    <>
      <Navbar/>
      <main>
        <Outlet/>
      </main>      
      <Footer/>
    </>
  )
}

export default UserLayout
