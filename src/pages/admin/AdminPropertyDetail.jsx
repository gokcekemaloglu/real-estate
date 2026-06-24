import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePropertyCall from '../../hooks/usePropertyCall'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminPropertyDetailMedia from '../../components/admin/properties/detail/AdminPropertyDetailMedia'
import AdminPropertyDetailOverview from '../../components/admin/properties/detail/AdminPropertyDetailOverview'
import AdminPropertyDetailPrice from '../../components/admin/properties/detail/AdminPropertyDetailPrice'
import AdminPropertyDetailMetrics from '../../components/admin/properties/detail/AdminPropertyDetailMetrics'
import AdminPropertyDetailAddress from '../../components/admin/properties/detail/AdminPropertyDetailAddress'

const AdminPropertyDetail = () => {
  const {id} =useParams()
  const navigate = useNavigate()
  const {getSinglePropertyData} = usePropertyCall()
  const {property, loading} = useSelector(state => state.property)
  const defaultImage = "https://unsplash.com";

  useEffect(() => {
    getSinglePropertyData(id)
  }, [id])
  // console.log("property-->", property);
  
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
            onClick={() => navigate(`/admin/properties/edit/${id}`)}
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
          <AdminPropertyDetailMedia property={property}/>
          
          {/* Core Textual Architectural Information Content Block */}
          <AdminPropertyDetailOverview property={property}/>
          
        </div>

        {/* Right Column: Pricing Indicators and Quantitative Dimension Specs Grid */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Premium Pricing Counter Matrix */}
          <AdminPropertyDetailPrice property={property}/>
          
          {/* Quantitative Dimension Specifications Grid Array */}
          <AdminPropertyDetailMetrics property={property}/>
          
          {/* Location Address Geographical Matrix Block */}
          <AdminPropertyDetailAddress property={property}/>
          
        </div> 
      </div> 
    </div> 
  );
};

export default AdminPropertyDetail