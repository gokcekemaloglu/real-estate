import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePropertyCall from '../../hooks/usePropertyCall'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AdminPropertyDetail = () => {
  const {id} =useParams()
  const navigate = useNavigate()
  const {getSinglePropertyData} = usePropertyCall()
  const {property, loading} = useSelector(state => state.property)
  const defaultImage = "https://unsplash.com";

  useEffect(() => {
    getSinglePropertyData(id)
  }, [id])
  console.log("property-->", property);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-5xl text-xs font-light text-slate-700 dark:text-slate-300">
      
      {/* Header Context Action Toolbar Block */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-lg font-serif text-slate-800 dark:text-white font-light tracking-wide">
            Gayrimenkul Portföy Detayı
          </h1>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">
            Seçilen lüks mülk kartının sadece okunabilir mimari analizi
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/properties/create/${id}`)}
            className="text-xs uppercase tracking-widest text-brand-gold hover:underline cursor-pointer"
          >
            İlanı Düzenle
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/admin/properties")} 
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Listeye Geri Dön
          </button>
        </div>
      </div>

      {/* Main Structural Framework Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Columns: Media Showcase & Architectural Specs Summary */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Media Showcase Panel */}
          <div className="w-full h-80 bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative">
            <img 
              src={defaultImage} 
              alt={property?.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 contrast-110"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`text-[9px] uppercase font-bold tracking-widest px-3 py-1 text-white shadow-sm ${property?.listingType === 'sale' ? 'bg-brand-gold' : 'bg-brand-dark border border-slate-700'}`}>
                {property?.listingType === 'sale' ? 'Satılık' : 'Kiralık'}
              </span>
              {property?.isFeatured && (
                <span className="text-[9px] uppercase font-bold tracking-widest px-3 py-1 bg-amber-500 text-brand-dark shadow-sm">
                  Vitrin İlanı
                </span>
              )}
            </div>
          </div>

          {/* Core Textual Architectural Information Content Block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-wider text-brand-gold font-semibold">
                {property?.propertyCategory?.toUpperCase()} / {property?.district} / Adana
              </span>
              <h2 className="text-xl font-serif text-slate-800 dark:text-white font-light">
                {property?.title}
              </h2>
            </div>
            
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-50 dark:border-slate-800/40">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">Mimari Açıklama Metni</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light whitespace-pre-line text-justify">
                {property?.description || "Bu portföy kartı için herhangi bir mimari açıklama metni girilmemiştir."}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing Indicators and Quantitative Dimension Specs Grid */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Premium Pricing Counter Matrix */}
          <div className="bg-brand-dark dark:bg-slate-950 border border-slate-800 p-6 flex flex-col gap-1.5 shadow-md">
            <span className="text-[9px] uppercase tracking-widest text-amber-400/80 font-medium">Hedef Portföy Değeri</span>
            <span className="text-2xl font-serif text-white tracking-wide">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
                maximumFractionDigits: 0,
              }).format(property?.price || 0)}
            </span>
          </div>

          {/* Quantitative Dimension Specifications Grid Array */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
              Metrik Ölçüler & Donanım
            </h3>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-slate-600 dark:text-slate-400">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400">Brüt Alan</span>
                <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">{property?.grossArea ? `${property.grossArea} m²` : "-"}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400">Net Kullanım</span>
                <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">{property?.netArea ? `${property.netArea} m²` : "-"}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400">Oda Dağılımı</span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{property?.roomCount || "-"}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400">Bina Yaşı</span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{property?.buildingAge ?? 0} Yaş</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400">Bulunduğu Kat</span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{property?.floor ?? 0}. Kat</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400">Isıtma Altyapısı</span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 uppercase tracking-tight text-[10px]">{property?.heatingType || "Yok"}</span>
              </div>
            </div>

            {/* Hardware Flags Toggles Boolean Indicator Row */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-50 dark:border-slate-800/40 text-[10px] uppercase font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 ${property?.isFurnished ? 'bg-brand-gold' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                <span>{property?.isFurnished ? 'Eşyalı' : 'Eşyasız'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 ${property?.hasElevator ? 'bg-brand-gold' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                <span>{property?.hasElevator ? 'Asansör Var' : 'Asansör Yok'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 ${property?.hasParking ? 'bg-brand-gold' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                <span>{property?.hasParking ? 'Otopark Var' : 'Otopark Yok'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 ${property?.isLoanEligible ? 'bg-brand-gold' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                <span>{property?.isLoanEligible ? 'Krediye Uygun' : 'Krediye Uygun Değil'}</span>
              </div>
            </div>

          </div>

          {/* Location Address Geographical Matrix Block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-3 shadow-sm">
            <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
              Açık Konum Bilgisi
            </h3>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Mahalle & Adres</span>
              <p className="text-xs font-light text-slate-600 dark:text-slate-400 leading-relaxed font-sans mt-1">
                {property?.neighbourhood} {property?.fullAddress}
              </p>
            </div>
          </div>

        </div> 
      </div> 
    </div> 
  );
};

export default AdminPropertyDetail