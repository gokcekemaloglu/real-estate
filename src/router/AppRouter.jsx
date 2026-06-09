import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/home/Navbar'
import Register from '../pages/Register'
import Login from '../pages/Login'

const LoadingFallback = () => {
  <div className="flex items-center justify-center min-h-screen bg-brand-dark">
    <div className="w-10 h-10 border-2 border-slate-700 border-t-brand-gold rounded-full animate-spin"></div>
  </div>
}

const AppRouter = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default AppRouter