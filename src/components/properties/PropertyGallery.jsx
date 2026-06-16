import React from "react";

const PropertyGallery = ({title, listingType}) => {
  return (
    <div className="relative h-100 md:h-125 w-full bg-slate-200 dark:bg-slate-950 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
      <img
        src="https://unsplash.com"
        alt={title}
        className="w-full h-full object-cover"
      />
      <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-4 py-2 font-medium">
        {listingType === "sale" ? "Satılık" : "Kiralık"}
      </span>
    </div>
  );
};

export default PropertyGallery;
