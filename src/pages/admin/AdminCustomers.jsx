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
  const navigate = useNavigate();
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
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Action Toolbar Header Component */}
      <AdminCustomerHeader
        onCreateClick={() => navigate(`/admin/customers/create`)}
      />

      {/* Hybrid Row Cards Wrapper Framework Section */}
      <div className="flex flex-col gap-4 mt-4">
        {customers?.length > 0 ? (
          customers.map((customer) => (
            <AdminCustomerRow
              key={customer._id}
              customer={customer}
              handleStatusToggle={() => handleStatusToggle(customer?._id)}
              handleDelete={() => handleDelete(customer?._id)}
              onEditClick={() =>
                navigate(`/admin/customers/edit/${customer?._id}`)
              }
              onDetailClick={() => navigate(`/admin/customers/detail/${customer?._id}`)}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 uppercase tracking-widest text-xs font-light shadow-sm">
            Sistemde kayıtlı herhangi bir mülk sahibi portföyü bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;
