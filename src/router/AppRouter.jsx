import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Router>
      {/* Navbar */}
      <Routes>
        <Route path="/" element={<div className="p-6 text-xl font-serif text-slate-800">Ana Sayfa İskeleti</div>} />
      </Routes>
    </Router>
  )
}

export default AppRouter