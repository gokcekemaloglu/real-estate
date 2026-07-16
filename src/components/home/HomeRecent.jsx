import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFail, fetchStart, setData } from '../../features/propertySlice';
import PropertyCard from '../properties/PropertyCard';

const HomeRecent = () => {
  const { fetchData } = useFetchData();
  const { recentProperties, propertyImages, loading } = useSelector((state) => state.property);
  // console.log("recentProperties-->", recentProperties);
  useEffect(() => {
    fetchData({
      endpoint: "properties",
      stateKey: "recentProperties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 3, // Directly requests only the newest 3 properties from server
    });

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
    });
  }, []);

  if (!loading && recentProperties?.length === 0) return null;
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-900/60 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title Ribbon */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium mb-2 block">
            Yeni Eklenen Fırsatlar
          </span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900 dark:text-white font-serif">
            Portföyümüze Katılan <span className="italic text-brand-gold dark:text-amber-400">Son İlanlar</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Responsive Layout Cards Grid Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recentProperties?.map((property) => (
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
