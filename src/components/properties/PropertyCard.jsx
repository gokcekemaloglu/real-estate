import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlertIcons, SweetNotify } from "../../helper/SweetNotify";
import ImagePlaceholder from "../ImagePlaceholder";
import { formatPrice, getListingBadge, getPriceSuffix, resolveMediaUrl } from "../../helper/propertyOptions";
import FavoriteButton from "./FavoriteButton";

const PropertyCard = ({ property, propertyImages, viewMode, isFavorite = false, onFavoriteToggle }) => {
  const navigate = useNavigate();

  // 1. Search for the designated cover image belonging to this card first
  let targetCoverImage = propertyImages?.find(
    (image) => image.propertyId === property?._id && image.isCover
  );

  // 2. Fallback to the very first index asset node slot if no active cover tag is enforced
  if (!targetCoverImage && propertyImages?.length > 0) {
    targetCoverImage = propertyImages.find((image) => image.propertyId === property?._id);
  }
  // 3. Resolve clean binary address path string
  const resolvedImageSrc = resolveMediaUrl(targetCoverImage?.imageUrl);

  return (
    <div className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex transition-all duration-300 animate-fade-in ${ viewMode === "row" ? "flex-col md:flex-row h-auto md:h-64 w-full" : "flex-col h-full w-full" }`}>
      
      {/* Card Image Block Component Layout Frame */}
      <div className={`relative cursor-pointer bg-slate-200 dark:bg-slate-950 overflow-hidden shrink-0 ${ viewMode === "row" ? "h-64 md:h-full w-full md:w-80" : "h-64 w-full" }`} onClick={() => navigate(`/properties/${property?._id}`)}>
        {resolvedImageSrc ? (
          <img
            src={resolvedImageSrc}
            alt={property?.title || "Real Estate Portfolio"}
            className="w-full h-full object-cover   group-hover:scale-105 transition-transform  duration-700"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder/>
        )}
        
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent"></div>

        {/* Premium Conditional Listing Type Badge */}
        <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-3 py-1.5 font-medium shadow-md">
          {getListingBadge(property?.listingType)}
        </span>
        <FavoriteButton propertyId={property?._id} size="md" className="absolute top-4 right-4" />
      </div>

      {/* Card Information Body Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium">
            {property?.district || "—"} / {property?.city || "—"}
          </span>
          <h3 className="text-lg font-serif font-normal text-slate-800 dark:text-white tracking-wide group-hover:text-brand-gold transition-colors duration-300 line-clamp-1">
            {property?.title}
          </h3>
        </div>

        {/* Tactical Architectural Specs Bar utilizing synced Mongoose parameters */}
        <div className="grid grid-cols-3 border-y border-slate-100 dark:border-slate-800/60 py-3 text-center text-xs text-slate-500 dark:text-slate-400 font-light">
          <div className="border-r border-slate-100 dark:border-slate-800/60 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-500 dark:text-slate-400 font-medium">Alan</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{property?.grossArea ? `${property.grossArea} m²` : "—"}</span>
          </div>
          <div className="border-r border-slate-100 dark:border-slate-800/60 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-500 dark:text-slate-400 font-medium">Oda</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{property?.roomCount || "—"}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-500 dark:text-slate-400 font-medium">Banyo</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {property?.bathroomCount === null || property?.bathroomCount === undefined || property?.bathroomCount === "" ? "—" : property.bathroomCount}
            </span>
          </div>
        </div>

        {/* Footer actions displaying real-time monetary figures and detail pointers */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex flex-col gap-2">
            <span className="text-base font-medium text-brand-gold dark:text-amber-400">
              {formatPrice(property?.price)}{getPriceSuffix(property?.listingType, property?.rentPeriod)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-light font-sans mt-0.5">
              👥 {property?.viewsCount ?? 0} Ziyaretçi
            </span>
          </div>
          <button 
            title="Detayları Gör"
            onClick={() => navigate(`/properties/${property?._id}`)}
            className="text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium border-b border-slate-300 dark:border-slate-700 hover:border-brand-gold dark:hover:border-brand-gold pb-0.5 transition-colors duration-300 cursor-pointer"
          >
            Detayları Gör
          </button>
        </div>
      </div>

    </div>
  );
};

export default PropertyCard;
