import React from "react";
import { useSearchParams } from "react-router-dom";

const PropertyDisplayBar = ({ viewMode, setViewMode, totalRecords = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("[PropertyDisplayBar] render edildi. viewMode:", viewMode, "| setViewMode tipi:", typeof setViewMode);
  // Unified sorting states extracted cleanly from dynamic URL search query parameters
  const currentSortKey = searchParams.get("sort[price]")
    ? `price:${searchParams.get("sort[price]")}`
    : searchParams.get("sort[createdAt]")
      ? `createdAt:${searchParams.get("sort[createdAt]")}`
      : searchParams.get("sort[title]")
        ? `title:${searchParams.get("sort[title]")}`
        : "createdAt:-1"; // Secure standard default layout fallback

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    // console.log(selectedValue);
    
    const [field, direction] = selectedValue.split(":");
    const newParams = new URLSearchParams(searchParams);

    // Clear all existing sort identifiers before applying new structural bounds
    newParams.delete("sort[price]");
    newParams.delete("sort[createdAt]");
    newParams.delete("sort[title]");

    // Map pristine query identifiers that your backend queryHandler natively expects
    if (field && direction) {
      newParams.set(`sort[${field}]`, direction);
    }

    // Reset page pointer gracefully to avoid query out-of-bounds calculations
    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };
  return (
    <div className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 shadow-md mb-6 flex items-center justify-between gap-4 transition-colors duration-300 animate-fade-in">
      {/* Left Block: Real-time Data Record Counters info string */}
      <div className="text-xs font-light text-slate-400 uppercase tracking-wider">
        Toplam{" "}
        <span className="font-medium text-slate-800 dark:text-white">
          {totalRecords}
        </span>{" "}
        İlan Portföyü
      </div>

      {/* Right Block: Sorting Selector and Visual Grid/Row Layout Controllers */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Dynamic Premium Sorting Dropdown Field Container */}
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium hidden sm:inline">
            Sıralama:
          </label>
          <select
            value={currentSortKey}
            onChange={handleSortChange}
            className="input-premium py-1.5 px-3 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 focus:border-brand-gold cursor-pointer"
          >
            <option value="createdAt:-1">En Yeni İlanlar</option>
            <option value="createdAt:1">En Eski İlanlar</option>
            <option value="price:1">Fiyat: Düşükten Yükseğe</option>
            <option value="price:-1">Fiyat: Yüksekten Düşüğe</option>
            <option value="title:1">İsim: A'dan Z'ye</option>
            <option value="title:-1">İsim: Z'den A'ya</option>
          </select>
        </div>

        {/* Dynamic Layout Toggles (Grid / Row) bubble switch panel */}
        <div className="flex items-center border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950/40">
          {/* Grid Layout Trigger Option Button */}
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-brand-gold text-white shadow-xs"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
            title="Kart Görünümü"
          >
            🎴
          </button>

          {/* Row Layout Trigger Option Button */}
          <button
            type="button"
            onClick={() => setViewMode("row")}
            className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition-all duration-200 ${
              viewMode === "row"
                ? "bg-brand-gold text-white shadow-xs"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
            title="Satır Görünümü"
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDisplayBar;
