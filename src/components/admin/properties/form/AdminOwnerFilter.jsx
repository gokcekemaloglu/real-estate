import React from "react";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchFail, fetchStart, setData} from "../../../../features/customerSlice";

const AdminOwnerFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchData } = useFetchData();

  const { customers } = useSelector((state) => state.customers);

  const currentOwnerId = searchParams.get("filter[ownerId]") || "";

  useEffect(() => {
    fetchData({
      endpoint: "customers",
      stateKey: "customers",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 250,
      isWithToken: true,
    });
  }, []);

  const handleOwnerChange = (e) => {
    const selectedValue = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (selectedValue) {
      newParams.set("filter[ownerId]", selectedValue);
    } else {
      newParams.delete("filter[ownerId]");
    }

    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };
  return (
    <div className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 shadow-md mb-2 transition-colors duration-300 animate-fade-in flex flex-col gap-1.5 max-w-xs self-start">
      <label className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold">
        Mülk Sahibine Göre Ara
      </label>
      <select
        value={currentOwnerId}
        onChange={handleOwnerChange}
        className="input-premium bg-slate-100 dark:bg-slate-950/60 border-brand-gold/20 text-xs text-slate-700 dark:text-slate-300 font-light focus:border-brand-gold cursor-pointer w-full font-sans"
      >
        <option value="">Tüm Mülk Sahipleri</option>
        {customers?.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.firstName} {customer.lastName} (
            {customer.phone?.slice(-4)})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AdminOwnerFilter;
