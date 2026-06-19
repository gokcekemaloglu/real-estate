import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminCustomerHeader = ({onCreateClick}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Müşteri (Portföy) Yönetimi</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Cemal Bey, sistemdeki tüm mülk sahiplerinin listesi ve bilgileri aşağıdadır.
        </p>
      </div>
      <button
        onClick={() => onCreateClick()}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 text-base md:text-lg whitespace-nowrap"
      >
        + Yeni Müşteri Ekle
      </button>
    </div>
  )
}

export default AdminCustomerHeader