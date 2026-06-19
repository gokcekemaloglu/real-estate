import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useCustomerCall from "../../hooks/useCustomerCall";
import AdminCustomerHeader from "../../components/admin/customers/AdminCustomerHeader";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, setData } from "../../features/customerSlice";
import AdminCustomerRow from "../../components/admin/customers/AdminCustomerRow";
import useFetchData from "../../hooks/useFetchData";

const AdminCustomers = () => {
   const navigate = useNavigate()
  const { fetchData } = useFetchData();
  const { toggleCustomerStatus, deleteCustomer } = useCustomerCall();
  const { loading, customers } = useSelector((state) => state.customers);

  const loadAdminCustomerData = () => {
    fetchData({
      endpoint: "customers",
      stateKey: "customers",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 20,
      isWithToken: true,
    });
  };

  useEffect(() => {
    loadAdminCustomerData();
  }, []);

  const handleStatusToggle = async (id, type) => {
    await toggleCustomerStatus(id);
    loadAdminCustomerData(); // Automatically refresh dataset to mirror single source of truth mutations
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadAdminCustomerData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Üst Başlık Bileşeni */}
      <AdminCustomerHeader 
        onCreateClick={() => navigate(`/admin/customers/create`)}

      />

      {/* Tablo Alanı */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm border-b border-gray-200 tracking-wider">
                <th className="py-4 px-6 font-bold">Müşteri Adı Soyadı</th>
                <th className="py-4 px-6 font-bold">Telefon Numarası</th>
                <th className="py-4 px-6 font-bold">E-Posta Adresi</th>
                <th className="py-4 px-6 font-bold">TC Kimlik No</th>
                <th className="py-4 px-6 font-bold text-center">
                  Yayın Durumu
                </th>
                <th className="py-4 px-6 font-bold text-center">Yönetim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-gray-500 font-semibold text-lg"
                  >
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Müşteri listesi yükleniyor, lütfen bekleyin Cemal Bey...
                    </div>
                  </td>
                </tr>
              ) : customers?.length > 0 ? (
                customers.map((customer) => (
                  <AdminCustomerRow
                    key={customer._id}
                    customer={customer}
                    handleStatusToggle={() => handleStatusToggle(customer?._id)}
                    handleDelete={() => handleDelete(customer?._id)}
                    onEditClick={() => navigate(`/admin/customers/edit/${customer?._id}`)}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-gray-500 text-base md:text-lg italic"
                  >
                    Sistemde henüz kayıtlı bir mülk sahibi/müşteri bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
