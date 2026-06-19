import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminCustomerHeader = ({onCreateClick}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold ont-serif text-slate-800 dark:text-white  tracking-wide">Müşteri (Portföy) Yönetimi</h1>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
          Cemal Bey, sistemdeki tüm mülk sahiplerinin listesi ve bilgileri aşağıdadır.
        </p>
      </div>
      <button
        onClick={() => onCreateClick()}
        className="btn-premium px-6 py-3 font-semibold text-xs tracking-widest uppercase"
      >
        + Yeni Müşteri Ekle
      </button>
    </div>
  )
}

export default AdminCustomerHeader