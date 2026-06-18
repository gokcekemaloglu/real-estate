import React from "react";
import FormSelectField from "./FormSelectField";

const FormBlockLocation = ({formik, districtOptions}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
      <h3 className="md:col-span-3 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        3. Konum Bilgileri
      </h3>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Şehir
        </label>
        <input
          type="text"
          name="city"
          value={formik.values.city}
          disabled
          className="input-premium bg-slate-100 dark:bg-slate-800/30 opacity-60 cursor-not-allowed"
        />
      </div>

      <FormSelectField
        label="İlçe"
        name="district"
        options={districtOptions}
        formik={formik}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Mahalle
        </label>
        <input
          type="text"
          name="neighbourhood"
          placeholder="Cemalpaşa"
          value={formik.values.neighbourhood}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.neighbourhood && formik.errors.neighbourhood ? "border-red-500 focus:border-red-500" : ""}`}
        />
        {formik.touched.neighbourhood && formik.errors.neighbourhood && (
          <span className="text-[11px] text-red-500 font-light mt-1">
            {formik.errors.neighbourhood}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormBlockLocation;
