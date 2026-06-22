import React from "react";

const AdminPropertyDetailAddress = ({property}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-3 shadow-sm">
      <h3 className="text-sm lg:text-base uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
        Açık Konum Bilgisi
      </h3>
      <div className="flex flex-col gap-0.5">
        <span className="text-[12px] uppercase tracking-widest text-slate-400">
          Mahalle & Adres
        </span>
        <p className="text-sm lg:text-base font-light text-slate-600 dark:text-slate-400 leading-relaxed font-sans mt-1">
          {property?.neighbourhood} {property?.fullAddress}
        </p>
      </div>
    </div>
  );
};

export default AdminPropertyDetailAddress;
