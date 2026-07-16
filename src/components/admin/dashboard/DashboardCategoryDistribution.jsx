import React from 'react'

const DashboardCategoryDistribution = ({categories}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4">
        Gayrimenkul Kategori Dağılımı
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        {categories.map((category) => (
          <div key={category.label} className="p-4 border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 rounded-sm">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">{category.label}</span>
            <span className={`text-xl font-medium ${category.isHighlight ? "text-brand-gold" : "text-slate-800 dark:text-white"}`}>{category.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardCategoryDistribution