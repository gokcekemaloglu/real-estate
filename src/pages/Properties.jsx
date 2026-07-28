import React from "react";
import PropertyHeader from "../components/properties/PropertyHeader";
import PropertyFilters from "../components/properties/PropertyFilters";
import PropertyCard from "../components/properties/PropertyCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchData from "../hooks/useFetchData";
import { useSearchParams } from "react-router-dom";
import { fetchFail, fetchStart, setData } from "../features/propertySlice";
import PaginationComponent from "../components/properties/PaginationComponent";
import { useState } from "react";
import PropertyDisplayBar from "../components/PropertyDisplayBar";
import PropertyRowCard from "../components/properties/PropertyRowCard";
import useDocumentMeta from "../hooks/useDocumentMeta";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchData } = useFetchData();

  const { properties, loading, propertiesDetails, propertyImages } = useSelector((state) => state.property);
  const { favoriteIds } = useSelector((state) => state.favorites);
  // console.log("Properties-->", properties);
  const activePage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  useDocumentMeta(
    "İlanlarımız | Görkem Emlak",
    "Adana'daki tüm satılık, kiralık ve devren gayrimenkul portföyümüzü filtreleyerek inceleyin."
  );

  const [viewMode, setViewMode] = useState(() => localStorage.getItem("gorkem_view_mode") || "grid");

  useEffect(() => {
    localStorage.setItem("gorkem_view_mode", viewMode);
  }, [viewMode]);

  // Dynamically monitors and dispatches parallel data pipelines upon query mutations
  const loadPublicPropertiesData = () => {
    const activeParams = new URLSearchParams(searchParams);
    activeParams.delete("page");
    const encryptedQueryString = activeParams.toString();
    const cleanBracketsQueryString = decodeURIComponent(encryptedQueryString);

    // Pipeline A: Fetch structured primary public properties dataset registry items
    fetchData({
      endpoint: "properties",
      stateKey: "properties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: activePage,
      limit: 12,
      query: cleanBracketsQueryString,
    });

    // Pipeline B: Fetch broad system images buffer repository concurrently to satisfy frontend card thumbnails
    fetchData({
      endpoint: "property-images",
      stateKey: "propertyImages",
      sliceActions: {
        fetchStart: () => ({ type: "property/noOpStart" }), // Safely protects page loader contexts from clashing
        fetchFail: () => ({ type: "property/noOpFail" }),
        setData,
      },
      page: 1,
      limit: 150, // Buffers a safe spectrum length to filter cards accurately
    });
  };

  useEffect(() => {
    loadPublicPropertiesData();
  }, [activePage, searchParams]);

  const handleClearFilters = () => {
    setSearchParams({ page: "1" }, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      {/* Background Luxury Line Grid using Tailwind v4 syntax */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <PropertyHeader />
        {/* Premium Horizontal Filter Bar (Baseline HTML inputs for upcoming Formik integration) */}
        <PropertyFilters />
        <PropertyDisplayBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalRecords={propertiesDetails?.totalRecords || 0}
        />
        <div
          className={`transition-all duration-300 relative ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`}
        >
          {properties?.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 uppercase tracking-widest text-xs font-light shadow-sm">
              <p className="text-sm font-light text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Kriterlere uygun veya sistemde kayıtlı herhangi bir mülk portföyü bulunamadı.</p>
              <button 
                onClick={handleClearFilters}
                className="btn-premium px-6 py-3 text-xs tracking-widest font-semibold"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <>
              {/* Alternates components flawlessly using local viewMode state controls */}
              {viewMode === "grid" ? (
                // Grid View: Uses standard 3-column matrix card templates safely
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                  {properties?.map((singleProperty) => (
                    <PropertyCard
                      key={singleProperty._id}
                      property={singleProperty}
                      propertyImages={propertyImages}
                    />
                  ))}
                </div>
              ) : (
                // Row View: Transforms dynamically into a single-column full width stream
                <div className="flex flex-col gap-5">
                  {properties?.map((singleProperty) => (
                    <PropertyRowCard
                      property={singleProperty}
                      key={singleProperty._id}
                      propertyImages={propertyImages}
                    />
                  ))}
                </div>
              )}
              <PaginationComponent details={propertiesDetails} />
            </>
          )}
        </div>
        {loading && (
          <div className="fixed top-24 right-6 z-40 w-5 h-5 border-2 border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
};

export default Properties;
