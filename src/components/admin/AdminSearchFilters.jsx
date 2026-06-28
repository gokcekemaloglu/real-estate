import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdminSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keywordQuery, setKeywordQuery] = useState(searchParams.get("search[firstName]") || "");
  useEffect(() => {
    setKeywordQuery(
      searchParams.get("search[firstName]") || "",
    );
  }, [searchParams]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      const currentQueryValue = searchParams.get("search[firstName]") || "";
      const cleanInput = keywordQuery.trim();

      if (cleanInput === currentQueryValue) return;

      if (cleanInput) {
        // Backend queryHandler structures unpack multiple keyword targets flawlessly
        newParams.set("search[firstName]", keywordQuery)
      } else {
        newParams.delete("search[firstName]");
      }

      // Reset page pointer gracefully to avoid runtime out-of-bounds calculations
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
    }, 900);

    return () => clearTimeout(delayDebounceFn);
  }, [keywordQuery]);
  return (
    <div className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-5 shadow-md mb-6 transition-colors duration-300">
      <div className="flex flex-col gap-1.5 w-full max-w-md">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Hızlı Portföy Arama
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="İsim, soyisim ile arayın..."
            value={keywordQuery}
            onChange={(e) => setKeywordQuery(e.target.value)}
            className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold pr-10"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            🔍
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSearchFilters;
