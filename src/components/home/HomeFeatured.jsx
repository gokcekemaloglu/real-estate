import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { useSelector } from 'react-redux';
import { fetchFail, fetchStart, setData } from '../../features/propertySlice';
import { useEffect } from 'react';
import PropertyCard from '../properties/PropertyCard';

const HomeFeatured = () => {
    const { fetchData } = useFetchData();
  
  // Destructure real-time store payloads from property registers
  const { featuredProperties, propertyImages, loading } = useSelector((state) => state.property);

// console.log("featuredProperties", featuredProperties);

  useEffect(() => {
    // Fetch base properties entries with a tight limit stream to capture core items efficiently
    fetchData({
      endpoint: "properties",
      stateKey: "featuredProperties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 20,
      query: "filter[isFeatured]=true" // Utilizes mongoose extended filtering directly inside backend parameters
    });

    // Fetch relational images lookup buffers seamlessly
    fetchData({
      endpoint: "property-images",
      stateKey: "propertyImages",
      sliceActions: { 
        fetchStart: () => ({ type: "property/noOpStart" }), 
        fetchFail: () => ({ type: "property/noOpFail" }), 
        setData 
      },
      page: 1,
      limit: 100,
      isWithToken: false
    });
  }, []);

  if (!loading && featuredProperties?.length === 0) return null;
  return (
    <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Elegant Section Title Ribbon */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium mb-2 block">
            Exclusive Selection
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 dark:text-white font-serif">
            Öne Çıkan <span className="italic text-brand-gold dark:text-amber-400">Seçkin Portföyler</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Cards Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featuredProperties?.map((property) => (
            <PropertyCard 
              property={property} 
              propertyImages={propertyImages} 
              key={property?._id} 
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default HomeFeatured