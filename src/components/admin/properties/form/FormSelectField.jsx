import React from 'react'

const FormSelectField = ({label, name, options, formik}) => {
    const hasError = formik.touched[name] && formik.errors[name]
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">{label}</label>
      <select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 text-xs text-slate-600 dark:text-slate-400 focus:border-brand-gold cursor-pointer ${hasError ? "border-red-500 focus:border-red-500" : ""}`}
      >
        <option value="">Seçiniz</option>
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      {hasError && <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors[name]}</span>}
    </div>
  )
}

export default FormSelectField