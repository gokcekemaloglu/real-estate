import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFail, fetchStart, setData } from '../../features/propertySlice';
import PropertyCard from '../properties/PropertyCard';

const HomeRecent = () => {
    const { fetchData } = useFetchData();
  
  // Destructure target state blocks from unified property slice registry
  const { properties, propertyImages, loading } = useSelector((state) => state.property);

  // Take exactly the first 3 items from the properties array which comes sorted by newest from backend
  const recentListings = properties?.slice(0, 3) || [];

  useEffect(() => {
    // Fetch base properties entries with a tight limit stream to capture core items efficiently
    fetchData({
      endpoint: "properties",
      stateKey: "properties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 3, // Directly requests only the newest 3 properties from server
    });

    // Fetch associated public gallery lookups concurrently
    fetchData({
      endpoint: "property-images",
      stateKey: "propertyImages",
      sliceActions: { 
        fetchStart: () => ({ type: "property/noOpStart" }), 
        fetchFail: () => ({ type: "property/noOpFail" }), 
        setData 
      },
      page: 1,
      limit: 50,
      isWithToken: false
    });
  }, []);

  if (!loading && recentListings?.length === 0) return null;
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-900/60 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Elegant Section Title Ribbon */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium mb-2 block">
            New Arrivals
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 dark:text-white font-serif">
            Son Eklenen <span className="italic text-brand-gold dark:text-amber-400">Yeni Portföyler</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Responsive Layout Cards Grid Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recentListings?.map((property) => (
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

export default HomeRecent