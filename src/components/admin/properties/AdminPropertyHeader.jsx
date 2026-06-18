import React from "react";

const AdminPropertyHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-lg font-serif text-slate-800 dark:text-white font-light tracking-wide">
          İlan Portföy Yönetimi
        </h1>
        <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">
          Mevcut portföy listesi ve hızlı durum aktivasyon paneli
        </p>
      </div>
      <button className="btn-premium px-6 py-3 font-semibold text-xs tracking-widest uppercase">
        + Yeni İlan Ekle
      </button>
    </div>
  );
};

export default AdminPropertyHeader;
