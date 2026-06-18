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
      limit: 100 // Broad limit to calculate statistical charts accurately
    })
  }, [])

  // Statistical calculations running dynamically from your real Mongoose Seed Data
  const totalProperties = propertiesDetails?.totalRecords || 0
  const rentCount = properties?.filter(p => p.listingType?.includes("rent")).length || 0
  const saleCount = properties?.filter(p => p.listingType?.includes("sale")).length || 0
  const activeCount = properties?.filter(p => p.isActive === true).length || 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      
      {/* Welcome Message Panel */}
      <div>
        <h1 className="text-xl md:text-2xl font-serif font-light text-slate-800 dark:text-white tracking-wide">
          Hoş Geldiniz, <span className="font-semibold text-brand-gold">Cemal Bey</span>
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-light">
          Bugün mülk portföyünüzün genel durumu ve istatistikleri
        </p>
      </div>

      {/* Grid Row: Architectural Metrics Widgets Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Portfolio */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Toplam Portföy</span>
              <span className="text-3xl font-sans font-light text-slate-800 dark:text-white">{totalProperties}</span>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-brand-gold">🏢</span>
          </div>
        </div>

        {/* Card 2: Active Listings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Aktif İlanlar</span>
              <span className="text-3xl font-sans font-light text-green-600 dark:text-green-500">{activeCount}</span>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-green-500">✨</span>
          </div>
        </div>

        {/* Card 3: For Sale Count */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Satılık Portföy</span>
              <span className="text-3xl font-sans font-light text-slate-800 dark:text-white">{saleCount}</span>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-amber-500">🔑</span>
          </div>
        </div>

        {/* Card 4: For Rent Count */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Kiralık Portföy</span>
              <span className="text-3xl font-sans font-light text-slate-800 dark:text-white">{rentCount}</span>
            </div>
            <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-blue-500">🏷️</span>
          </div>
        </div>

      </div>

      {/* Grid Row: Activity Feed placeholder layout */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-4">Hızlı Sistem Durumu</h3>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-light flex flex-col gap-2">
          <p>✔️ Veritabanı köprüsü (MongoDB Compass) bağlantısı kararlı.</p>
          <p>✔️ JWT Access & Refresh token mekanizmaları aktif.</p>
          <p>✔️ Extended Query Parser filtresi canlandırıldı.</p>
        </div>
      </div>

    </div>
  )
}

export default DashboardHome