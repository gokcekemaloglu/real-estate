import React from "react";

const FormToggleField = ({ label, name, formik }) => {
  const isActive = formik.values[name];
  return (
    <div className="flex items-center justify-between border border-slate-100 dark:border-slate-800/60 p-3 bg-white dark:bg-slate-900 shadow-sm">
      <span className="text-[10px] uppercase text-slate-400 font-medium">
        {label}
      </span>
      <button
        type="button"
        onClick={() => formik.setFieldValue(name, !isActive)}
        className={`relative inline-flex h-5 w-10 rounded-full transition-colors duration-200 focus:outline-none ${isActive ? "bg-brand-gold" : "bg-slate-300 dark:bg-slate-700"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 mt-0.5 ${isActive ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
};

export default FormToggleField;
