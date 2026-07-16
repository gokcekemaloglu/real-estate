import React from 'react'

const DashboardWidgets = ({metrics}) => {
  // console.log(metrics);  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-fade-in">
      {/* Card 1: Total Portfolio */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Toplam Portföy</span>
            <span className="text-3xl font-sans font-light text-slate-800 dark:text-white">{metrics.total}</span>
          </div>
          <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-brand-gold">🏢</span>
        </div>
      </div>

      {/* Card 2: Interactive Traffic Metrics - Injected view counts aggregation data here! */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Toplam Portföy İlgisi</span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-light text-amber-600 dark:text-amber-400">👥 {metrics.totalViews} <span className="text-[9px] text-slate-400 font-normal">Tıklanma</span></span>
              <span className="text-xl font-light text-brand-gold">❤️ {metrics.totalFavorites} <span className="text-[9px] text-slate-400 font-normal">Beğeni</span></span>
            </div>
          </div>
          <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-brand-gold">📈</span>
        </div>
      </div>

      {/* Card 3: Listing Status splits */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Yayın Durumu</span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-light text-green-600 dark:text-green-500">{metrics.active}<span className="text-[9px] text-slate-400 font-normal ml-0.5"> Aktif</span></span>
              <span className="text-2xl font-light text-red-500">{metrics.passive}<span className="text-[9px] text-slate-400 font-normal ml-0.5"> Pasif</span></span>
            </div>
          </div>
          <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-green-500">✨</span>
        </div>
      </div>

      {/* Card 4: Type distributions counters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Pazarlama Dağılımı</span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-light text-amber-600 dark:text-amber-400">{metrics.sale}<span className="text-[9px] text-slate-400 font-normal ml-0.5"> Satılık</span></span>
              <span className="text-2xl font-light text-slate-700 dark:text-slate-300">{metrics.rent}<span className="text-[9px] text-slate-400 font-normal ml-0.5"> Kiralık</span></span>
            </div>
          </div>
          <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-amber-400">🔑</span>
        </div>
      </div>
      {/* Card 5: Featured Vitrin Items */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Vitrin İlanları</span>
            <span className="text-3xl font-sans font-light text-amber-500 dark:text-amber-400">{metrics.featured}</span>
          </div>
          <span className="text-xl p-2 bg-slate-50 dark:bg-slate-800/50 text-amber-400">⭐</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardWidgets