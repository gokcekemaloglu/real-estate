import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden flex items-center">
      {/* Background Luxury Line Grid — consistent with the rest of the site */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
 
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center gap-6">
 
        {/* Large architectural "404" mark, echoing the brand's blueprint aesthetic */}
        <span className="text-[7rem] md:text-[10rem] leading-none font-serif font-light text-brand-gold/25 dark:text-amber-400/20">
          404
        </span>
 
        <div className="w-16 h-px bg-brand-gold/40 -mt-6"></div>
 
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Portföy Bulunamadı
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-light text-slate-800 dark:text-white tracking-wide">
            Aradığınız Sayfa <span className="italic text-brand-gold dark:text-amber-400">Mevcut Değil</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-md mx-auto">
            Bağlantı hatalı olabilir ya da bu ilan/sayfa artık portföyümüzde bulunmuyor.
            Aşağıdaki bağlantılardan devam edebilirsiniz.
          </p>
        </div>
 
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-premium px-8 py-3.5 text-xs font-semibold uppercase tracking-widest cursor-pointer shadow-md"
          >
            Ana Sayfaya Dön
          </button>
          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-brand-gold dark:hover:text-brand-gold border-b border-slate-300 dark:border-slate-700 hover:border-brand-gold pb-0.5 transition-colors duration-300 cursor-pointer"
          >
            İlanları Keşfet →
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
