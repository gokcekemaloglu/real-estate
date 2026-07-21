import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import useFavoritesCall from '../hooks/useFavoritesCall';
import { useSelector } from 'react-redux';
import PropertyRowCard from '../components/properties/PropertyRowCard';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyDisplayBar from '../components/PropertyDisplayBar';

const MyFavorites = () => {
  const navigate = useNavigate();
  const { getMyFavorites } = useFavoritesCall();
  const [searchParams] = useSearchParams()
  
  const { myFavorites, loading } = useSelector((state) => state.favorites);
  const { propertyImages } = useSelector((state) => state.property);

  const [viewMode, setViewMode] = useState(() => localStorage.getItem("gorkem_view_mode") || "grid");

  useEffect(() => {
    localStorage.setItem("gorkem_view_mode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    getMyFavorites();
  }, []);

  // Structural extraction to safely isolate pure properties entries from populated favorites models
  // Backend returns: [ { _id: "favId", userId: "...", propertyId: { _id: "propId", title: "..." } } ]
  // const favoriteProperties = myFavorites?.map((fav) => fav.propertyId)?.filter((prop) => prop !== null && prop !== undefined) || [];
  const uniqueFavoritesMap = new Map();
  myFavorites?.forEach((fav) => {
    const prop = fav.propertyId;
    if (prop && prop._id && !uniqueFavoritesMap.has(prop._id)) {
      uniqueFavoritesMap.set(prop._id, { ...prop, favoritedAt: fav.createdAt });
    }
  });
  const favoriteProperties = Array.from(uniqueFavoritesMap.values());
 
  /// SORTING
// We don't sort on the backend because the Favorite model doesn't contain fields like "price" or "title"; those belong to the populated property. Sending sort[price] to MongoDB has no effect. Since favorite lists are small and we intentionally don't use pagination, sorting on the frontend is the simplest and most efficient solution.
  const sortField = searchParams.get("sort[price]")
    ? "price"
    : searchParams.get("sort[title]")
      ? "title"
      : searchParams.get("sort[createdAt]")
        ? "favoritedAt"
        : null; // If no sort option is selected, keep the original order from the backend.
 
  const sortDirection = sortField
    ? Number(searchParams.get(`sort[${sortField === "favoritedAt" ? "createdAt" : sortField}]`)) || -1
    : null;
 
  const sortedFavoriteProperties = sortField
    ? [...favoriteProperties].sort((a, b) => {
        const aVal = a?.[sortField];
        const bVal = b?.[sortField];
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
 
        if (sortField === "title") {
          return sortDirection === 1
            ? aVal.localeCompare(bVal, "tr")
            : bVal.localeCompare(aVal, "tr");
        }
        if (sortField === "favoritedAt") {
          const aTime = new Date(aVal).getTime();
          const bTime = new Date(bVal).getTime();
          return sortDirection === 1 ? aTime - bTime : bTime - aTime;
        }
        // price
        return sortDirection === 1 ? aVal - bVal : bVal - aVal;
      })
    : favoriteProperties;

  if (loading && favoriteProperties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-brand-dark">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }
  // console.log(favoriteProperties);
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden text-xs font-light text-slate-700 dark:text-slate-300">
      {/* Background Luxury Line Grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-6">
        {/* Header Toolbar Title Section */}
        <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium block">
            Kişisel Seçki Portföyü
          </span>
          <h1 className="text-xl font-serif text-slate-800 dark:text-white font-light tracking-wide">
            Beğendiğim İlanlar / <span className="italic text-brand-gold dark:text-amber-400">Favorilerim</span>
          </h1>
        </div>

        {/* Display configurations controller bar node */}
        {favoriteProperties.length > 0 && (
          <PropertyDisplayBar
            viewMode={viewMode}
            setViewMode={setViewMode}
            totalRecords={favoriteProperties.length}
          />
        )}

        {/* Core Layout Grid Stream */}
        <div className="w-full relative">
          {favoriteProperties.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-16 text-center shadow-sm flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto animate-fade-in mt-6">
              <span className="text-3xl">🖤</span>
              <p className="text-sm font-light text-slate-400 dark:text-slate-500 uppercase tracking-widest max-w-md leading-relaxed">
                Henüz favori listenize eklenmiş bir gayrimenkul portföyü bulunmuyor.
              </p>
              <button
                type="button"
                onClick={() => navigate("/properties")}
                className="btn-premium px-8 py-3.5 text-xs font-semibold uppercase tracking-widest cursor-pointer mt-2 shadow-md"
              >
                Aradığın İlanları Keşfet →
              </button>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {sortedFavoriteProperties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      propertyImages={propertyImages}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {sortedFavoriteProperties.map((property) => (
                    <PropertyRowCard
                      key={property._id}
                      property={property}
                      propertyImages={propertyImages}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {loading && (
          <div className="fixed top-24 right-6 z-40 w-5 h-5 border-2 border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
        )}

      </div>
    </div>
  )
}

export default MyFavorites
