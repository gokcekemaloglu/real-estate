import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

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
  const defaultImage = "https://unsplash.com";

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-colors duration-300">
      
      {/* Card Image Block Component Layout Frame */}
      <div className="relative h-64 w-full bg-slate-200 dark:bg-slate-950 overflow-hidden">
        <img
          src={defaultImage}
          alt={property?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent"></div>

        {/* Premium Conditional Listing Type Badge */}
        <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-3 py-1.5 font-medium shadow-md">
          {getListingBadge(property?.listingType)}
        </span>
      </div>

      {/* Card Information Body Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium">
            {property?.district} / {property?.city}
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
            <span className="font-medium text-slate-700 dark:text-slate-300">{property?.bathroomCount ?? 0}</span>
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