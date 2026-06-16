import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyFeaturesPanel = ({ property }) => {
  const navigate = useNavigate();
  
  const formatPrice = (amount) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getHeatingDisplay = (type) => {
    const heatingMap = {
      combi: "Kombi",
      air_conditioner: "Klima",
      electric: "Elektrikli Radyatör",
      central_share_meter: "Merkezi Pay Ölçer",
      central: "Merkezi Sistem",
      none: "Isıtma Yok"
    };
    return heatingMap[type] || "Belirtilmedi";
  };

  return (
    <div className="lg:col-span-5 bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col gap-6">
      <div>
        <span className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold block mb-1">
          {property?.neighbourhood} / {property?.district} / {property?.city}
        </span>
        <h1 className="text-2xl md:text-3xl font-serif text-slate-800 dark:text-white tracking-wide leading-tight">
          {property?.title}
        </h1>
        <span className="text-xl md:text-2xl font-sans font-medium text-brand-gold block mt-4">
          {formatPrice(property?.price)}
          {property?.listingType.includes("rent") ? " / Ay" : ""}
        </span>
      </div>

      {/* Granular Specification Rows mapped strictly from your Mongoose Schema keys */}
      <div className="flex flex-col border-t border-slate-100 dark:border-slate-800/60 pt-4 text-xs font-light text-slate-600 dark:text-slate-300 gap-3.5">
        <div className="flex justify-between">
          <span className="text-slate-400">Brüt / Net Alan</span>
          <span className="font-medium">
            {property?.grossArea || "—"} m² / {property?.netArea || "—"} m²
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Oda Sayısı</span>
          <span className="font-medium text-brand-gold">
            {property?.roomCount || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Banyo Sayısı</span>
          <span className="font-medium">{property?.bathroomCount ?? 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Bulunduğu Kat / Toplam</span>
          <span className="font-medium">
            {property?.floor ?? "—"}. Kat /{" "}
            {property?.totalFloors ? `${property.totalFloors} Kat` : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Bina Yaşı</span>
          <span className="font-medium">
            {property?.buildingAge ?? 0} Yaşında
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Isıtma Tipi</span>
          <span className="font-medium uppercase tracking-wider text-[10px]">
            {property?.heatingType || "Yok"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Aidat (Mesa)</span>
          <span className="font-medium">
            {property?.maintenanceFee ? `${property.maintenanceFee} ₺` : "0 ₺"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Eşya Durumu</span>
          <span className="font-medium">
            {property?.isFurnished ? "Eşyalı" : "Boş / Eşyasız"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Kredi Uygunluk</span>
          <span className="font-medium">
            {property?.isLoanEligible ? "Krediye Uygun" : "Uygun Değil"}
          </span>
        </div>
      </div>

      {/* Primary Interactive CTA Call-to-action operations button wrapper */}
      <button
        onClick={() => navigate("/contact")}
        className="btn-premium w-full py-4 text-center font-semibold tracking-widest shadow-md mt-2"
      >
        Yatırım Talebi Oluştur
      </button>
    </div>
  );
};

export default PropertyFeaturesPanel;
