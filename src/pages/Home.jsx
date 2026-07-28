import React from 'react'
import HeroSection from '../components/home/HeroSection'
import HomeFeatured from '../components/home/HomeFeatured'
import HomeCategories from '../components/home/HomeCategories'
import HomeServices from '../components/home/HomeServices'
import HomeRecent from '../components/home/HomeRecent'
import useDocumentMeta from '../hooks/useDocumentMeta'

const Home = () => {
  useDocumentMeta(
    "Görkem Emlak | Adana Satılık ve Kiralık Gayrimenkul İlanları",
    "Görkem Emlak ile Adana'da satılık, kiralık ve devren gayrimenkul ilanlarını keşfedin. Daire, villa, arsa ve ticari mülk portföyümüze göz atın."
  )
  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300">
      <HeroSection/>
      <HomeFeatured/>
      <HomeCategories/>
      <HomeServices/>
      <HomeRecent/>
    </div>
  )
}

export default Home
