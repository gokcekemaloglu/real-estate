import React from "react";

const PropertyCard = ({item}) => {
  return (
    <div
      key={item.id}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-colors duration-300"
    >
      {/* Card Image Block with relative badge element */}
      <div className="relative h-64 w-full bg-slate-200 dark:bg-slate-950 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent"></div>

        {/* Premium Type Badge */}
        <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-3 py-1.5 font-medium shadow-md">
          {item.type}
        </span>
      </div>

      {/* Card Information Body Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium">
            {item.location}
          </span>
          <h3 className="text-lg font-serif font-normal text-slate-800 dark:text-white tracking-wide group-hover:text-brand-gold transition-colors duration-300 line-clamp-1">
            {item.title}
          </h3>
        </div>

        {/* Tactical Architectural Specs Bar using semantic layout grids */}
        <div className="grid grid-cols-3 border-y border-slate-100 dark:border-slate-800/60 py-3 text-center text-xs text-slate-500 dark:text-slate-400 font-light">
          <div className="border-r border-slate-100 dark:border-slate-800/60 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">
              Alan
            </span>
            <span>{item.specs.space}</span>
          </div>
          <div className="border-r border-slate-100 dark:border-slate-800/60 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">
              Oda
            </span>
            <span>{item.specs.rooms}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-tight text-slate-400 font-medium">
              Banyo
            </span>
            <span>{item.specs.baths}</span>
          </div>
        </div>

        {/* Footer action bar enclosing real-time monetary figures */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <span className="text-base font-medium text-brand-gold dark:text-amber-400">
            {item.price}
          </span>
          <button className="text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium border-b border-slate-300 dark:border-slate-700 hover:border-brand-gold dark:hover:border-brand-gold pb-0.5 transition-colors duration-300 cursor-pointer">
            Detayları Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
