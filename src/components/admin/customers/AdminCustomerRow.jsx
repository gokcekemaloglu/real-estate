import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomerCall from '../../../hooks/useCustomerCall';
import useFetchData from '../../../hooks/useFetchData';
import customerReducer from '../../../features/customerSlice'; // Slice dosyanızın varsayılan export adresi

const AdminCustomerRow = ({ customer, handleStatusToggle, handleDelete, onEditClick }) => {
  
  return (
    <tr className="hover:bg-gray-50 transition duration-150 border-b border-gray-200">
      {/* İsim Soyisim */}
      <td className="py-4 px-6 font-semibold text-gray-900 text-base">
        {customer.firstName} {customer.lastName}
      </td>
      
      {/* Telefon */}
      <td className="py-4 px-6 font-mono text-gray-700 tracking-wider">
        {customer.phone}
      </td>
      
      {/* E-Posta */}
      <td className="py-4 px-6 text-gray-500 max-w-50 truncate">
        {customer.email || <span className="text-gray-300 italic">Belirtilmedi</span>}
      </td>
      
      {/* TC Kimlik No */}
      <td className="py-4 px-6 font-mono text-sm text-gray-600">
        {customer.citizenshipId || <span className="text-gray-300 italic">Belirtilmedi</span>}
      </td>
      
      {/* Durum (Aktif/Pasif) Butonu */}
      <td className="py-4 px-6 text-center">
        <button
          onClick={handleStatusToggle}
          className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-sm transition-all duration-200 ${
            customer.isActive
              ? 'bg-green-100 text-green-800 hover:bg-green-200 ring-1 ring-green-300'
              : 'bg-red-100 text-red-800 hover:bg-red-200 ring-1 ring-red-300'
          }`}
        >
          {customer.isActive ? 'Aktif' : 'Pasif'}
        </button>
      </td>
      
      {/* İşlemler */}
      <td className="py-4 px-6 text-center">
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => onEditClick(customer._id)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 px-4 rounded shadow-sm text-sm transition duration-150"
          >
            Düzenle / Notlar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded shadow-sm text-sm transition duration-150"
          >
            Sil
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminCustomerRow;