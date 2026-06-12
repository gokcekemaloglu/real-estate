import React from 'react'
import AboutHeader from '../components/about/AboutHeader'
import AboutContent from '../components/about/AboutContent'

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      {/* Background Luxury Line Grid using Tailwind v4 syntax */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <AboutHeader/>
        
        {/* Core Layout: Grid splits into text and interactive premium image box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Premium Text & Vision */}
          <AboutContent/>
          

          {/* Right Column: Luxury Image Presentation Showcase */}
          <div className="relative group">
            {/* Elegant outer border framing effect */}
            <div className="absolute -inset-4 border border-brand-gold/20 dark:border-brand-gold/10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            
            {/* Main Premium Architecture Image Placeholder */}
            <div className="relative h-100 md:h-125 w-full bg-slate-200 dark:bg-slate-900 overflow-hidden shadow-2xl">
              <img 
                src="https://unsplash.com" 
                alt="Luxury Real Estate Estate Architecture Office" 
                className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 to-transparent"></div>
            </div>

            {/* Decorative Tiny Floating Banner */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 shadow-xl hidden sm:block">
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold block font-semibold">Merkez Ofis</span>
              <span className="text-xs font-light text-slate-600 dark:text-slate-400">Lüks Konut Grubu Bölümü</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About