import React from 'react'
import AboutHeader from '../components/about/AboutHeader'
import AboutContent from '../components/about/AboutContent'
import AboutShowcase from '../components/about/AboutShowcase'

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
          <AboutShowcase/>

        </div>
      </div>
    </div>
  )
}

export default About