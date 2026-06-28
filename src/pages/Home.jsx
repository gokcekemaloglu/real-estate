import React from 'react'
import HeroSection from '../components/home/HeroSection'
import HomeFeatured from '../components/home/HomeFeatured'
import HomeCategories from '../components/home/HomeCategories'

const Home = () => {
  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300">
        <HeroSection/>
        <HomeFeatured/>
        <HomeCategories/>
    </div>
  )
}

export default Home