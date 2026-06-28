import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdminSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keywordQuery, setKeywordQuery] = useState(searchParams.get("search[q]") || "");
  useEffect(() => {
    setKeywordQuery(searchParams.get("search[q]") || "");
  }, [searchParams]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      const currentQueryValue = searchParams.get("search[q]") || "";
      const cleanInput = keywordQuery.trim();

      if (cleanInput === currentQueryValue) return;

      if (cleanInput) {
        // Backend queryHandler structures unpack multiple keyword targets flawlessly
        newParams.set("search[q]", cleanInput);
      } else {
        newParams.delete("search[q]");
      }

      // Reset page pointer gracefully to avoid runtime out-of-bounds calculations
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
    }, 900);

    return () => clearTimeout(delayDebounceFn);
  }, [keywordQuery, searchParams, setSearchParams]);
  return (
    <div className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-5 shadow-md mb-6 transition-colors duration-300">
      <div className="flex flex-col gap-1.5 w-full max-w-md">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Hızlı Portföy Arama
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="İsim, soyisim veya telefon ile arayın..."
            value={keywordQuery}
            onChange={(e) => setKeywordQuery(e.target.value)}
            className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold pr-10"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSearchFilters;
