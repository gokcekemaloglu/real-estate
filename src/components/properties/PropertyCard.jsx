import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlertIcons, SweetNotify } from "../../helper/SweetNotify";

const PropertyCard = ({ property, propertyImages, viewMode, isFavorite = false, onFavoriteToggle }) => {
  const navigate = useNavigate();
  // const { token } = useSelector((state) => state.auth)
  const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Unified luxury currency parser formatting numbers to localized Turkish Lira symbols
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Maps backend enum listing variants to elite display representations smoothly
  const getListingBadge = (type) => {
    const badges = {
      sale: "Satılık",
      rent: "Kiralık",
      transfer_sale: "Devren Satılık",
      transfer_rent: "Devren Kiralık"
    };
    return badges[type] || "Portföy";
  };

  // Hardcoded premium architecture backdrop array acting as fallback until images schema goes live
  const fallbackPlaceholder = "https://unsplash.com";
  // 1. Search for the designated cover image belonging to this card first
  let targetCoverImage = propertyImages?.find(
    (image) => image.propertyId === property?._id && image.isCover
  );

  // 2. Fallback to the very first index asset node slot if no active cover tag is enforced
  if (!targetCoverImage && propertyImages?.length > 0) {
    targetCoverImage = propertyImages.find((image) => image.propertyId === property?._id);
  }

  // 3. Resolve clean binary address path string
  const resolvedImageSrc = targetCoverImage 
    ? `${IMAGE_BASE_URL}${targetCoverImage.imageUrl}` 
    : fallbackPlaceholder;

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
    <div className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex transition-all duration-300 animate-fade-in ${ viewMode === "row" ? "flex-col md:flex-row h-auto md:h-64 w-full" : "flex-col h-full w-full" }`}>
      
      {/* Card Image Block Component Layout Frame */}
      <div className={`relative bg-slate-200 dark:bg-slate-950 overflow-hidden shrink-0 ${ viewMode === "row" ? "h-64 md:h-full w-full md:w-80" : "h-64 w-full" }`}>
        <img
          src={resolvedImageSrc}
          alt={property?.title || "Real Estate Portfolio"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent"></div>

        {/* Premium Conditional Listing Type Badge */}
        <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-3 py-1.5 font-medium shadow-md">
          {getListingBadge(property?.listingType)}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Stops deep routing detail page jumps safely
            if (onFavoriteToggle) onFavoriteToggle(property?._id);
          }}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-brand-dark/60 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group/heart"
          title={isFavorite ? "Favorilerimden Kaldır" : "Favorilerime Ekle"}
        >
          <svg 
            className={`w-4 h-4 transition-colors duration-300 ${isFavorite ? "fill-brand-gold text-brand-gold animate-heart-beat" : "fill-transparent text-white group-hover/heart:text-brand-gold"}`} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.318 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
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
            <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">Alan</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{property?.grossArea ? `${property.grossArea} m²` : "—"}</span>
          </div>
          <div className="border-r border-slate-100 dark:border-slate-800/60 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">Oda</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{property?.roomCount || "—"}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">Banyo</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {property?.bathroomCount === null || property?.bathroomCount === undefined || property?.bathroomCount === "" ? "—" : property.bathroomCount}
            </span>
          </div>
        </div>

        {/* Footer actions displaying real-time monetary figures and detail pointers */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <span className="text-base font-medium text-brand-gold dark:text-amber-400">
            {formatPrice(property?.price)}{property?.listingType?.includes("rent") ? " / Ay" : ""}
          </span>
          <button 
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