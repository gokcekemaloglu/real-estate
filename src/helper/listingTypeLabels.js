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