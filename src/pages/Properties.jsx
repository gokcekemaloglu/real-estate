import React from 'react'
import PropertyHeader from '../components/properties/PropertyHeader'
import PropertyFilters from '../components/properties/PropertyFilters'
import PropertyCard from '../components/properties/PropertyCard'

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
        <PropertyHeader/>

        {/* Premium Horizontal Filter Bar (Baseline HTML inputs for upcoming Formik integration) */}
        <PropertyFilters/>
        
        {/* Core Showcase Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {mockProperties.map((item) => (
            
            /* Individual Luxury Estate Card component wrapper */
            <PropertyCard item={item} key={item.id}/>
           
          ))}
        </div>

      </div>
    </div>
  )
}

export default Properties