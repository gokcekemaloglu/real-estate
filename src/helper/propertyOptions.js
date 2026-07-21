export const LISTING_TYPE_LABELS = {
  sale: "Satılık",
  rent: "Kiralık",
  transfer_sale: "Devren Satılık",
  transfer_rent: "Devren Kiralık",
};
 
export const getListingBadge = (type) => {
  return LISTING_TYPE_LABELS[type] || "Portföy";
};

export const isRentType = (listingType) => {
  return listingType === "rent" || listingType === "transfer_rent";
};

export const RENT_PERIOD_LABELS = {
  monthly: "Aylık",
  yearly: "Yıllık",
};
 
export const getRentPeriodLabel = (rentPeriod) => {
  return RENT_PERIOD_LABELS[rentPeriod] || "";
};

export const getPriceSuffix = (listingType, rentPeriod) => {
  if (!isRentType(listingType)) return "";
  const periodLabel = getRentPeriodLabel(rentPeriod);
  return periodLabel ? ` / ${periodLabel}` : " / Ay"; 
};

export const formatPrice = (amount) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getListingBadgeStyle = (type) => {
  if (type === "sale") return "bg-brand-gold text-white border-brand-gold/20 ";
  if (type === "rent") return "bg-slate-800 dark:bg-slate-950 border-slate-700 text-amber-400";
  return "bg-amber-600 text-white border-amber-500/20"; // Style fallback for transfer models
};

/* --- CENTRALIZED OPTIONS DICTIONARY BUFFERS --- */

export const listingTypeOptions = [
  { value: "sale", label: "Satılık" }, 
  { value: "rent", label: "Kiralık" }, 
  { value: "transfer_sale", label: "Devren Satılık" }, 
  { value: "transfer_rent", label: "Devren Kiralık" }
];

export const rentPeriodOptions = [
  { value: "monthly", label: "Aylık" }, 
  { value: "yearly", label: "Yıllık" }
];

export const categoryOptions = [
  { value: "apartment", label: "Daire" }, 
  { value: "house", label: "Müstakil Ev" }, 
  { value: "villa", label: "Villa" }, 
  { value: "land", label: "Arsa / Arazi" }, 
  { value: "commercial", label: "Ticari Mülk / İşyeri" }
];

export const heatingOptions = [
  { value: "none", label: "Isıtma Yok" }, 
  { value: "combi", label: "Kombi" }, 
  { value: "air_conditioner", label: "Klima" }, 
  { value: "central_share_meter", label: "Pay Ölçer" }, 
  { value: "central", label: "Merkezi Sistem" }
];

export const districtOptions = [
  { value: "Seyhan", label: "Seyhan" },
  { value: "Çukurova", label: "Çukurova" },
  { value: "Sarıçam", label: "Sarıçam" }, 
  { value: "Yüreğir", label: "Yüreğir" },
  { value: "Karataş", label: "Karataş" },
  { value: "Yumurtalık", label: "Yumurtalık" },
  { value: "Pozantı", label: "Pozantı" },
  { value: "Mersin", label: "Mersin (Çevre Bölge)" }
];

export const occupancyOptions = [
  { value: "vacant", label: "Boş" }, 
  { value: "tenant", label: "Kiracılı" }, 
  { value: "owner", label: "Mülk Sahibi Oturuyor" }
];