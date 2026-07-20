import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isRentType, listingTypeOptions, categoryOptions, heatingOptions, districtOptions } from '../../helper/propertyOptions'

const PropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [titleQuery, setTitleQuery] = useState(searchParams.get("search[title]") || "")
  const [listingType, setListingType] = useState(searchParams.get("filter[listingType]") || "")
  const [district, setDistrict] = useState(searchParams.get("filter[district]") || "")
  const [propertyCategory, setPropertyCategory] = useState(searchParams.get("filter[propertyCategory]") || "")
  const [heatingType, setHeatingType] = useState(searchParams.get("filter[heatingType]") || "")

  // const listingTypeOptions = [
  //   { value: "", label: "Tümü" },
  //   { value: "sale", label: "Satılık" },
  //   { value: "rent", label: "Kiralık" },
  //   { value: "transfer_sale", label: "Devren Satılık" },
  //   { value: "transfer_rent", label: "Devren Kiralık" }
  // ];

  // const categoryOptions = [
  //   { value: "", label: "Tümü" },
  //   { value: "apartment", label: "Apartman Dairesi" },
  //   { value: "house", label: "Müstakil Ev" },
  //   { value: "villa", label: "Villa" },
  //   { value: "land", label: "Arsa / Arazi" },
  //   { value: "commercial", label: "Ticari Mülk" }
  // ];

  // const districtOptions = [
  //   { value: "", label: "Tümü" },
  //   { value: "Seyhan", label: "Seyhan" },
  //   { value: "Çukurova", label: "Çukurova" },
  //   { value: "Sarıçam", label: "Sarıçam" },
  //   { value: "Yüreğir", label: "Yüreğir" },
  //   { value: "Karataş", label: "Karataş" },
  //   { value: "Yumurtalık", label: "Yumurtalık" },
  //   { value: "Pozantı", label: "Pozantı" },
  //   { value: "Mersin", label: "Mersin (Çevre Bölge)" }
  // ];

  // const heatingOptions = [
  //   { value: "", label: "Tümü" },
  //   { value: "combi", label: "Kombi" },
  //   { value: "air_conditioner", label: "Klima" },
  //   { value: "central_share_meter", label: "Merkezi Pay Ölçer" },
  //   { value: "central", label: "Merkezi Sistem" },
  //   { value: "electric", label: "Elektrikli Radyatör" },
  //   { value: "none", label: "Hiçbiri" }
  // ];

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

  const handleSelectChange = (field, value) => {
    const newParams = new URLSearchParams(searchParams)
    // Dynamic local state setters routing mappings
    if (field === "listingType") setListingType(value);
    if (field === "district") setDistrict(value);
    if (field === "propertyCategory") setPropertyCategory(value);
    if (field === "heatingType") setHeatingType(value);

    // Formulate backend routing param target structures keys dynamically (e.g., 'filter[district]')
    const paramKey = `filter[${field}]`;

    if (value) {
      newParams.set(paramKey, value)
    } else {
      newParams.delete(paramKey)
    }

    newParams.set("page", "1") // Reset page pointer gracefully to prevent range calculation errors
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
          {listingTypeOptions?.map(option => <option key={option.value} value={option.value}>{option.label}</option> )}
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
          {categoryOptions?.map(option => <option key={option.value} value={option.value}>{option.label}</option> )}
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
          <option value="">Tümü</option>
          {districtOptions?.map(option => <option key={option.value} value={option.value}>{option.label}</option> )}
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
          {heatingOptions?.map(option => <option key={option.value} value={option.value}>{option.label}</option> )}
        </select>
      </div>

    </div>
  )
}

export default PropertyFilters