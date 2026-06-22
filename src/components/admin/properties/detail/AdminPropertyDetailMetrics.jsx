import React from "react";

const AdminPropertyDetailMetrics = ({property}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
      <h3 className="text-sm lg:text-base uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        Metrik Ölçüler & Donanım
      </h3>
      {/* Quantitative metrics and architectural dimension parameters grid matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-slate-600 dark:text-slate-400">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Brüt Alan
          </span>
          <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
            {property?.grossArea ? `${property.grossArea} m²` : "-"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Net Kullanım
          </span>
          <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
            {property?.netArea ? `${property.netArea} m²` : "-"}
          </span>
        </div>
        {/* Room Count Configuration */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Oda Dağılımı
          </span>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {property?.roomCount || "-"}
          </span>
        </div>
        {/* Bathroom Count Configuration */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Banyo Sayısı
          </span>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {property?.bathroomCount ?? 0} Banyo
          </span>
        </div>
        {/* Building Age Field */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Bina Yaşı
          </span>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {property?.buildingAge ?? 0} Yaş
          </span>
        </div>
        {/*  Recent Floor Field */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Bulunduğu Kat
          </span>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {property?.floor ?? 0}. Kat
          </span>
        </div>
        {/*  Total Floors Capacity Field */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Toplam Kat
          </span>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {property?.totalFloors ? `${property.totalFloors} Kat` : "-"}
          </span>
        </div>
        {/*  Heating Type Field */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Isıtma Altyapısı
          </span>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200 uppercase tracking-tight text-[10px]">
            {property?.heatingType || "Yok"}
          </span>
        </div>
      </div>

      {/* Hardware Flags Toggles Boolean Indicator Row */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-50 dark:border-slate-800/40 text-[10px] uppercase font-medium text-slate-400">
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 ${property?.isFurnished ? "bg-brand-gold" : "bg-slate-300 dark:bg-slate-700"}`}
          ></div>
          <span>{property?.isFurnished ? "Eşyalı" : "Eşyasız"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 ${property?.hasElevator ? "bg-brand-gold" : "bg-slate-300 dark:bg-slate-700"}`}
          ></div>
          <span>{property?.hasElevator ? "Asansör Var" : "Asansör Yok"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 ${property?.hasParking ? "bg-brand-gold" : "bg-slate-300 dark:bg-slate-700"}`}
          ></div>
          <span>{property?.hasParking ? "Otopark Var" : "Otopark Yok"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 ${property?.isLoanEligible ? "bg-brand-gold" : "bg-slate-300 dark:bg-slate-700"}`}
          ></div>
          <span>
            {property?.isLoanEligible ? "Krediye Uygun" : "Krediye Uygun Değil"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyDetailMetrics;
