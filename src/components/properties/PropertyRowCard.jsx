import React from "react";
import { useNavigate } from "react-router-dom";
import ImagePlaceholder from "../ImagePlaceholder";
import { formatPrice, getListingBadge, getPriceSuffix, resolveMediaUrl } from "../../helper/propertyOptions";
import FavoriteButton from "./FavoriteButton";

const PropertyRowCard = ({ property, propertyImages, isFavorite = false, onFavoriteToggle }) => {
  const navigate = useNavigate();

  // 1. Resolve core cover asset identifiers dynamically
  let targetCoverImage = propertyImages?.find(
    (img) => img.propertyId === property?._id && img.isCover,
  );
  if (!targetCoverImage && propertyImages?.length > 0) {
    targetCoverImage = propertyImages.find(
      (img) => img.propertyId === property?._id,
    );
  }

  // const hasValidImage = !!targetCoverImage
  const resolvedImageSrc = resolveMediaUrl(targetCoverImage?.imageUrl);

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch gap-4 transition-all duration-300 hover:shadow-xl animate-fade-in w-full">
      {/* Left Segment: Premium Image Framework Panel */}
      <div className="relative h-48 w-full md:w-64 bg-slate-200 dark:bg-slate-950 overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/properties/${property?._id}`)}>
        {resolvedImageSrc ? (
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
        <FavoriteButton propertyId={property?._id} size="sm" className="absolute top-3 right-3" />
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
            {getPriceSuffix(property?.listingType, property?.rentPeriod)}
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
