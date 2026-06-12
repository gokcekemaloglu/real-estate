import React from "react";

const PropertyHeader = () => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-3 block">
        Seçkin Yaşam Alanları Koleksiyonu
      </span>
      <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
        Özel Portföy <br />
        <span className="font-serif italic text-brand-gold dark:text-amber-400">
          İlanları
        </span>
      </h1>
    </div>
  );
};

export default PropertyHeader;
