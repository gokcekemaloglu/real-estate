import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/home/Navbar'

const AppRouter = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default AppRouter