import React from "react";
import PropertyMediaGallery from "./PropertyMediaGallery";

const PropertyGallery = ({title, listingType, propertyId, currentPropertyImages}) => {
  const badges = (
    <span className="bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-4 py-2 font-medium">
      {listingType?.includes("sale") ? "Satılık" : "Kiralık"}
    </span>
  );
  
  return (
    <PropertyMediaGallery
      images={currentPropertyImages}
      altText={title}
      badges={badges}
      heroHeightClass="h-100 md:h-125"
      containerBgClass="bg-slate-200 dark:bg-slate-950"
      thumbLabel="Portföy Fotoğrafları"
    />
  );
};

export default PropertyGallery;
