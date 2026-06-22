import React from "react";

const AdminPropertyDetailPrice = ({property}) => {
  return (
    <div className="bg-brand-dark dark:bg-slate-950 border border-slate-800 p-6 flex flex-col gap-1.5 shadow-md">
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
  );
};

export default AdminPropertyDetailPrice;
