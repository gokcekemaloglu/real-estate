import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
    const {token} = useSelector(state => state.auth)
  return token ? <Navigate to="/" replace/> : <Outlet/>
}

export default AuthRoute