import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePropertyCall from '../../hooks/usePropertyCall'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropertyGallery from './PropertyGallery'

const PropertyDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {getSinglePropertyData} = usePropertyCall()

  const {property, loading} = useSelector(state => state.property)

  useEffect(() => {
    if (id) {
      getSinglePropertyData(id)
    }
  }, [id])

  console.log(property);
  

  const formatPrice = (amount) => {
    if (!amount) return "—"
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-brand-dark flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Back Navigation Action Link */}
        <button 
          onClick={() => navigate("/properties")}
          className="text-xs uppercase tracking-widest text-slate-400 hover:text-brand-gold mb-8 flex items-center gap-2 transition-colors cursor-pointer"
        >
          ← Tüm İlanlara Dön
        </button>

        {/* Core Detail Grid Layout split into image presentation and structural specification metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7-Cols): Image Box Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <PropertyGallery title = {property?.title} listingType = {property?.listingType}/>
            {/* <div className="relative h-100 md:h-125 w-full bg-slate-200 dark:bg-slate-950 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
              <img 
                src="https://unsplash.com" 
                alt={property?.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-brand-dark/90 dark:bg-slate-900/90 border border-brand-gold/30 text-amber-400 text-[10px] uppercase tracking-widest px-4 py-2 font-medium">
                {property?.listingType === "sale" ? "Satılık" : "Kiralık"}
              </span>
            </div> */}
            
            {/* Description Paragraph Text Block */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-serif text-slate-800 dark:text-white">Mimari Açıklama</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed whitespace-pre-line">
                {property?.description || "Bu seçkin portföy için henüz detaylı bir mimari açıklama metni girilmemiştir."}
              </p>
            </div>
          </div>

          {/* Right Column (5-Cols): Luxury Price, Title & Specs Dashboard */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold block mb-1">
                {property?.neighbourhood} / {property?.district} / {property?.city}
              </span>
              <h1 className="text-2xl md:text-3xl font-serif text-slate-800 dark:text-white tracking-wide leading-tight">
                {property?.title}
              </h1>
              <span className="text-xl md:text-2xl font-sans font-medium text-brand-gold block mt-4">
                {formatPrice(property?.price)}{property?.listingType === "rent" ? " / Ay" : ""}
              </span>
            </div>

            {/* Granular Specification Rows mapped strictly from your Mongoose Schema keys */}
            <div className="flex flex-col border-t border-slate-100 dark:border-slate-800/60 pt-4 text-xs font-light text-slate-600 dark:text-slate-300 gap-3.5">
              <div className="flex justify-between"><span className="text-slate-400">Brüt / Net Alan</span><span className="font-medium">{property?.grossArea || "—"} m² / {property?.netArea || "—"} m²</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Oda Sayısı</span><span className="font-medium text-brand-gold">{property?.roomCount || "—"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Banyo Sayısı</span><span className="font-medium">{property?.bathroomCount ?? 0}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Bulunduğu Kat / Toplam</span><span className="font-medium">{property?.floor ?? "—"}. Kat / {property?.totalFloors ? `${property.totalFloors} Kat` : "—"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Bina Yaşı</span><span className="font-medium">{property?.buildingAge ?? 0} Yaşında</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Isıtma Tipi</span><span className="font-medium uppercase tracking-wider text-[10px]">{property?.heatingType || "Yok"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Aidat (Mesa)</span><span className="font-medium">{property?.maintenanceFee ? `${property.maintenanceFee} ₺` : "0 ₺"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Eşya Durumu</span><span className="font-medium">{property?.isFurnished ? "Eşyalı" : "Boş / Eşyasız"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Kredi Uygunluk</span><span className="font-medium">{property?.isLoanEligible ? "Krediye Uygun" : "Uygun Değil"}</span></div>
            </div>

            {/* Primary Interactive CTA Call-to-action operations button wrapper */}
            <button 
              onClick={() => navigate("/contact")}
              className="btn-premium w-full py-4 text-center font-semibold tracking-widest shadow-md mt-2"
            >
              Yatırım Talebi Oluştur
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PropertyDetail