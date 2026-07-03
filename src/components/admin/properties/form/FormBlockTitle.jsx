import React from "react";
import FormInput from "../../../auth/FormInput";

const FormBlockTitle = ({ formik }) => {
  const hasDescError = formik.touched.description && formik.errors.description;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        1. Başlık & Mimari Tanım
      </h3>

      <FormInput
        label="İlan Başlığı"
        name="title"
        placeholder="Seyhan'da Havuzlu Lüks Müstakil Villa..."
        formikProps={formik}
        required= {true}
        disabled={formik.isSubmitting}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Mimari Açıklama
        </label>
        <textarea
          name="description"
          rows="4"
          placeholder="Mülkün tüm lüks konfor ayrıntılarını buraya işleyin..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 p-3 leading-relaxed whitespace-pre-line ${hasDescError ? "border-red-500 focus:border-red-500" : ""} ${formik.isSubmitting ? "cursor-not-allowed opacity-60 select-none bg-slate-100" : ""}`}
        />
        {hasDescError && (
          <span className="text-[11px] text-red-500 font-light mt-1">
            {formik.errors.description}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormBlockTitle;
