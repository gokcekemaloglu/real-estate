import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setData } from "../../features/propertySlice";
import { useState } from "react";
import AdminPropertyDetailMediaLightbox from "../AdminPropertyDetailMediaLightbox";

const PropertyGallery = ({title, listingType, propertyId}) => {
  const {fetchData} = useFetchData()
  const {currentPropertyImages} = useSelector(state => state.property)
  // Local state layers managing the magnified active viewport and lightbox indices
  const [activeImage, setActiveImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const fallbackPlaceholder = "https://unsplash.com";

  useEffect(() => {
    if (propertyId) {
      fetchData({
        endpoint: "property-images",
        stateKey: "currentPropertyImages",
        sliceActions: {
          fetchStart: () => ({ type: "property/noOpStart" }), // Safely bypass page-unmounting global spinners
          fetchFail: () => ({ type: "property/noOpFail" }),
          setData,
        },
        query: `filter[propertyId]=${propertyId}`,
      });
    }
  }, [propertyId]);

  // 2. Isolating and filtering image stream matrix to strictly represent this single view to guarantee zero data leaks
  const isolatedImages = currentPropertyImages?.filter(image => image.propertyId === propertyId) || [];

  // 3. Monitor data changes to auto-select cover validation flags seamlessly
  useEffect(() => {
    if (isolatedImages.length > 0) {
      const coverImage = isolatedImages.find((image) => image.isCover);
      if (coverImage) {
        setActiveImage(`${IMAGE_BASE_URL}${coverImage.imageUrl}`);
      } else {
        setActiveImage(`${IMAGE_BASE_URL}${isolatedImages[0].imageUrl}`);
      }
    } else {
      setActiveImage(fallbackPlaceholder);
    }
  }, [currentPropertyImages, propertyId]);

  // 4. Index selector trigger routing viewports cleanly to exact thumbnail items
  const triggerLightboxView = (targetUrlOrIndex) => {
    if (!isolatedImages || isolatedImages.length === 0) return;
    
    if (typeof targetUrlOrIndex === "number") {
      setLightboxIndex(targetUrlOrIndex);
    } else {
      const targetIdx = isolatedImages.findIndex((image) => `${IMAGE_BASE_URL}${image.imageUrl}` === targetUrlOrIndex);
      setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
    }
    setIsLightboxOpen(true);
  };
  return (
    <div className="flex flex-col gap-3 animate-fade-in w-full text-xs font-light text-slate-700 dark:text-slate-300 select-none">
      
      {/* Upper Main Hero Display Canvas Frame Slot */}
      {activeImage && (
        <div 
          onClick={() => triggerLightboxView(activeImage)}
          className="relative h-100 md:h-125 w-full bg-slate-200 dark:bg-slate-950 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 cursor-zoom-in group"
        >
          <img
            src={activeImage}
            alt={title || "Luxury Real Estate Showcase"}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 contrast-110"
            loading="eager"
          />
          <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-4 py-2 font-medium pointer-events-none">
            {listingType?.includes("sale") ? "Satılık" : "Kiralık"}
          </span>
        </div>
      )}

      {/* Lower Ribbon Thumbnail Grid Array Carousel View */}
      {isolatedImages?.length > 1 && (
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Portföy Fotoğrafları ({isolatedImages.length})</span>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {isolatedImages.map((image, idx) => {
              const fullUrl = `${IMAGE_BASE_URL}${image?.imageUrl}`;
              const isSelected = activeImage === fullUrl;

              return (
                <div
                  key={image?._id}
                  onClick={() => triggerLightboxView(fullUrl)} // Clicking thumbnails opens lightbox slider exactly here
                  className={`w-16 h-16 bg-slate-50 dark:bg-slate-950 border overflow-hidden cursor-pointer transition-all duration-300 shrink-0 ${
                    isSelected ? "border-brand-gold shadow-md ring-1 ring-brand-gold scale-95" : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={fullUrl}
                    alt="Gallery Thumbnail Track Item"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fully Complete Reusable Lightbox Element Integrated Seamlessly */}
      <AdminPropertyDetailMediaLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={isolatedImages || []}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
};

export default PropertyGallery;
