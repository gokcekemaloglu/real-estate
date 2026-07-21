import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-115 sm:min-h-0 sm:h-110 md:h-120 flex items-center justify-center bg-slate-50 dark:bg-brand-dark overflow-hidden font-display transition-colors duration-300 pt-28 sm:pt-24 md:pt-16">
      {/* Background Geometric Line Effect - Fully uniform across layout boundaries */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>      
      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        <span className="text-[10px] md:text-[12px] uppercase tracking-[0.25em] text-brand-gold font-bold mb-3 block animate-fade-in">
          Adana'da Güvenilir Emlak Rehberiniz
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white mb-4 leading-tight max-w-3xl transition-colors duration-300">
          Geleceğiniz İçin En Doğru, <br />
          <span className="font-serif italic text-brand-gold dark:text-amber-400 font-normal">Uygun Fiyatlı Gayrimenkuller</span>
        </h1>
        <p className="text-sm md:text-md text-slate-900 dark:text-slate-400 max-w-lg font-light mb-8 leading-relaxed transition-colors duration-300">
          Görkem Emlak güvencesiyle bütçenizi zorlamayan, aileniz için en huzurlu daireleri, yatırımlık arsaları ve devren iş yeri fırsatlarını tek bir çatıda topladık.
        </p>        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            type="button"
            onClick={() => navigate("/properties")}
            className="btn-premium px-8 py-3 text-xs font-semibold cursor-pointer shadow-md"
          >
            İlanları İncele
          </button>
          <button 
            type="button"
            onClick={() => navigate("/contact")} 
            className="px-8 py-3 text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 hover:border-brand-gold dark:hover:border-brand-gold transition-all duration-300 cursor-pointer bg-white/20 dark:bg-transparent"
          >
            Bize Ulaşın
          </button>
        </div>
      </div>
      {/* Decorative Elegant Blur Gradients kept subtle */}
      <div className="absolute -bottom-48 -right-48 w-80 h-80 bg-brand-gold/5 blur-[100px] rounded-full"></div>
      <div className="absolute -top-48 -left-48 w-80 h-80 bg-amber-500/5 blur-[100px] rounded-full"></div>
    </div>
  )
}

export default HeroSection
