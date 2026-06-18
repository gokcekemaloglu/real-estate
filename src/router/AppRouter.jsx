import React, { Suspense, lazy} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthRoute from './AuthRoute'

// Performance Optimization via Lazy Loading (Code Splitting)
const Home = lazy(() => import('../pages/Home'))
const Properties = lazy(() => import('../pages/Properties'))
const PropertyDetail = lazy(() => import('../components/properties/PropertyDetail'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const Register = lazy(() => import('../pages/Register'))
const Login = lazy(() => import('../pages/Login'))
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'))
const DashboardHome = lazy(() => import('../pages/admin/DashboardHome'))
const AdminProperties = lazy(() => import('../pages/admin/AdminProperties'))
const AdminPropertyForm = lazy(() => import('../pages/admin/AdminPropertyForm'))

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
          <Route path="/properties" element={<Properties/>}/>
          <Route path="/properties/:id" element={<PropertyDetail/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route element={<AuthRoute/>}>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Route>
          <Route path='/admin' element={<AdminLayout/>} >
            <Route index element={<DashboardHome/>} />
            <Route path='properties' element={<AdminProperties/>} />
            <Route path='properties/create' element={<AdminPropertyForm/>} />
          </Route>
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  )
}

export default AppRouter