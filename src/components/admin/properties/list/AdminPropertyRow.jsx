import React from "react";

const AdminPropertyRow = ({
  property,
  onStatusToggle,
  onDeleteClick,
  onEditClick,
  onDetailClick,
}) => {
  const defaultImage = "https://unsplash.com";
  return (
    <div
      key={property?._id}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Left Block: Image & Structural Context Titles */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-950 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
          <img
            src={defaultImage}
            alt={property?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-wider text-brand-gold font-semibold">
            {property?.district} / Adana
          </span>
          <h3 className="text-sm font-medium text-slate-800 dark:text-white line-clamp-1">
            {property?.title}
          </h3>
          {/* Strategic layout mapping for displaying property customer ownership fields */}
          {property?.ownerId && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-light mt-0.5">
              Ev Sahibi: {property.ownerId.firstName}{" "} {property.ownerId.lastName} ({property.ownerId.phone})
            </span>
          )}
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              maximumFractionDigits: 0,
            }).format(property?.price)}
          </span>
        </div>
      </div>

      {/* Right Block: Fully Reactive Action Toggles tailored beautifully for Cemal's ease of use */}
      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800/60">
        {/* Toggle Switch: Active State Status */}
        <div className="flex flex-col items-center gap-1 font-bold">
          <span className="text-[9px] uppercase tracking-widest text-slate-500">
            Yayın Durumu
          </span>
          <button
            onClick={() => onStatusToggle(property?._id, "active")}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${property?.isActive ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"}`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-0.5 ${property?.isActive ? "translate-x-5" : "translate-x-1"}`}
            />
          </button>
        </div>

        {/* Toggle Switch: Featured Vitrin State Status */}
        <div className="flex flex-col items-center gap-1 font-bold">
          <span className="text-[9px] uppercase tracking-widest text-slate-500">
            Vitrinde Göster
          </span>
          <button
            onClick={() => onStatusToggle(property?._id, "featured")}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${property?.isFeatured ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-700"}`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-0.5 ${property?.isFeatured ? "translate-x-5" : "translate-x-1"}`}
            />
          </button>
        </div>

        {/* Dynamic Actions Center: Unifying Update and Delete Operations Side-by-Side */}
        <div className="flex flex-col items-center gap-1 font-bold">
          {/* Premium Edit Action Button (Pre-wired for upcoming Formik edit modal context) */}
          <span className="text-[12px] uppercase tracking-widest text-slate-500">
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
              onClick={() => onEditClick(property)} // Placeholder until we attach the edit flow
              className="text-[10px] px-3 py-1 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-dark font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer text-center"
            >
              Düzenle
            </button>
            {/* Hard Delete Action Trigger Button */}
            <button
              onClick={() => onDeleteClick(property?._id)}
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

export default AdminPropertyRow;
