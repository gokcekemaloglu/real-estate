import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useFetchData from '../../hooks/useFetchData'
import { fetchStart, fetchFail, setData } from '../../features/propertySlice'

const DashboardHome = () => {
  const { fetchData } = useFetchData()
  const { properties, propertiesDetails, loading } = useSelector((state) => state.property)

  useEffect(() => {
    // Fetches the property dataset natively to parse overall performance metrics
    fetchData({
      endpoint: "properties",
      stateKey: "properties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 1000, // Broad limit to calculate statistical charts accurately
      isWithToken: true
    })
  }, [])

  /// 1. Primary Portfolio Calculations
  const totalProperties = propertiesDetails?.totalRecords || properties?.length || 0
  const activeCount = properties?.filter(p => p.isActive === true).length || 0
  const passiveCount = totalProperties - activeCount // Dynamically extracted passive layer

  // 2. Listing Type Segregations
  const saleCount = properties?.filter(p => p.listingType?.includes("sale")).length || 0
  const rentCount = properties?.filter(p => p.listingType?.includes("rent")).length || 0
  const featuredCount = properties?.filter(p => p.isFeatured === true).length || 0

  // 3. Granular Category Distributions mapped from your exact Mongoose Schema strings tokens
  const apartmentCount = properties?.filter(p => p.propertyCategory === "apartment").length || 0
  const villaCount = properties?.filter(p => p.propertyCategory === "villa").length || 0
  const landCount = properties?.filter(p => p.propertyCategory === "land").length || 0
  const commercialCount = properties?.filter(p => p.propertyCategory === "commercial").length || 0

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

      {/* Grid Row 1: Core Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Widget 1: Total Portfolio */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Toplam Portföy</span>
              <span className="text-3xl font-sans font-light text-slate-800 dark:text-white">{totalProperties}</span>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-brand-gold">🏢</span>
          </div>
        </div>

        {/* Widget 2: Active vs Passive Stack */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Yayın Durumu</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-light text-green-600 dark:text-green-500">{activeCount}<span className="text-xs text-slate-400 font-normal ml-0.5"> Aktif</span></span>
                <span className="text-lg font-light text-red-500">{passiveCount}<span className="text-xs text-slate-400 font-normal ml-0.5"> Pasif</span></span>
              </div>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-green-500">✨</span>
          </div>
        </div>

        {/* Widget 3: Listing Splits Grid */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Satılık / Kiralık</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-light text-slate-800 dark:text-white">{saleCount}<span className="text-xs text-slate-400 font-normal ml-0.5"> S</span></span>
                <span className="text-2xl font-light text-slate-800 dark:text-white">{rentCount}<span className="text-xs text-slate-400 font-normal ml-0.5"> K</span></span>
              </div>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-amber-500">🔑</span>
          </div>
        </div>

        {/* Widget 4: Featured Vitrin Items */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Vitrin İlanları</span>
              <span className="text-3xl font-sans font-light text-amber-500 dark:text-amber-400">{featuredCount}</span>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-amber-400">⭐</span>
          </div>
        </div>

      </div>

      {/* Grid Row 2: Advanced Detailed Category Distribution Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-6">Gayrimenkul Kategori Dağılımı</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Daire / Apartman</span>
            <span className="text-xl font-medium text-slate-800 dark:text-white">{apartmentCount}</span>
          </div>
          <div className="p-4 border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Lüks Villa</span>
            <span className="text-xl font-medium text-brand-gold">{villaCount}</span>
          </div>
          <div className="p-4 border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Arsa / Arazi</span>
            <span className="text-xl font-medium text-slate-800 dark:text-white">{landCount}</span>
          </div>
          <div className="p-4 border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Ticari Mülk</span>
            <span className="text-xl font-medium text-slate-800 dark:text-white">{commercialCount}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashboardHome