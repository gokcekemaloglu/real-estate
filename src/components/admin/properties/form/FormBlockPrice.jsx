import React from "react";
import FormSelectField from "./FormSelectField";

const FormBlockPrice = ({formik, listingTypeOptions, categoryOptions}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
      <h3 className="md:col-span-2 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        2. Durum & Fiyatlandırma
      </h3>
      {/* Selling Price Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Fiyat (₺)
        </label>
        <input
          type="number"
          name="price"
          placeholder="4500000"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.price && formik.errors.price ? "border-red-500 focus:border-red-500" : ""}`}
        />
        {formik.touched.price && formik.errors.price && (
          <span className="text-[11px] text-red-500 font-light mt-1">
            {formik.errors.price}
          </span>
        )}
      </div>
      {/* Monthly Operational Maintenance Fee Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Aylık Aidat (₺)
        </label>
        <input
          type="number"
          name="maintenanceFee"
          placeholder="750"
          value={formik.values.maintenanceFee}
          onChange={formik.handleChange}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>

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
    </div>
  );
};

export default FormBlockPrice;
