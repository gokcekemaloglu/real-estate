import React from "react";

const AdminPropertyDetailPrice = ({ property }) => {
  return (
    <div className="bg-brand-dark dark:bg-slate-950 border border-slate-800 p-6 flex flex-col gap-1.5 shadow-md">
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] uppercase tracking-widest text-amber-400/80 font-medium">
          Hedef Portföy Değeri
        </span>
        <span className="text-2xl font-serif text-white tracking-wide">
          {new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
          }).format(property?.price || 0)}
        </span>
      </div>
      {/* Monthly operational maintenance fee layout context */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-800/80 text-white font-light">
        <span className="text-[10px] uppercase tracking-widest text-slate-400">
          Aylık Aidat
        </span>
        <span className="text-xs font-mono">
          {property?.maintenanceFee === null ||
          property?.maintenanceFee === undefined ? (
            <span className="text-slate-500 italic">Belirtilmedi</span>
          ) : (
            new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              maximumFractionDigits: 0,
            }).format(property.maintenanceFee)
          )}
        </span>
      </div>
    </div>
  );
};

export default AdminPropertyDetailPrice;
