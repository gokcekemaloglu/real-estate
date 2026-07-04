import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useCustomerCall from "../../hooks/useCustomerCall";
import AdminCustomerHeader from "../../components/admin/customers/AdminCustomerHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchFail, fetchStart, setData } from "../../features/customerSlice";
import AdminCustomerRow from "../../components/admin/customers/AdminCustomerRow";
import useFetchData from "../../hooks/useFetchData";
import PaginationComponent from "../../components/properties/PaginationComponent";
import AdminSearchFilters from "../../components/admin/AdminSearchFilters";
import AdminActiveFilter from "../../components/admin/AdminActiveFilter";

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchData } = useFetchData();
  const { toggleCustomerStatus, deleteCustomer } = useCustomerCall();
  const { loading, customers, customersDetails } = useSelector((state) => state.customers);

  const activePage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const loadAdminCustomerData = () => {
    const activeParams = new URLSearchParams(searchParams);
    activeParams.delete("page");
    const encryptedQueryString = activeParams.toString();
    const cleanBracketsQueryString = decodeURIComponent(encryptedQueryString);
    fetchData({
      endpoint: "customers",
      stateKey: "customers",
      sliceActions: { fetchStart, fetchFail, setData },
      page: activePage,
      limit: 20,
      query: cleanBracketsQueryString,
      // isWithToken: true,
    });
  };

  useEffect(() => {
    loadAdminCustomerData();
  }, [activePage, searchParams]);

  const handleStatusToggle = async (id, type) => {
    await toggleCustomerStatus(id);
    loadAdminCustomerData(); // Automatically refresh dataset to mirror single source of truth mutations
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadAdminCustomerData();
  };

  const handleClearFilters = () => {
    setSearchParams({ page: "1" }, { replace: true })
    window.location.reload()
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Action Toolbar Header Component */}
      <AdminCustomerHeader
        onCreateClick={() => navigate(`/admin/customers/create`)}
      />

      <AdminSearchFilters />
      <AdminActiveFilter label="Müşteri Hesap Durumu" />

      <div className={`transition-all duration-300 relative ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`} >
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
                onDetailClick={() =>
                  navigate(`/admin/customers/detail/${customer?._id}`)
                }
              />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 uppercase tracking-widest text-xs font-light shadow-sm">
              <p className="text-sm font-light text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Sistemde kayıtlı herhangi bir mülk sahibi portföyü bulunamadı.</p>
              <button 
                onClick={handleClearFilters}
                className="btn-premium px-6 py-3 text-xs tracking-widest font-semibold"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
        <PaginationComponent details={customersDetails} label={"Müşteri"} />
      </div>
      {loading && (
        <div className="absolute top-4 right-4 w-5 h-5 border-2 border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default AdminCustomers;
