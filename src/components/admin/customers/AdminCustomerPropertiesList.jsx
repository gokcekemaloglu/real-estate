import React from 'react'
import AdminPropertyRow from '../properties/list/AdminPropertyRow';

const AdminCustomerPropertiesList = ({ properties, propertyImages, navigate, id }) => {
    if (!properties || properties.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400 uppercase tracking-widest text-[10px] font-light">
        Bu müşteriye ait sisteme kayıtlı herhangi bir lüks mülk portföyü bulunmuyor.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        Müşteriye Ait Mülk Portföyü ({properties.length})
      </h3>
      
      <div className="flex flex-col gap-4">
        {properties.map((property) => (
          <AdminPropertyRow
            key={property._id}
            property={property}
            propertyImages={propertyImages}
            // Mapped smoothly to prevent internal action shell validation errors
            onStatusToggle={() => window.location.reload()} 
            onDeleteClick={() => console.log("Deletion requests handled straight from main properties logs context")}
            onEditClick={() => navigate(`/admin/properties/edit/${property?._id}`)}
            onDetailClick={() => navigate(`/admin/properties/detail/${property?._id}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default AdminCustomerPropertiesList