import React from 'react'
import FormToggleField from '../properties/form/FormToggleField'
import FormInput from '../../auth/FormInput'

const FormBlockCustomerInfo = ({formik}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        1. Kimlik & İletişim Detayları
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name Input Field */}
        <FormInput
          label="Müşteri Adı *"
          name="firstName"
          placeholder="Müşteri Adı Giriniz"
          formikProps={formik}
          required= {true}
          disabled={formik.isSubmitting}
        />
        {/* Last Name Input Field */}
        <FormInput
          label="Müşteri Soyadı *"
          name="lastName"
          placeholder="Müşteri Soyadı Giriniz"
          formikProps={formik}
          required= {true}
          disabled={formik.isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cellular Phone Network Number Input Field */}
        <FormInput
          label="Telefon Numarası *"
          name="phone"
          type="tel"
          placeholder="Telefon Numarası Giriniz"
          formikProps={formik}
          required= {true}
          disabled={formik.isSubmitting}
        />
        {/* Citizenship / National Identification Number Input Field */}
        <FormInput
          label="TC Kimlik / Vatandaşlık No"
          name="citizenshipId"
          placeholder="TC Kimlik No Giriniz"
          formikProps={formik}
          disabled={formik.isSubmitting}
          maxLength={11}
        />
      </div>
      {/* Electronic Mail Address Input Field */}
      <FormInput
        label="E-Posta Adresi"
        name="email"
        type="email"
        placeholder="E-Posta Adresi Giriniz"
        formikProps={formik}
        required= {true}
        disabled={formik.isSubmitting}
      />
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