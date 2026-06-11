import React from 'react'

const Properties = () => {
    // Static mock array simulating upcoming API structure for UI rendering
  const mockProperties = [
    {
      id: 1,
      title: "Boğaz Manzaralı Zamansız Yalı Dairesi",
      price: "125,000,000 ₺",
      location: "Bebek, İstanbul",
      type: "Satılık",
      specs: { space: "320 m²", rooms: "4+1", baths: "3" },
      image: "https://unsplash.com"
    },
    {
      id: 2,
      title: "Modernist Orman Villası",
      price: "85,000,000 ₺",
      location: "Zekeriyaköy, İstanbul",
      type: "Satılık",
      specs: { space: "450 m²", rooms: "5+2", baths: "4" },
      image: "https://unsplash.com"
    },
    {
      id: 3,
      title: "Kanyon Cepheli Rezidans Penthouse",
      price: "220,000 ₺ / Ay",
      location: "Levent, İstanbul",
      type: "Kiralık",
      specs: { space: "210 m²", rooms: "3+1", baths: "2" },
      image: "https://unsplash.com"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      {/* Background Luxury Line Grid using Tailwind v4 syntax */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-3 block">
            Seçkin Yaşam Alanları Koleksiyonu
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Özel Portföy <br />
            <span className="font-serif italic text-brand-gold dark:text-amber-400">İlanları</span>
          </h1>
        </div>

        {/* Premium Horizontal Filter Bar (Baseline HTML inputs for upcoming Formik integration) */}
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

        {/* Core Showcase Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {mockProperties.map((item) => (
            
            /* Individual Luxury Estate Card component wrapper */
            <div key={item.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-colors duration-300">
              
              {/* Card Image Block with relative badge element */}
              <div className="relative h-64 w-full bg-slate-200 dark:bg-slate-950 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent"></div>
                
                {/* Premium Type Badge */}
                <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-3 py-1.5 font-medium shadow-md">
                  {item.type}
                </span>
              </div>

              {/* Card Information Body Content */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium">
                    {item.location}
                  </span>
                  <h3 className="text-lg font-serif font-normal text-slate-800 dark:text-white tracking-wide group-hover:text-brand-gold transition-colors duration-300 line-clamp-1">
                    {item.title}
                  </h3>
                </div>

                {/* Tactical Architectural Specs Bar using semantic layout grids */}
                <div className="grid grid-cols-3 border-y border-slate-100 dark:border-slate-800/60 py-3 text-center text-xs text-slate-500 dark:text-slate-400 font-light">
                  <div className="border-r border-slate-100 dark:border-slate-800/60 flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">Alan</span>
                    <span>{item.specs.space}</span>
                  </div>
                  <div className="border-r border-slate-100 dark:border-slate-800/60 flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">Oda</span>
                    <span>{item.specs.rooms}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">Banyo</span>
                    <span>{item.specs.baths}</span>
                  </div>
                </div>

                {/* Footer action bar enclosing real-time monetary figures */}
                <div className="flex items-center justify-between pt-1 mt-auto">
                  <span className="text-base font-medium text-brand-gold dark:text-amber-400">
                    {item.price}
                  </span>
                  <button className="text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium border-b border-slate-300 dark:border-slate-700 hover:border-brand-gold dark:hover:border-brand-gold pb-0.5 transition-colors duration-300 cursor-pointer">
                    Detayları Gör
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Properties