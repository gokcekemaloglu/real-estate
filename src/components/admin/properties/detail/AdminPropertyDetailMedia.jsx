import React from "react";

const AdminPropertyDetailMedia = ({property, defaultImage}) => {
  return (
    <div className="w-full h-80 bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative">
      <img
        src={defaultImage}
        alt={property?.title}
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
  );
};

export default AdminPropertyDetailMedia;
