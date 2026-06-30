import React from 'react'

const ProfileUpdateForm = ({formik}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-colors duration-300 w-full flex flex-col gap-5">
      <h3 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
        Kişisel Kimlik Bilgileri
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* 1. UserName Input (Locked explicitly to safe-guard unique index configurations) */}
        <div className="flex flex-col gap-1.5 sm:col-span-2 opacity-60">
          <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Kullanıcı Adı (Değiştirilemez)</label>
          <input
            type="text"
            name="userName"
            value={formik?.values?.userName}
            disabled
            className="input-premium bg-slate-100 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-500 font-light select-none cursor-not-allowed w-full"
          />
        </div>

        {/* 2. First Name Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Adınız</label>
          <input
            type="text"
            name="firstName"
            value={formik?.values?.firstName}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            placeholder="Cemal"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full"
          />
          {formik?.touched?.firstName && formik?.errors?.firstName && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{formik?.errors?.firstName}</div>
          )}
        </div>

        {/* 3. Last Name Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Soyadınız</label>
          <input
            type="text"
            name="lastName"
            value={formik?.values?.lastName}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            placeholder="Ciğer"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full"
          />
          {formik?.touched.lastName && formik?.errors.lastName && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{formik?.errors?.lastName}</div>
          )}
        </div>

        {/* 4. Email Address Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">E-Posta Adresiniz</label>
          <input
            type="email"
            name="email"
            value={formik?.values?.email}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            placeholder="cemal@example.com"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full"
          />
          {formik?.touched?.email && formik?.errors?.email && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{formik?.errors?.email}</div>
          )}
        </div>

        {/* 5. Phone Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Telefon Numaranız</label>
          <input
            type="tel"
            name="phone"
            value={formik?.values?.phone}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            placeholder="555 000 0000"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full"
          />
          {formik?.touched?.phone && formik?.errors?.phone && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{formik?.errors?.phone}</div>
          )}
        </div>

        {/* 6. Address Area Field */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Açık Adres Tanımı</label>
          <textarea
            name="address"
            rows="3"
            value={formik?.values?.address}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            placeholder="Seyhan / Adana"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold resize-none w-full"
          />
          {formik?.touched?.address && formik?.errors?.address && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{formik?.errors?.address}</div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ProfileUpdateForm