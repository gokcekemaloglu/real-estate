import React from "react";
import { useSearchParams } from "react-router-dom";

const AdminActiveFilter = ({label = "Kayıt Durumu"}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Safely extracts the active backend query identifier string directly from the browser URL location strings
  const currentStatus = searchParams.get("filter[isActive]") || "";

  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    // If a specific value exists, we set the strict boolean query string, otherwise we purge it to fetch the baseline layout
    if (selectedValue) {
      newParams.set("filter[isActive]", selectedValue);
    } else {
      newParams.delete("filter[isActive]");
    }

    // Always reset the pagination counter back to baseline index 1 to avoid runtime index calculation bugs
    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };
  return (
    <div className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 shadow-md mb-2 transition-colors duration-300 animate-fade-in flex flex-col gap-1.5 max-w-xs self-start">
      <label className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold">
        {label}
      </label>
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className="input-premium bg-slate-100 dark:bg-slate-950/60 border-brand-gold/20 text-xs text-slate-700 dark:text-slate-300 font-light focus:border-brand-gold cursor-pointer w-full font-sans"
      >
        <option value="">Tümü (Aktif + Pasif)</option>
        <option value="true">Sadece Aktif Kayıtlar</option>
        <option value="false">Sadece Pasif Kayıtlar</option>
      </select>
    </div>
  );
};

export default AdminActiveFilter;
