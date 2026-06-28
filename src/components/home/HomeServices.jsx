import React from 'react'

const HomeServices = () => {
    const services = [
    {
      id: 1,
      title: "Kişiye Özel Butik Danışmanlık",
      description: "Her yatırımcının vizyonu benzersizdir. Beklentilerinize tam uyumlu, özel ve gizlilik esasına dayalı gayrimenkul danışmanlığı sunuyoruz.",
      icon: (
        <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Seçkin Portföy Hacmi",
      description: "Sadece standart ilanları değil; mimari estetiği, konumu ve yatırım değeriyle sıra dışı olan en seçkin lüks gayrimenkulleri portföyümüze alıyoruz.",
      icon: (
        <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Hukuki & Finansal Güvence",
      description: "Yatırım süreçlerinizin her aşamasında, sözleşme yönetiminden tapu işlemlerine kadar tam şeffaflık ve profesyonel hukuki altyapı sağlıyoruz.",
      icon: (
        <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];
  return (
    <section className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300 relative overflow-hidden">
      {/* Subtle luxury brand identifier watermark background container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif italic font-extrabold text-slate-100/30 dark:text-slate-900/10 pointer-events-none select-none tracking-widest uppercase">
        Görkem
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium mb-2 block">
            Our Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 dark:text-white font-serif">
            Lüks Gayrimenkulde <span className="italic text-brand-gold dark:text-amber-400">Hizmet Standartları</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Service Pillars Grid Layout Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {services.map((service) => (
            <div 
              key={service.id}
              className="flex flex-col items-center text-center gap-4 group p-4 border border-transparent hover:border-slate-100 dark:hover:border-slate-900/40 hover:bg-slate-50/30 dark:hover:bg-slate-900/5 transition-all duration-300"
            >
              {/* Minimalist Icon Bubble Frame */}
              <div className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-950 group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-all duration-500 shadow-xs">
                {service.icon}
              </div>

              {/* Specification Meta Information */}
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-base font-serif font-normal text-slate-800 dark:text-white tracking-wide">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HomeServices