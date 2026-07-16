import React from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImagePlaceholder from "../ImagePlaceholder";

const PropertyRowCard = ({ property, propertyImages, isFavorite = false, onFavoriteToggle }) => {
  const navigate = useNavigate();
  // const { token } = useSelector((state) => state.auth)
  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;
  // const fallbackPlaceholder = "https://unsplash.com";

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getListingBadge = (type) => {
    const badges = {
      sale: "Satılık",
      rent: "Kiralık",
      transfer_sale: "Devren Satılık",
      transfer_rent: "Devren Kiralık",
    };
    return badges[type] || "Portföy";
  };

  // 1. Resolve core cover asset identifiers dynamically
  let targetCoverImage = propertyImages?.find(
    (img) => img.propertyId === property?._id && img.isCover,
  );
  if (!targetCoverImage && propertyImages?.length > 0) {
    targetCoverImage = propertyImages.find(
      (img) => img.propertyId === property?._id,
    );
  }

  const hasValidImage = !!targetCoverImage
  const resolvedImageSrc = hasValidImage
    ? `${IMAGE_BASE_URL}${targetCoverImage.imageUrl}`
    : null;

  // const handleFavoriteClick = (e) => {
  //   e.stopPropagation(); // Stop click propagation from accidentally navigating deep into detail pages
  //   if (!token) {
  //     return SweetNotify("Bu ilanı favorilerinize eklemek için lütfen önce giriş yapınız.", SweetAlertIcons.WARNING);
  //   }
  //   if (onFavoriteToggle) {
  //     onFavoriteToggle(property?._id);
  //   }
  // };
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch gap-4 transition-all duration-300 hover:shadow-xl animate-fade-in w-full">
      {/* Left Segment: Premium Image Framework Panel */}
      <div className="relative h-48 w-full md:w-64 bg-slate-200 dark:bg-slate-950 overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/properties/${property?._id}`)}>
        {hasValidImage ? (
          <img
            src={resolvedImageSrc}
            alt={property?.title || "Real Estate Portfolio"}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0   group-hover:scale-103 transition-all duration-700 contrast-110"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder/>
        )}
        
        <span className="absolute top-3 left-3 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[9px] uppercase tracking-widest px-2.5 py-1 font-medium shadow-sm">
          {getListingBadge(property?.listingType)}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Stops deep routing detail page jumps safely
            if (onFavoriteToggle) onFavoriteToggle(property?._id);
          }}
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-brand-dark/60 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-md text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group/rowheart"
        >
          <svg 
            className={`w-3.5 h-3.5 transition-colors duration-300 ${isFavorite ? "fill-brand-gold text-brand-gold" : "fill-transparent text-white group-hover/rowheart:text-brand-gold"}`} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.318 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Right Segment: Unified Information Node Sheet */}
      <div className="p-5 flex flex-col md:flex-row flex-1 justify-between gap-4 items-start md:items-center">
        {/* Core Metadata Titles Sub-panel */}
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium">
            {property?.district || "—"} / {property?.city || "—"}
          </span>
          <h3 className="text-base font-serif font-normal text-slate-800 dark:text-white tracking-wide group-hover:text-brand-gold transition-colors duration-300">
            {property?.title}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-light line-clamp-1 mt-1">
            {property?.description || "Bu seçkin portföy için henüz açıklama metni eklenmemiştir."}
          </p>

          {/* Internal Minimal Architecture Specifications Ribbon Line */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 font-light mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/40 w-full max-w-sm">
            <span>
              📐 {property?.grossArea ? `${property.grossArea} m²` : "—"}
            </span>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <span>🛏️ {property?.roomCount || "—"}</span>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <span>🚿 {property?.bathroomCount ?? "—"} Banyo</span>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <span>👥 {property?.viewsCount ?? "—"} Ziyaretçi</span>
          </div>
        </div>

        {/* Pricing Actions Context Footer */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-2 md:gap-16 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800/40 shrink-0">
          <span className="text-lg font-medium text-brand-gold dark:text-amber-400 whitespace-nowrap">
            {formatPrice(property?.price)}
            {property?.listingType?.includes("rent") ? " / Ay" : ""}
          </span>
          <button
            onClick={() => navigate(`/properties/${property?._id}`)}
            className="text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium border-b border-slate-300 dark:border-slate-700 hover:border-brand-gold dark:hover:border-brand-gold pb-0.5 transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Detayları Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyRowCard;
