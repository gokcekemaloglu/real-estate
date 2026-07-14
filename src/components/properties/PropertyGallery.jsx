import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setData } from "../../features/propertySlice";
import AdminPropertyDetailMediaLightbox from "../AdminPropertyDetailMediaLightbox";

const PropertyGallery = ({title, listingType, propertyId, currentPropertyImages}) => {
  // Local state layers managing the magnified active viewport and lightbox indices
  const [activeImage, setActiveImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // console.log("currentPropertyImages", currentPropertyImages);
  
  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const FALLBACK_KEY = "RENDER_PREMIUM_BLUEPRINT_PLACEHOLDER";
  
  
  // 3. Monitor data changes to auto-select cover validation flags seamlessly
  useEffect(() => {
    if (currentPropertyImages && currentPropertyImages.length > 0) {
      const coverImage = currentPropertyImages.find((image) => image.isCover);
      if (coverImage) {
        setActiveImage(`${IMAGE_BASE_URL}${coverImage.imageUrl}`);
      } else {
        setActiveImage(`${IMAGE_BASE_URL}${currentPropertyImages[0].imageUrl}`);
      }
    } else {
      setActiveImage(FALLBACK_KEY);
    }
  }, [currentPropertyImages]);

  // 4. Index selector trigger routing viewports cleanly to exact thumbnail items
  const triggerLightboxView = (targetUrlOrIndex) => {
    if (!currentPropertyImages || currentPropertyImages.length === 0) return;
    
    if (typeof targetUrlOrIndex === "number") {
      setLightboxIndex(targetUrlOrIndex);
    } else {
      const targetIdx = currentPropertyImages.findIndex((image) => `${IMAGE_BASE_URL}${image.imageUrl}` === targetUrlOrIndex);
      setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
    }
    setIsLightboxOpen(true);
  };
  const PremiumBlueprintFallback = () => (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center gap-4 transition-colors duration-300">
      {/* Subtle structural framing vector background layer */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[2rem_2rem]"></div>
      
      {/* Tabler-style elegant wireframe house and camera vector hybrid grid */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="64" 
        height="64" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.25" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-brand-gold/60 dark:text-amber-500/40 animate-pulse duration-4000"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        {/* Subtle camera lens overlay element added natively inside the layout structure */}
        <circle cx="12" cy="13" r="2" strokeWidth="1" opacity="0.5" />
      </svg>
      
      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-medium">
        Henüz bir fotoğraf eklenmedi
      </span>
    </div>
  );
  return (
    <div className="flex flex-col gap-3 animate-fade-in w-full text-xs font-light text-slate-700 dark:text-slate-300 select-none">
      
      {/* Upper Main Hero Display Canvas Frame Slot */}
      {activeImage && (
        <div 
          onClick={() => triggerLightboxView(activeImage)}
          className={`relative h-100 md:h-125 w-full bg-slate-200 dark:bg-slate-950 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 ${
            activeImage === FALLBACK_KEY ? "cursor-default" : "cursor-zoom-in group"
          }`}
        >
          {/* FIXED SENIOR HIBRID RENDERING LOGIC: Swaps between clean img layouts or pure JSX inline SVGs smoothly */}
          {activeImage === FALLBACK_KEY ? (
            <PremiumBlueprintFallback />
          ) : (

          <img
            src={activeImage}
            alt={title || "Luxury Real Estate Showcase"}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 contrast-110"
            loading="eager"
          />
          )}
          <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-4 py-2 font-medium pointer-events-none">
            {listingType?.includes("sale") ? "Satılık" : "Kiralık"}
          </span>
        </div>
      )}

      {/* Lower Ribbon Thumbnail Grid Array Carousel View */}
      {currentPropertyImages?.length > 1 && (
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Portföy Fotoğrafları ({currentPropertyImages.length})</span>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {currentPropertyImages.map((image, idx) => {
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
        images={currentPropertyImages || []}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
};

export default PropertyGallery;
