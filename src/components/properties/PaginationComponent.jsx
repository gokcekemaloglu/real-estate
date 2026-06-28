import React from "react";
import { useSearchParams } from "react-router-dom";

const PaginationComponent = ({ details, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // console.log("Details-->", details);  

  const totalRecords = details?.totalRecords || 0;
  const totalPages = details?.pages?.total !== undefined && details?.pages !== false ? details?.pages?.total : 1;
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : details?.pages?.current || 1;
  const pageSize = details?.limit || 24;

  // Calculates structural records boundaries for UI info strings
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(totalRecords, currentPage * pageSize);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      // setSearchParams({ page })
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", newPage.toString());
      setSearchParams(newParams, { replace: true });
    }
  };
  if (totalPages <= 1 && totalRecords === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 mt-12 font-display text-xs text-slate-500 dark:text-slate-400 gap-4">
      {/* Information text matching high-end platform UX architectures */}
      <div>
        {totalRecords === 0 ? (
          "Gösterilecek ilan bulunmuyor"
        ) : (
          <p className="font-light">
            Toplam <span className="font-medium text-slate-800 dark:text-white">{totalRecords}</span> {label} {" "} arasından {" "}
            <span className="font-medium text-brand-gold">{startRecord} - {endRecord}</span> arası gösteriliyor
          </p>
        )}
      </div>

      {/* Luxury Minimalist Controls Grid bar instead of heavy MUI library injections */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-slate-200 dark:border-slate-800 hover:border-brand-gold dark:hover:border-brand-gold disabled:opacity-30 disabled:hover:border-slate-200 transition-colors cursor-pointer disabled:cursor-not-allowed uppercase tracking-widest text-[10px] font-medium text-slate-700 dark:text-slate-300"
        >
          Önceki
        </button>

        <div className="flex items-center gap-1.5 px-3">
          <span className="font-medium text-slate-800 dark:text-white">{currentPage}</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span>{totalPages}</span>
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-slate-200 dark:border-slate-800 hover:border-brand-gold dark:hover:border-brand-gold disabled:opacity-30 disabled:hover:border-slate-200 transition-colors cursor-pointer disabled:cursor-not-allowed uppercase tracking-widest text-[10px] font-medium text-slate-700 dark:text-slate-300"
        >
          Sonraki
        </button>
      </div>
    </div>
  )
};

export default PaginationComponent;
