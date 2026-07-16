import React from 'react'
import ContactHeader from '../components/contact/ContactHeader'
import ContactInfo from '../components/contact/ContactInfo'
import ContactMap from '../components/contact/ContactMap'

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      {/* Background Luxury Line Grid using Tailwind v4 syntax */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
 
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
 
        {/* Section Header */}
        <ContactHeader/>
 
        {/* Core Layout: Sol tarafta kurumsal bilgiler + WhatsApp CTA, sağ tarafta gerçek harita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
 
          {/* Left Column (5-Cols): Contact Corporate Information Details + WhatsApp CTA */}
          <ContactInfo/>
 
          {/* Right Column (7-Cols): Gerçek harita + yol tarifi */}
          <ContactMap/>
 
        </div>
      </div>
    </div>
  )
}

export default Contact
