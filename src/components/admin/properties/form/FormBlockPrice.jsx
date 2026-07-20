import React from "react";
import FormSelectField from "./FormSelectField";
import FormInput from "../../../auth/FormInput";
import { isRentType } from "../../../../helper/propertyOptions";

const FormBlockPrice = ({formik, listingTypeOptions, categoryOptions, rentPeriodOptions,}) => {
  const showRentPeriod = isRentType(formik.values.listingType);
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
      <h3 className="md:col-span-2 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        2. Durum & Fiyatlandırma
      </h3>
      {/* Selling Price Input Field */}
      <FormInput
        label="Fiyat (₺)"
        name="price"
        type="number"
        placeholder="Fiyat (₺)"
        formikProps={formik}
        required= {true}
        disabled={formik.isSubmitting}
      />
      
      {/* Monthly Operational Maintenance Fee Input Field */}
      <FormInput
        label="Aylık Aidat (₺)"
        name="maintenanceFee"
        type="number"
        placeholder="Aylık Aidat (₺)"
        formikProps={formik}
        disabled={formik.isSubmitting}
      />
      {/* Listing Type Select Field */}
      <FormSelectField
        label="İlan Durumu"
        name="listingType"
        options={listingTypeOptions}
        formik={formik}
      />
      <FormSelectField
        label="Mülk Kategorisi"
        name="propertyCategory"
        options={categoryOptions}
        formik={formik}
      />
      {showRentPeriod && (
        <FormSelectField
          label="Kira Periyodu"
          name="rentPeriod"
          options={rentPeriodOptions}
          formik={formik}
        />
      )}
    </div>
  );
};

export default FormBlockPrice;
