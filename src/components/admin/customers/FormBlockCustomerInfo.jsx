import React from 'react'
import FormToggleField from '../properties/form/FormToggleField'

const FormBlockCustomerInfo = ({formik}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        1. Kimlik & İletişim Detayları
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Müşteri Adı *</label>
          <input
            type="text"
            name="firstName"
            placeholder="Ahmet"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.firstName && formik.errors.firstName ? "border-red-500 focus:border-red-500" : ""}`}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.firstName}</span>
          )}
        </div>

        {/* Last Name Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Müşteri Soyadı *</label>
          <input
            type="text"
            name="lastName"
            placeholder="Yılmaz"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.lastName && formik.errors.lastName ? "border-red-500 focus:border-red-500" : ""}`}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cellular Phone Network Number Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Telefon Numarası *</label>
          <input
            type="tel"
            name="phone"
            placeholder="05321234567"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.phone && formik.errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
          />
          {formik.touched.phone && formik.errors.phone && (
            <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.phone}</span>
          )}
        </div>

        {/* Citizenship / National Identification Number Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">TC Kimlik / Vatandaşlık No</label>
          <input
            type="text"
            name="citizenshipId"
            maxLength={11}
            placeholder="11 Haneli TC No"
            value={formik.values.citizenshipId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.citizenshipId && formik.errors.citizenshipId ? "border-red-500 focus:border-red-500" : ""}`}
          />
          {formik.touched.citizenshipId && formik.errors.citizenshipId && (
            <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.citizenshipId}</span>
          )}
        </div>
      </div>

      {/* Electronic Mail Address Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">E-Posta Adresi</label>
        <input
          type="email"
          name="email"
          placeholder="ahmet@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.email && formik.errors.email ? "border-red-500 focus:border-red-500" : ""}`}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.email}</span>
        )}
      </div>

      {/* Residential / Notification Physical Address Textarea Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Müşterinin Açık Adresi</label>
        <textarea
          name="address"
          rows="3"
          placeholder="Müşterinin tebligat veya iletişim adresi..."
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 p-3 leading-relaxed resize-none ${formik.touched.address && formik.errors.address ? "border-red-500 focus:border-red-500" : ""}`}
        />
        {formik.touched.address && formik.errors.address && (
          <span className="text-[11px] text-red-500 font-light mt-1">{formik.errors.address}</span>
        )}
      </div>

      {/* Portfolio Record Activation Toggle Layout Section */}
      <div className="mt-2">
        <FormToggleField label="Sistem Portföyünde Aktif Gözüksün" name="isActive" formik={formik} />
      </div>
    </div>
  )
}

export default FormBlockCustomerInfo