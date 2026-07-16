import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useFetchData from '../../hooks/useFetchData'
import { fetchStart, fetchFail, setData } from '../../features/propertySlice'
import DashboardWidgets from '../../components/admin/dashboard/DashboardWidgets'
import DashboardCategoryDistribution from '../../components/admin/dashboard/DashboardCategoryDistribution'

const DashboardHome = () => {
  const { fetchData } = useFetchData()
  const { properties, propertiesDetails, loading } = useSelector((state) => state.property)

  useEffect(() => {
    fetchData({
      endpoint: "properties",
      stateKey: "properties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 1000,
    })
  }, [])

  /// 1. Primary Portfolio Calculations
  const totalProperties = propertiesDetails?.totalRecords || properties?.length || 0
  const activeCount = properties?.filter(p => p.isActive === true).length || 0
  const passiveCount = totalProperties - activeCount // Dynamically extracted passive layer
  const saleCount = properties?.filter(p => p.listingType?.includes("sale")).length || 0
  const rentCount = properties?.filter(p => p.listingType?.includes("rent")).length || 0
  const featuredCount = properties?.filter(p => p.isFeatured === true).length || 0

  // 2. Fetch network traffic logs counter summaries cleanly
  const totalViewsSum = properties?.reduce((sum, p) => sum + (p.viewsCount || 0), 0) || 0
  const totalFavoritesSum = properties?.reduce((sum, p) => sum + (p.favoriteCount || 0), 0) || 0

  const widgetMetrics = {
    total: totalProperties,
    active: activeCount,
    passive: passiveCount,
    sale: saleCount,
    rent: rentCount,
    featured: featuredCount,
    totalViews: totalViewsSum,
    totalFavorites: totalFavoritesSum
  };

  
  // 3. Granular Category Distributions mapped from your exact Mongoose Schema strings tokens
  const apartmentCount = properties?.filter(p => p.propertyCategory === "apartment").length || 0
  const houseCount = properties?.filter(p => p.propertyCategory === "house").length || 0
  const villaCount = properties?.filter(p => p.propertyCategory === "villa").length || 0
  const landCount = properties?.filter(p => p.propertyCategory === "land").length || 0
  const commercialCount = properties?.filter(p => p.propertyCategory === "commercial").length || 0

  const categoryArray = [
    { label: "Apartman Dairesi", count: apartmentCount },
    { label: "Müstakil Ev", count: houseCount },
    { label: "Lüks Villa", count: villaCount, isHighlight: true },
    { label: "Arsa / Arazi", count: landCount },
    { label: "Ticari Mülk", count: commercialCount },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Welcome Message Panel Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-light text-slate-800 dark:text-white tracking-wide">
            Hoş Geldiniz, <span className="font-semibold text-brand-gold">Cemal Bey</span>
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-light">
            Mülk portföyünüzün derinlemesine analizi ve güncel durum raporu
          </p>
        </div>
        <div className="text-xs bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-4 py-2 font-medium tracking-wide">
          📍 Merkez: Seyhan, Adana
        </div>
      </div>

      <DashboardWidgets metrics={widgetMetrics}/>
      <DashboardCategoryDistribution categories={categoryArray}/>
    </div>
  )
}

export default DashboardHome