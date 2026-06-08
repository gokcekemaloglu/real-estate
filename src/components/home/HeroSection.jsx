import React from 'react'

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-brand-dark overflow-hidden font-display">
      {/* Background Luxury Geometric Line Effect */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-4 block animate-fade-in">
          Premium Real Estate Showcase
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-white mb-6 leading-tight max-w-4xl">
          Sıra Dışı Yaşam Alanlarını <br />
          <span className="font-serif italic text-amber-400">Keşfedin</span>
        </h1>
        
        <p className="text-sm md:text-base text-slate-400 max-w-xl font-light mb-10 leading-relaxed">
          Görkem Emlak güvencesiyle lüks, modern ve tamamen size özel tasarlanmış en prestijli gayrimenkul portföyü ile tanışın.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="btn-premium px-8 py-3.5 text-xs font-semibold cursor-pointer">
            Portföyü İncele
          </button>
          <button className="px-8 py-3.5 text-xs uppercase tracking-widest text-white border border-slate-700 hover:border-brand-gold transition-all duration-300 cursor-pointer">
            İletişime Geç
          </button>
        </div>
      </div>

      {/* Decorative Elegant Blur Corner Gradient */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-brand-gold/10 blur-[120px] rounded-full"></div>
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full"></div>
    </div>
  )
}

export default HeroSection