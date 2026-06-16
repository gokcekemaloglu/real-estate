import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';

const PropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      title: searchParams.get("search[title]") || "",
      listingType: searchParams.get("filter[listingType]") || "",
      district: searchParams.get("filter[district]") || ""
    },
    onSubmit: (values) => {
      const newParams = new URLSearchParams(searchParams)

      // Dynamic URL sync: Set query param if filled, delete from URL if cleared
      if (values.title) newParams.set("search[title]", values.title)
      else newParams.delete("search[title]")

      if (values.listingType) newParams.set("filter[listingType]", values.listingType)
      else newParams.delete("filter[listingType]")

      if (values.district) newParams.set("filter[district]", values.district)
      else newParams.delete("filter[district]")

      // Reset page back to 1 seamlessly whenever filters alter to prevent out-of-bounds errors
      newParams.set("page", "1")
      setSearchParams(newParams, { replace: true })
    }
  })

  return (
    <form 
      onSubmit={formik.handleSubmit}
      className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end transition-colors duration-300"
    >
          
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Arama / Anahtar Kelime</label>
        <input 
          type="text" 
          name="title"
          placeholder="Müstakil, Villa, Apartman..."
          value={formik.values.title}
          onChange={formik.handleChange}
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Durum</label>
        <select 
          name="listingType"
          value={formik.values.listingType}
          onChange={formik.handleChange}
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
          name="district"
          value={formik.values.district}
          onChange={formik.handleChange}
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

      <div>
        <button type="submit" className="btn-premium w-full py-3 font-semibold text-center tracking-widest shadow-md">
          Filtrele
        </button>
      </div>

    </form>
  )
}

export default PropertyFilters