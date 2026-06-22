import React from "react";
import FormSelectField from "./FormSelectField";

const FormBlockSpecs = ({formik, heatingOptions}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
      <h3 className="col-span-2 md:col-span-4 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        4. Yapısal Özellikler
      </h3>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Brüt Alan (m²)
        </label>
        <input
          type="number"
          name="grossArea"
          value={formik.values.grossArea}
          onChange={formik.handleChange}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Net Alan (m²)
        </label>
        <input
          type="number"
          name="netArea"
          value={formik.values.netArea}
          onChange={formik.handleChange}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Oda Sayısı
        </label>
        <input
          type="text"
          name="roomCount"
          placeholder="3+1"
          value={formik.values.roomCount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.roomCount && formik.errors.roomCount ? "border-red-500 focus:border-red-500" : ""}`}
        />
        {formik.touched.roomCount && formik.errors.roomCount && (
          <span className="text-[11px] text-red-500 font-light mt-1">
            {formik.errors.roomCount}
          </span>
        )}
      </div>

      <FormSelectField
        label="Isıtma Tipi"
        name="heatingType"
        options={heatingOptions}
        formik={formik}
      />
    </div>
  );
};

export default FormBlockSpecs;
