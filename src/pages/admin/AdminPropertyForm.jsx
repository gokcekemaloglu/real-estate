import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { PropertySchema } from '../../helper/ValidationSchemas' // Injected your clean validation helper asset
import usePropertyCall from '../../hooks/usePropertyCall'
import FormSelectField from '../../components/admin/properties/FormSelectField'
import FormToggleField from '../../components/admin/properties/FormToggleField'
import FormBlockTitle from '../../components/admin/properties/FormBlockTitle'
import FormBlockPrice from '../../components/admin/properties/FormBlockPrice'

const AdminPropertyForm = () => {
  const navigate = useNavigate()
  const { postPropertyData } = usePropertyCall()

  // 1. Clean Formik initialization mapping exactly to your backend real estate schema tokens
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      listingType: '',
      propertyCategory: '',
      city: 'Adana', // Defaults to your Adana operation center dynamically
      district: '',
      neighbourhood: '',
      fullAddress: '',
      grossArea: '',
      netArea: '',
      floor: '',
      totalFloors: '',
      roomCount: '',
      bathroomCount: 0,
      buildingAge: '',
      heatingType: 'none',
      maintenanceFee: 0,
      isFurnished: false,
      hasElevator: false,
      hasParking: false,
      isLoanEligible: true
    },
    validationSchema: PropertySchema, // Connected our clean external validation rule block
    onSubmit: async (values) => {
      // Cast input strings securely into numeric values before dispatching metadata payloads
      const cleanValues = {
        ...values,
        price: Number(values.price),
        grossArea: values.grossArea ? Number(values.grossArea) : null,
        netArea: values.netArea ? Number(values.netArea) : null,
        floor: values.floor ? Number(values.floor) : null,
        totalFloors: values.totalFloors ? Number(values.totalFloors) : null,
        buildingAge: values.buildingAge ? Number(values.buildingAge) : 0,
        maintenanceFee: values.maintenanceFee ? Number(values.maintenanceFee) : 0,
      }
      
      await postPropertyData("properties", cleanValues)
      navigate("/admin/properties") // Redirects back to listing grid seamlessly upon successful submissions
    }
  })

  // 2. Local dropdown configurations dictionary variables mapped straight from your Mongoose schema parameters
  const listingTypeOptions = [
    { value: "sale", label: "Satılık" },
    { value: "rent", label: "Kiralık" },
    { value: "transfer_sale", label: "Devren Satılık" },
    { value: "transfer_rent", label: "Devren Kiralık" }
  ]

  const categoryOptions = [
    { value: "apartment", label: "Daire / Apartman" },
    { value: "house", label: "Müstakil Ev" },
    { value: "villa", label: "Villa" },
    { value: "land", label: "Arsa / Arazi" },
    { value: "commercial", label: "Ticari Mülk" }
  ]

  const heatingOptions = [
    { value: "none", label: "Isıtma Yok" },
    { value: "combi", label: "Kombi" },
    { value: "air_conditioner", label: "Klima" },
    { value: "central_share_meter", label: "Pay Ölçer" },
    { value: "central", label: "Merkezi Sistem" }
  ]

  const districtOptions = [
    { value: "Seyhan", label: "Seyhan" },
    { value: "Sarıçam", label: "Sarıçam" },
    { value: "Çukurova", label: "Çukurova" },
    { value: "Yüreğir", label: "Yüreğir" }
  ]

  const hasTitleError = formik.touched.title && formik.errors.title
  const hasDescError = formik.touched.description && formik.errors.description

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-4xl text-xs font-light text-slate-700 dark:text-slate-300">
      
      {/* Form Content Header Info */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-lg font-serif text-slate-800 dark:text-white font-light tracking-wide">Yeni Portföy Kaydı</h1>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">Sisteme yeni bir lüks mülk kartı ekleme formu</p>
        </div>
        <button 
          type="button"
          onClick={() => navigate("/admin/properties")}
          className="text-xs uppercase tracking-widest text-slate-400 hover:text-brand-gold transition-colors cursor-pointer"
        >
          ← Vazgeç / Geri Dön
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        
        {/* BLOCK 1: Başlık & Tanım */}
        <FormBlockTitle formik={formik} hasTitleError={hasTitleError} hasDescError={hasDescError}/>
        
        {/* BLOCK 2: Durum & Fiyatlandırma */}
        <FormBlockPrice formik={formik} listingTypeOptions={listingTypeOptions} categoryOptions={categoryOptions} />
        
        {/* BLOCK 3: Konum Verileri */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
          <h3 className="md:col-span-3 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">3. Konum Bilgileri</h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Şehir</label>
            <input type="text" name="city" value={formik.values.city} disabled className="input-premium bg-slate-100 dark:bg-slate-800/30 opacity-60 cursor-not-allowed" />
          </div>

          <FormSelectField label="İlçe" name="district" options={districtOptions} formik={formik} />

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Mahalle</label>
            <input 
              type="text" name="neighbourhood" placeholder="Cemalpaşa"
              value={formik.values.neighbourhood} onChange={formik.handleChange} onBlur={formik.handleBlur}
              className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.neighbourhood && formik.errors.neighbourhood ? "border-red-500 focus:border-red-500" : ""}`}
            />
            {formik.touched.neighbourhood && formik.errors.neighbourhood && <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.neighbourhood}</span>}
          </div>
        </div>

        {/* BLOCK 4: Yapısal Metrikler */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
          <h3 className="col-span-2 md:col-span-4 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">4. Yapısal Özellikler</h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Brüt Alan (m²)</label>
            <input type="number" name="grossArea" value={formik.values.grossArea} onChange={formik.handleChange} className="input-premium bg-slate-50/50 dark:bg-slate-950/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Net Alan (m²)</label>
            <input type="number" name="netArea" value={formik.values.netArea} onChange={formik.handleChange} className="input-premium bg-slate-50/50 dark:bg-slate-950/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Oda Sayısı</label>
            <input type="text" name="roomCount" placeholder="3+1" value={formik.values.roomCount} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.roomCount && formik.errors.roomCount ? "border-red-500 focus:border-red-500" : ""}`} />
            {formik.touched.roomCount && formik.errors.roomCount && <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.roomCount}</span>}
          </div>

          <FormSelectField label="Isıtma Tipi" name="heatingType" options={heatingOptions} formik={formik} />
        </div>

        {/* BLOCK 5: Donanım Toggles */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
          <h3 className="col-span-1 sm:col-span-2 md:col-span-4 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">5. Donanım Detayları</h3>
          
          <FormToggleField label="Eşyalı Mülk" name="isFurnished" formik={formik} />
          <FormToggleField label="Asansör" name="hasElevator" formik={formik} />
          <FormToggleField label="Otopark" name="hasParking" formik={formik} />
          <FormToggleField label="Krediye Uygun" name="isLoanEligible" formik={formik} />
        </div>

        {/* Action Call Button */}
        <div className="flex justify-end mt-2">
          <button 
            type="submit" 
            className="btn-premium px-12 py-4 font-semibold tracking-widest text-xs uppercase shadow-lg w-full md:w-auto"
          >
            İlanı Canlıya Al / Portföye Ekle
          </button>
        </div>

      </form>
    </div>
  )
}

export default AdminPropertyForm