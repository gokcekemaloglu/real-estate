import React from 'react'
import HeroSection from '../components/home/HeroSection'
import HomeFeatured from '../components/home/HomeFeatured'
import HomeCategories from '../components/home/HomeCategories'
import HomeServices from '../components/home/HomeServices'

const Home = () => {
  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300">
        <HeroSection/>
        <HomeFeatured/>
        <HomeCategories/>
        <HomeServices/>
    </div>
  )
}

export default Home