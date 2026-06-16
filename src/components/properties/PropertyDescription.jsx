import React from "react";

const PropertyDescription = ({description}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-serif text-slate-800 dark:text-white">
        Mimari Açıklama
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed whitespace-pre-line">
        {description ||
          "Bu seçkin portföy için henüz detaylı bir mimari açıklama metni girilmemiştir."}
      </p>
    </div>
  );
};

export default PropertyDescription;
