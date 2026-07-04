import React from "react";

const AdminUserRow = ({ user, handleStatusToggle, handleDelete, onDetailClick }) => {
  // console.log(user)
  const defaultAvatar = "https://unsplash.com";
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      {/* Left Block: User Identity Profiles & Administrative Authorizations */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-950 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
          <img
            src={defaultAvatar}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-brand-gold font-semibold">
              @{user?.userName}
            </span>
            {user?.isAdmin && (
              <span className="text-[8px] bg-brand-dark dark:bg-slate-950 text-amber-400 border border-slate-700 px-1.5 py-0.5 uppercase tracking-widest font-medium">
                Sistem Yöneticisi
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-slate-800 dark:text-white line-clamp-1">
            {user?.firstName} {user?.lastName}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
            <span className="truncate max-w-45">
              {user?.email || "No Email"}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">
              |
            </span>
            <span className="font-mono">{user?.phone || "No Phone"}</span>
          </div>
        </div>
      </div>

      {/* Right Block: Fully Reactive Luxury Toggle Switches and Actions Area */}
      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800/60">
        {/* Toggle Switch: User Active/Passive Status */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] uppercase tracking-widest text-slate-400">
            Hesap Durumu
          </span>
          <button
            onClick={handleStatusToggle}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              user?.isActive ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-0.5 ${
                user?.isActive ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Dynamic Actions Center: Hard Delete Operations */}
        <div className="flex flex-col items-center gap-1 min-w-17.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">
            Eylemler
          </span>
          <button
            onClick={onDetailClick}
            className="text-[10px] px-3 py-1 text-amber-400 hover:bg-slate-800 font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer text-center border border-slate-700"
          >
            İncele
          </button>
          {!user?.isAdmin && <button
            onClick={handleDelete}
            className="text-[9px] w-full px-3 py-1 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer uppercase tracking-widest font-medium text-center"
          >
            Sil
          </button>}
        </div>
      </div>
    </div>
  );
};

export default AdminUserRow;
