import React from 'react'
import useMediaGallery, {FALLBACK_KEY} from '../../hooks/useMediaGallery';
import ImagePlaceholder from '../ImagePlaceholder';
import AdminPropertyDetailMediaLightbox from '../AdminPropertyDetailMediaLightbox';
import { resolveMediaUrl } from '../../helper/propertyOptions';

const PropertyMediaGallery = ({
  images,
  altText,
  badges,
  topRightContent,
  heroHeightClass = "h-80",
  containerBgClass = "bg-slate-100 dark:bg-slate-950",
  thumbLabel = "Fotoğraflar",
}) => {
  const {
    activeImage,
    isLightboxOpen,
    setIsLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    triggerLightboxView,
  } = useMediaGallery(images);
  const PremiumBlueprintFallback = () => (
    <ImagePlaceholder type="property" showText={true} />
  );
  return (
    <div className="flex flex-col gap-3 animate-fade-in w-full text-xs font-light text-slate-700 dark:text-slate-300 select-none">
      {activeImage && (
        <div
          onClick={() => triggerLightboxView(activeImage)}
          className={`relative ${heroHeightClass} w-full ${containerBgClass} overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 ${
            activeImage === FALLBACK_KEY ? "cursor-default" : "cursor-zoom-in group"
          }`}
        >
          {activeImage === FALLBACK_KEY ? (
            <PremiumBlueprintFallback />
          ) : (
            <img
              src={activeImage}
              alt={altText || "Luxury Real Estate Showcase"}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 contrast-110"
              loading="eager"
            />
          )}
 
          {badges && (
            <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
              {badges}
            </div>
          )}
          {topRightContent && (
            <div className="absolute top-4 right-4">
              {topRightContent}
            </div>
          )}
        </div>
      )}
 
      {images?.length > 1 && (
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
            {thumbLabel} ({images?.length})
          </span>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {images.map((image, idx) => {
              const fullUrl = resolveMediaUrl(image?.imageUrl);
              const isSelected = activeImage === fullUrl;
 
              return (
                <div
                  key={image?._id}
                  onClick={() => triggerLightboxView(fullUrl)}
                  className={`w-16 h-16 bg-slate-50 dark:bg-slate-950 border overflow-hidden cursor-pointer transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "border-brand-gold shadow-md ring-1 ring-brand-gold scale-95"
                      : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={fullUrl}
                    alt="Gallery Thumbnail"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
 
      <AdminPropertyDetailMediaLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images || []}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  )
}

export default PropertyMediaGallery
