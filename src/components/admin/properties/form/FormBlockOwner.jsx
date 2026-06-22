import React from 'react'
import FormSelectField from './FormSelectField'

const FormBlockOwner = ({formik, customerOptions}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm animate-fade-in">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        3. Mülk Sahibi İlişkilendirmesi
      </h3>

      {/* Reusable Selection Dropdown mapped for assigning global customer ownerId */}
      <div className="grid grid-cols-1 gap-4">
        <FormSelectField
          label="Mülk Sahibi (Müşteri Portföyü) *"
          name="ownerId"
          options={customerOptions}
          formik={formik}
        />
        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider -mt-2">
          İlanı sisteme kaydetmeden önce mülkün yasal sahibini portföyden seçmek zorunludur.
        </p>
      </div>
    </div>
  )
}

export default FormBlockOwner