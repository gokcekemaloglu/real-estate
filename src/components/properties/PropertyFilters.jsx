import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [titleQuery, setTitleQuery] = useState(searchParams.get("search[title]") || "")
  const [listingType, setListingType] = useState(searchParams.get("filter[listingType]") || "")
  const [district, setDistrict] = useState(searchParams.get("filter[district]") || "")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams)

      if (titleQuery) {
        newParams.set("search[title]", titleQuery)
      } else {
        newParams.delete("search[title]")
      }      
      // Reset page pointer gracefully to avoid runtime out-of-bounds calculations
      newParams.set("page", "1")
      setSearchParams(newParams, { replace: true })
    }, 900)

    return () => clearTimeout(delayDebounceFn)
  }, [titleQuery])

  // Instant trigger handling selector adjustments right on user input changes
  const handleSelectChange = (field, value) => {
    const newParams = new URLSearchParams(searchParams)

    if (field === "listingType") {
      setListingType(value)
      if (value) newParams.set("filter[listingType]", value)
      else newParams.delete("filter[listingType]")
    }

    if (field === "district") {
      setDistrict(value)
      if (value) newParams.set("filter[district]", value)
      else newParams.delete("filter[district]")
    }

    newParams.set("page", "1")
    setSearchParams(newParams, { replace: true })
  }

  return (
    <div
      className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end transition-colors duration-300"
    >
          
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Arama / Anahtar Kelime</label>
        <input 
          type="text" 
          placeholder="Müstakil, Villa, Apartman..."
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Durum</label>
        <select 
          value={listingType}
          onChange={(e) => handleSelectChange("listingType", e.target.value)}
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-light focus:border-brand-gold cursor-pointer"
        >
          <option value="">Tümü</option>
          <option value="sale">Satılık</option>
          <option value="rent">Kiralık</option>
          <option value="transfer_sale">Devren Satılık</option>
          <option value="transfer_rent">Devren Kiralık</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Şehir / Bölge</label>
        <select 
          value={district}
          onChange={(e) => handleSelectChange("district", e.target.value)}
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-light focus:border-brand-gold cursor-pointer"
        >
          <option value="">Adana (Tümü)</option>
          <option value="Seyhan">Seyhan</option>
          <option value="Sarıçam">Sarıçam</option>
          <option value="Çukurova">Çukurova</option>
          <option value="Yüreğir">Yüreğir</option>
          <option value="Mersin">Mersin (Çevre Bölge)</option>
        </select>
      </div>
{/* 
      <div>
        <button type="submit" className="btn-premium w-full py-3 font-semibold text-center tracking-widest shadow-md">
          Filtrele
        </button>
      </div> */}

    </div>
  )
}

export default PropertyFilters