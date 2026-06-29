import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdminSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isUserPage = window.location.pathname.includes("users");

  const [keywordQuery, setKeywordQuery] = useState(searchParams.get("search[q]") || "");

  const currentSortKey = searchParams.get("sort[firstName]")
    ? `firstName:${searchParams.get("sort[firstName]")}`
    : searchParams.get("sort[lastName]")
    ? `lastName:${searchParams.get("sort[lastName]")}`
    : searchParams.get("sort[userName]")
    ? `userName:${searchParams.get("sort[userName]")}`
    : searchParams.get("sort[isAdmin]")
    ? `isAdmin:${searchParams.get("sort[isAdmin]")}`
    : searchParams.get("sort[createdAt]")
    ? `createdAt:${searchParams.get("sort[createdAt]")}`
    : "createdAt:-1"; // Corporate default layout fallback
  
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

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    const [field, direction] = selectedValue.split(":");
    const newParams = new URLSearchParams(searchParams);

    // Completely purge existing sort indicators before executing mutations
    newParams.delete("sort[firstName]");
    newParams.delete("sort[lastName]");
    newParams.delete("sort[userName]");
    newParams.delete("sort[isAdmin]");
    newParams.delete("sort[createdAt]");

    // Inject the new clean sort parameter matching backend middleware criteria
    if (field && direction) {
      newParams.set(`sort[${field}]`, direction);
    }

    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams({ page: "1" }, { replace: true });
    setKeywordQuery(""); // Wipes out localized layout text field parameters immediately
  };

  const hasActiveFilters = searchParams.get("search[q]") || searchParams.get("sort[firstName]") || searchParams.get("sort[lastName]") || searchParams.get("sort[userName]") || searchParams.get("sort[isAdmin]");

  return (
    <div className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-5 shadow-md mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 transition-colors duration-300 animate-fade-in">
      <div className="flex flex-col gap-1.5 w-full md:max-w-md">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Hızlı Portföy Arama
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder={isUserPage ? "Kullanıcı adı veya e-posta ile arayın..." : "Müşteri adı, soyadı veya telefon ile arayın..."}
            value={keywordQuery}
            onChange={(e) => setKeywordQuery(e.target.value)}
            className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold pr-10"
          />
        </div>
      </div>
      {/* Right Column Segment: Dynamic Sorting Controls Dropdown Ribbon */}
      <div className="flex flex-col items-start gap-2 self-start sm:self-auto shrink-0">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium whitespace-nowrap">
          Sıralama:
        </label>
        <select
          value={currentSortKey}
          onChange={handleSortChange}
          className="input-premium py-1.5 px-3 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 focus:border-brand-gold cursor-pointer min-w-44"
        >
          {/* Default universal sort triggers */}
          <option value="createdAt:-1">En Yeni Kayıtlar</option>
          <option value="createdAt:1">En Eski Kayıtlar</option>

          {/* Conditional layout nodes mapped safely straight against targeted DB models definitions */}
          {isUserPage ? (
            <>
              <option value="userName:1">Kullanıcı Adı: A - Z</option>
              <option value="userName:-1">Kullanıcı Adı: Z - A</option>
              <option value="isAdmin:-1">Önce Yönetecileri (Admin) Göster</option>
              <option value="isAdmin:1">Önce Standart Üyeleri Göster</option>
            </>
          ) : (
            <>
              <option value="firstName:1">İsim: A - Z</option>
              <option value="firstName:-1">İsim: Z - A</option>
              <option value="lastName:1">Soy İsim: A - Z</option>
              <option value="lastName:-1">Soy İsim: Z - A</option>
            </>
          )}
        </select>
      </div>
      {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[10px] uppercase tracking-widest font-semibold text-red-500 hover:text-red-600 border border-red-500/20 hover:border-red-500/40 px-3 py-2 bg-red-50/50 dark:bg-red-950/10 transition-colors duration-200 cursor-pointer h-8.5 flex items-center justify-center shrink-0"
            title="Filtreleri Temizle"
          >
            Sıfırla ✕
          </button>
        )}
    </div>
  );
};

export default AdminSearchFilters;
