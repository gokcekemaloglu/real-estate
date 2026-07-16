import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { useSelector } from 'react-redux';
import { fetchFail, fetchStart, setData } from '../../features/propertySlice';
import { useEffect } from 'react';
import PropertyCard from '../properties/PropertyCard';

const HomeFeatured = () => {
  const { fetchData } = useFetchData();
  const { featuredProperties, propertyImages, loading } = useSelector((state) => state.property);
  // console.log("featuredProperties", featuredProperties);

  useEffect(() => {
    fetchData({
      endpoint: "properties",
      stateKey: "featuredProperties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 20,
      query: "filter[isFeatured]=true"
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

  if (!loading && featuredProperties?.length === 0) return null;
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Elegant Section Title Ribbon */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium mb-2 block">
            Günün Popüler İlanları
          </span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900 dark:text-white font-serif">
            Haftanın Öne Çıkan <span className="italic text-brand-gold dark:text-amber-400 font-normal">Fırsat İlanları</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-3"></div>
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
