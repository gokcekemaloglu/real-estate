import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useFetchData from '../../hooks/useFetchData'
import usePropertyCall from '../../hooks/usePropertyCall'
import { fetchStart, fetchFail, setData } from '../../features/propertySlice'
import AdminPropertyHeader from './properties/AdminPropertyHeader'
import AdminPropertyRow from './properties/AdminPropertyRow'

const AdminProperties = () => {
  const { fetchData } = useFetchData()
  const { togglePropertyStatus, toggleFeaturedStatus, deleteProperty } = usePropertyCall()
  
  const { properties, loading } = useSelector((state) => state.property)

  // Radar layout re-fetching records data dynamically inside admin dashboard scopes
  const loadAdminData = () => {
    fetchData({
      endpoint: "properties",
      stateKey: "properties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 100
    })
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const handleStatusToggle = async (id, type) => {
    if (type === "active") await togglePropertyStatus(id)
    if (type === "featured") await toggleFeaturedStatus(id)
    loadAdminData() // Automatically refresh dataset to mirror single source of truth mutations
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bu ilanı tamamen silmek istediğinize emin misiniz?")) {
      await deleteProperty(id)
      loadAdminData()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Top action toolbar header block */}
      <AdminPropertyHeader/>


      {/* Hybrid Hybrid Row Cards Wrapper Framework */}
      <div className="flex flex-col gap-4 mt-4">
        {properties?.map((property) => (
          <AdminPropertyRow property={property} onStatusToggle={handleStatusToggle} onDeleteClick={handleDelete} onEditClick={(selected) => alert(`Düzenle: ${selected.title}`)}/>
        ))}
      </div>

    </div>
  )
}

export default AdminProperties;

          // <div 
          //   key={property._id} 
          //   className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300"
          // >
          //   {/* Left Block: Image & Structural Context Titles */}
          //   <div className="flex items-center gap-4 flex-1">
          //     <div className="w-16 h-16 bg-slate-100 dark:bg-slate-950 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
          //       <img 
          //         src="https://unsplash.com" 
          //         alt={property.title} 
          //         className="w-full h-full object-cover"
          //       />
          //     </div>
          //     <div className="flex flex-col gap-0.5">
          //       <span className="text-[9px] uppercase tracking-wider text-brand-gold font-semibold">{property.district} / Adana</span>
          //       <h3 className="text-sm font-medium text-slate-800 dark:text-white line-clamp-1">{property.title}</h3>
          //       <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          //         {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(property.price)}
          //       </span>
          //     </div>
          //   </div>

          //   {/* Right Block: Fully Reactive Action Toggles tailored beautifully for Cemal's ease of use */}
          //   <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800/60">
              
          //     {/* Toggle Switch: Active State Status */}
          //     <div className="flex flex-col items-center gap-1">
          //       <span className="text-[9px] uppercase tracking-widest text-slate-400">Yayın Durumu</span>
          //       <button 
          //         onClick={() => handleStatusToggle(property._id, "active")}
          //         className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${property.isActive ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"}`}
          //       >
          //         <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-0.5 ${property.isActive ? "translate-x-5" : "translate-x-1"}`} />
          //       </button>
          //     </div>

          //     {/* Toggle Switch: Featured Vitrin State Status */}
          //     <div className="flex flex-col items-center gap-1">
          //       <span className="text-[9px] uppercase tracking-widest text-slate-400">Vitrinde Göster</span>
          //       <button 
          //         onClick={() => handleStatusToggle(property._id, "featured")}
          //         className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${property.isFeatured ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-700"}`}
          //       >
          //         <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-0.5 ${property.isFeatured ? "translate-x-5" : "translate-x-1"}`} />
          //       </button>
          //     </div>

          //     {/* Dynamic Actions Center: Unifying Update and Delete Operations Side-by-Side */}
          //     <div className="flex flex-col items-center gap-1">
          //       {/* Premium Edit Action Button (Pre-wired for upcoming Formik edit modal context) */}
          //       <span className="text-[9px] uppercase tracking-widest text-slate-400">Eylemler</span>
          //       <button 
          //         onClick={() => alert(`Düzenleme Modülü: ${property.title}`)} // Placeholder until we attach the edit flow
          //         className="text-[9px] p-1.5 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-dark font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer"
          //       >
          //         Düzenle
          //       </button>
          //       {/* Hard Delete Action Trigger Button */}
                
          //       <button 
          //         onClick={() => handleDelete(property._id)}
          //         className="text-xs p-1.5 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer uppercase tracking-widest text-[9px] font-medium"
          //       >
          //         Sil
          //       </button>
          //     </div>

          //   </div>

          // </div>