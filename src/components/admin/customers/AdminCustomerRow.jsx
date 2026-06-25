import React from 'react';


const AdminCustomerRow = ({ customer, handleStatusToggle, handleDelete, onEditClick, onDetailClick }) => {
  return (
    <div
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
    >
      {/* Left Block: Customer Avatar, Identity and Contact Details */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] uppercase tracking-wider text-brand-gold font-semibold">
            {customer?.citizenshipId ? `TC: ${customer.citizenshipId}` : "TC Kimlik Belirtilmedi"}
          </span>
          <h3 className="text-sm font-medium text-slate-800 dark:text-white line-clamp-1">
            {customer?.firstName} {customer?.lastName}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-slate-500 dark:text-slate-400 font-light mt-0.5">
            <span className="font-mono">{customer?.phone}</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="truncate max-w-50">{customer?.email || "E-Posta Yok"}</span>
          </div>
        </div>
      </div>

      {/* Right Block: Fully Reactive Luxury Toggle Switches and Actions Area */}
      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800/60">
        
        {/* Toggle Switch: Customer Active/Passive Status */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[12px] uppercase tracking-widest text-slate-500">
            Pasif/Aktif
          </span>
          <button
            onClick={handleStatusToggle}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              customer?.isActive ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-0.5 ${
                customer?.isActive ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Dynamic Actions Center: Update (Notes) and Hard Delete Operations */}
        <div className="flex flex-col items-center gap-1 min-w-20 font-bold">
          <span className="text-[12px] uppercase tracking-widest text-slate-500 mb-1">
            Eylemler
          </span>
          <div className="flex flex-col gap-1 w-full">
            <button
              onClick={onDetailClick}
              className="text-[10px] px-3 py-1 text-amber-400 hover:bg-slate-800 font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer text-center border border-slate-700"
            >
              İncele
            </button>
            {/* Premium Edit Action Button */}
            <button
              onClick={onEditClick}
              className="text-[10px] px-3 py-1 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-dark font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer text-center"
            >
              Düzenle
            </button>
            
            {/* Hard Delete Action Trigger Button */}
            <button
              onClick={handleDelete}
              className="text-[10px] px-3 py-1 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer uppercase tracking-widest font-bold text-center"
            >
              SİL
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCustomerRow;