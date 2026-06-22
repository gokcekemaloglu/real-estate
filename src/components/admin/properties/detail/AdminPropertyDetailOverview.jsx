import React from "react";

const AdminPropertyDetailOverview = ({property}) => {
  const categoryLabels = {
    apartment: "Daire",
    house: "Müstakil Ev",
    villa: "Villa",
    land: "Arsa / Arazi",
    commercial: "Ticari Mülk / İş Yeri",
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-[12px] uppercase tracking-wider text-brand-gold font-semibold">
          {categoryLabels[property?.propertyCategory] || "Gayrimenkul"}  /  {property?.district || "-"}  /  Adana
        </span>
        <h2 className="text-2xl font-serif text-slate-800 dark:text-white font-light">
          {property?.title}
        </h2>
        {/* Elegant owner identification link card integration */}
        {property?.ownerId && (
          <p className="text-xs text-slate-400 dark:text-slate-500 font-light mt-1.5 border-t border-slate-50 dark:border-slate-800/40 pt-1.5">
            Mülk Sahibi Portfolio: <strong className="font-medium text-slate-700 dark:text-slate-300">{property.ownerId.firstName} {property.ownerId.lastName}</strong> | <span className="font-mono">{property.ownerId.phone}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-50 dark:border-slate-800/40">
        <span className="text-[12px] uppercase tracking-widest text-slate-400 font-medium">
          Mimari Açıklama
        </span>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light whitespace-pre-line text-justify">
          {property?.description ||
            "Bu portföy kartı için herhangi bir mimari açıklama metni girilmemiştir."}
        </p>
      </div>
    </div>
  );
};

export default AdminPropertyDetailOverview;
