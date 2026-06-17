import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [titleQuery, setTitleQuery] = useState(searchParams.get("search[title]") || "")
  const [listingType, setListingType] = useState(searchParams.get("filter[listingType]") || "")
  const [district, setDistrict] = useState(searchParams.get("filter[district]") || "")
  const [propertyCategory, setPropertyCategory] = useState(searchParams.get("filter[propertyCategory]") || "")
  const [heatingType, setHeatingType] = useState(searchParams.get("filter[heatingType]") || "")

  // Synchronizes fields back to empty immediately upon reset actions
  useEffect(() => {
    setTitleQuery(searchParams.get("search[title]") || "")
    setListingType(searchParams.get("filter[listingType]") || "")
    setDistrict(searchParams.get("filter[district]") || "")
    setPropertyCategory(searchParams.get("filter[propertyCategory]") || "")
    setHeatingType(searchParams.get("filter[heatingType]") || "")
  }, [searchParams])

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

    if (field === "propertyCategory") {
      setPropertyCategory(value)
      if (value) newParams.set("filter[propertyCategory]", value)
      else newParams.delete("filter[propertyCategory]")
    }

    if (field === "heatingType") {
      setHeatingType(value)
      if (value) newParams.set("filter[heatingType]", value)
      else newParams.delete("filter[heatingType]")
    }

    newParams.set("page", "1")
    setSearchParams(newParams, { replace: true })
  }

  return (
    <div
      className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end transition-colors duration-300"
    >
      {/* 1. Keyword Text Search */}
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

      {/* 2. Listing Type Enums (sale/rent) */}
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

      {/* 3. Property Category Enums (apartment/house/villa/land/commercial) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Kategori</label>
        <select 
          value={propertyCategory}
          onChange={(e) => handleSelectChange("propertyCategory", e.target.value)}
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-light focus:border-brand-gold cursor-pointer"
        >
          <option value="">Tümü</option>
          <option value="apartment">Apartman Dairesi</option>
          <option value="house">Müstakil Ev</option>
          <option value="villa">Villa</option>
          <option value="land">Arsa / Arazi</option>
          <option value="commercial">Ticari Mülk</option>
        </select>
      </div>

      {/* 4. Localized Districts */}
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

      {/* 5. Heating Type Enums (combi/air_conditioner/electric/central_share_meter/central/none) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Isıtma Tipi</label>
        <select 
          value={heatingType}
          onChange={(e) => handleSelectChange("heatingType", e.target.value)}
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-light focus:border-brand-gold cursor-pointer"
        >
          <option value="">Tümü</option>
          <option value="combi">Kombi</option>
          <option value="air_conditioner">Klima</option>
          <option value="central_share_meter">Merkezi Pay Ölçer</option>
          <option value="central">Merkezi Sistem</option>
          <option value="electric">Elektrikli Radyatör</option>
          <option value="none">Isıtma Yok</option>
        </select>
      </div>

    </div>
  )
}

export default PropertyFilters