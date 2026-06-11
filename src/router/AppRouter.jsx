import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { Suspense } from 'react'
import { lazy } from 'react'
import Footer from '../components/Footer'
import About from '../pages/About'

// Performance Optimization via Lazy Loading (Code Splitting)
const Home = lazy(() => import('../pages/Home'))
const Register = lazy(() => import('../pages/Register'))
const Login = lazy(() => import('../pages/Login'))

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-brand-dark">
    <div className="w-10 h-10 border-2 border-slate-700 border-t-brand-gold rounded-full animate-spin"></div>
  </div>
)

const AppRouter = () => {
  return (
    <Router>
      <Navbar/>
      <Suspense fallback={<LoadingFallback/>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  )
}

export default AppRouter