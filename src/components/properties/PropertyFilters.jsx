import React from 'react'

const PropertyFilters = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end transition-colors duration-300">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Arama / Anahtar Kelime</label>
            <input 
              type="text" 
              placeholder="Yalı, Villa, Penthouse..."
              className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Durum</label>
            <select className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-light focus:border-brand-gold cursor-pointer">
              <option value="">Tümü</option>
              <option value="sale">Satılık</option>
              <option value="rent">Kiralık</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Şehir / Bölge</label>
            <select className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-light focus:border-brand-gold cursor-pointer">
              <option value="">İstanbul (Tümü)</option>
              <option value="bebek">Bebek</option>
              <option value="levent">Levent</option>
              <option value="zekeriyakoy">Zekeriyaköy</option>
            </select>
          </div>

          <div>
            <button className="btn-premium w-full py-3 font-semibold text-center tracking-widest shadow-md">
              Filtrele
            </button>
          </div>

        </div>
  )
}

export default PropertyFilters