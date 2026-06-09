import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-brand-dark border-t border-slate-200 dark:border-slate-800 py-16 font-display transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-200 dark:border-slate-800">
          
          {/* Left Column: Brand Statement */}
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-900 dark:text-white font-serif font-light">
              Görkem <span className="text-brand-gold font-sans font-semibold">Emlak</span>
            </span>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Cemal Ciğer güvencesiyle, sıra dışı yaşam alanlarını ve en prestijli gayrimenkul portföylerini küresel standartlarda sunuyoruz.
            </p>
          </div>

          {/* Center Column: Quick Navigation */}
          <div className="flex flex-col md:items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">Kurumsal</span>
            <div className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-light">
              <Link to="/about" className="hover:text-brand-gold transition-colors duration-200">Hakkımızda</Link>
              <Link to="/properties" className="hover:text-brand-gold transition-colors duration-200">Seçkin İlanlar</Link>
              <Link to="/contact" className="hover:text-brand-gold transition-colors duration-200">İletişim Girişi</Link>
            </div>
          </div>

          {/* Right Column: Contact info */}
          <div className="flex flex-col md:items-end gap-3 text-left md:text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">Merkez Ofis</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Lüks Konut Grubu Bölümü <br />
              <span className="text-slate-400 dark:text-slate-500">info@gorkememlak.com</span>
            </p>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-light">
          <p>© {new Date().getFullYear()} Görkem Emlak. Tüm Hakları Saklıdır.</p>
          <p className="tracking-wide text-slate-400/60">Premium Showcase Architecture</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer