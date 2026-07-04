import React, { useEffect, useState } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { setData } from "../../../../features/propertySlice";
import AdminPropertyDetailMediaLightbox from "../../../AdminPropertyDetailMediaLightbox";
import { useDispatch } from "react-redux";

const AdminPropertyDetailMedia = ({ property }) => {
  const dispatch = useDispatch()
  const { fetchData } = useFetchData();
  const { currentPropertyImages } = useSelector((state) => state.property);
  const [activeImage, setActiveImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const fallbackPlaceholder = "https://unsplash.com";

  useEffect(() => {
    if (property?._id) {
      fetchData({
        endpoint: "property-images",
        stateKey: "currentPropertyImages",
        sliceActions: {
          fetchStart: () => ({ type: "property/noOpStart" }), // Safely bypass global page-unmounting spinners
          fetchFail: () => ({ type: "property/noOpFail" }),
          setData,
        },
        query: `filter[propertyId]=${property._id}`,
        // isWithToken: true,
      });
    }
  }, [property?._id]);

  const isolatedImages = currentPropertyImages?.filter(image => image.propertyId === property?._id) || [];

  useEffect(() => {
    if (isolatedImages?.length > 0) {
      // Prioritize the designated cover image inside the database collection metadata
      const coverImage = isolatedImages.find((image) => image?.isCover);
      if (coverImage) {
        setActiveImage(`${IMAGE_BASE_URL}${coverImage?.imageUrl}`);
      } else {
        // Fallback to the first available index asset slot if no cover tag is enforced
        setActiveImage(`${IMAGE_BASE_URL}${isolatedImages[0].imageUrl}`);
      }
    } else {
      setActiveImage(fallbackPlaceholder);
    }
  }, [currentPropertyImages, property?._id]);

  // Dynamic selector index helper
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
    <div className="flex flex-col gap-3 animate-fade-in w-full text-xs font-light text-slate-700 dark:text-slate-300">
      {activeImage && (
        <div 
          onClick={() => triggerLightboxView(activeImage)}
          className="w-full h-80 bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative cursor-zoom-in group"
        >
          <img
            src={activeImage}
            alt={property?.title || "Property Asset"}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 contrast-110"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`text-[12px] uppercase font-bold tracking-widest px-3 py-1 text-white shadow-sm ${property?.listingType === "sale" ? "bg-brand-gold" : "bg-brand-dark border border-slate-700"}`}
            >
              {property?.listingType === "sale" ? "Satılık" : "Kiralık"}
            </span>
            {property?.isFeatured && (
              <span className="text-[12px] uppercase font-bold tracking-widest px-3 py-1 bg-amber-500 text-brand-dark shadow-sm">
                Vitrin İlanı
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bottom Segment: Secondary Thumbnail Navigation Ribbon View */}
      {isolatedImages?.length > 1 && (
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
            Galeri Fotoğrafları ({isolatedImages.length})
          </span>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {isolatedImages.map((image) => {
              const fullUrl = `${IMAGE_BASE_URL}${image?.imageUrl}`;
              const isSelected = activeImage === fullUrl;

              return (
                <div
                  key={image?._id}
                  onClick={() => triggerLightboxView(fullUrl)}
                  className={`w-16 h-16 bg-slate-50 dark:bg-slate-950 border overflow-hidden cursor-pointer transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "border-brand-gold shadow-sm ring-1 ring-brand-gold scale-95"
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
      {/* Reusable modal window layer */}
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

export default AdminPropertyDetailMedia;
