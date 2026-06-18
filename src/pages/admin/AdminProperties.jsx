import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useFetchData from '../../hooks/useFetchData'
import usePropertyCall from '../../hooks/usePropertyCall'
import { fetchStart, fetchFail, setData } from '../../features/propertySlice'
import AdminPropertyHeader from '../../components/admin/properties/AdminPropertyHeader'
import AdminPropertyRow from '../../components/admin/properties/AdminPropertyRow'

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
      limit: 20,
      isWithToken: true
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
    await deleteProperty(id)
    loadAdminData()
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
          <AdminPropertyRow property={property} key={property._id} onStatusToggle={handleStatusToggle} onDeleteClick={handleDelete} onEditClick={(selected) => alert(`Düzenle: ${selected.title}`)}/>
        ))}
      </div>

    </div>
  )
}

export default AdminProperties;
