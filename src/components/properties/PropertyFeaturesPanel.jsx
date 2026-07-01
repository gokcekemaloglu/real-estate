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

  const getOccupancyDisplay = (status) => {
    const occupancyMap = {
      vacant: "Boş",
      tenant: "Kiracılı",
      owner: "Mülk Sahibi Oturuyor"
    };
    return occupancyMap[status] || "Belirtilmedi";
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
        {/* Gross/Net Area */}
        <div className="flex justify-between">
          <span className="text-slate-400">Brüt / Net Alan</span>
          <span className="font-medium">
            {property?.grossArea || "—"} m² / {property?.netArea || "—"} m²
          </span>
        </div>
        {/* Room Count */}
        <div className="flex justify-between">
          <span className="text-slate-400">Oda Sayısı</span>
          <span className="font-medium text-brand-gold">
            {property?.roomCount || "—"}
          </span>
        </div>
        {/* Bathroom Count */}
        <div className="flex justify-between">
          <span className="text-slate-400">Banyo Sayısı</span>
          <span className="font-medium">
            {property?.bathroomCount === null || property?.bathroomCount === undefined || property?.bathroomCount === "" ? (
              <span className="text-slate-400 italic font-normal">Belirtilmedi</span>
            ) : (
              `${property.bathroomCount} Banyo`
            )}
          </span>
        </div>
        {/* Recent/Total Floor */}
        <div className="flex justify-between">
          <span className="text-slate-400">Bulunduğu Kat / Toplam Kat</span>
          <span className="font-medium">
            {property?.floor !== undefined && property?.floor !== null && property?.floor !== "" ? `${property.floor}. Kat` : "—"} /{" "}
            {property?.totalFloors ? `${property.totalFloors} Kat` : "—"}
          </span>
        </div>
        {/* Building Age */}
        <div className="flex justify-between">
          <span className="text-slate-400">Bina Yaşı</span>
          <span className="font-medium">
            {property?.buildingAge !== undefined && property?.buildingAge !== null && property?.buildingAge !== "" ? (
              `${property.buildingAge} Yaşında`
            ) : (
              "—"
            )}
          </span>
        </div>
        {/* Heating Type */}
        <div className="flex justify-between">
          <span className="text-slate-400">Isıtma Tipi</span>
          <span className="font-medium uppercase tracking-wider text-[10px]">
            {getHeatingDisplay(property?.heatingType)}
          </span>
        </div>
        {/* Occupancy Condition Enum Selector */}
        <div className="flex justify-between">
          <span className="text-slate-400">Kullanım Durumu</span>
          <span className="font-medium">
            {getOccupancyDisplay(property?.occupancyStatus)}
          </span>
        </div>
        {/* Maintenance Fee */}
        <div className="flex justify-between">
          <span className="text-slate-400">Aidat (Mesa)</span>
          <span className="font-medium">
            {property?.maintenanceFee === null || property?.maintenanceFee === undefined || property?.maintenanceFee === "" ? (
              <span className="text-slate-400 italic font-normal">Belirtilmedi</span>
            ) : (
              `${property.maintenanceFee} ₺`
            )}
          </span>
        </div>
        {/* Loan Eligible */}
        <div className="flex justify-between">
          <span className="text-slate-400">Kredi Uygunluk</span>
          <span className="font-medium">
            {property?.isLoanEligible ? "Krediye Uygun" : "Uygun Değil"}
          </span>
        </div>
      </div>

      {/* Premium Hardware Flags Indicators Row Grid */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-[9px] uppercase font-medium text-slate-400 text-center">
        <div className={`py-1.5 border ${property?.isFurnished ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5" : "border-slate-100 dark:border-slate-800/60"}`}>
          {property?.isFurnished ? "Eşyalı" : "Eşyasız"}
        </div>
        <div className={`py-1.5 border ${property?.hasElevator ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5" : "border-slate-100 dark:border-slate-800/60"}`}>
          Asansör {property?.hasElevator ? "Var" : "Yok"}
        </div>
        <div className={`py-1.5 border ${property?.hasParking ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5" : "border-slate-100 dark:border-slate-800/60"}`}>
          Otopark {property?.hasParking ? "Var" : "Yok"}
        </div>
      </div>

      {/* Primary Interactive CTA Call-to-action operations button wrapper */}
      <button
        onClick={() => navigate("/contact")}
        className="btn-premium w-full py-4 text-center font-semibold tracking-widest shadow-md mt-2"
      >
        İletişime Geç
      </button>
    </div>
  );
};

export default PropertyFeaturesPanel;
