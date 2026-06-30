import React from 'react'
import useUserCall from '../../hooks/useUserCall';
import { useFormik } from 'formik';
import { PasswordChangeSchema } from '../../helper/ValidationSchemas';

const ProfileChangePasswordForm = ({currentUserId}) => {
    const { changeMyPassword } = useUserCall();

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      retypePassword: "",
    },
    validationSchema: PasswordChangeSchema,
    onSubmit: async (values, { resetForm }) => {
      // Safely route execution payload parameters straight to changeMyPassword pipeline
      await changeMyPassword(currentUserId, values);
      resetForm();
    },
  });
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-colors duration-300 w-full flex flex-col gap-5">
      <h3 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
        Güvenlik & Şifre Değiştirme
      </h3>

      {/* FIXED: Independent inner submit pipeline avoids parent property updates fields clashes */}
      <div className="flex flex-col gap-5">
        
        {/* 1. Current Active Password field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Mevcut Şifreniz</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordFormik.values.currentPassword}
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            placeholder="••••••••"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full"
          />
          {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{passwordFormik.errors.currentPassword}</div>
          )}
        </div>

        {/* 2. New Password input field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Yeni Şifre</label>
          <input
            type="password"
            name="newPassword"
            value={passwordFormik.values.newPassword}
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            placeholder="••••••••"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full"
          />
          {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{passwordFormik.errors.newPassword}</div>
          )}
        </div>

        {/* 3. Retype Password validation field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Yeni Şifre Tekrarı</label>
          <input
            type="password"
            name="retypePassword"
            value={passwordFormik.values.retypePassword}
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            placeholder="••••••••"
            className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full"
          />
          {passwordFormik.touched.retypePassword && passwordFormik.errors.retypePassword && (
            <div className="text-[11px] text-red-500 font-medium mt-0.5">{passwordFormik.errors.retypePassword}</div>
          )}
        </div>

        {/* Dynamic localized execution button trigger */}
        <div className="flex justify-end mt-2">
          <button
            type="button" // LOCKED to button to prevent premature trigger of parent profile update pipelines
            onClick={passwordFormik.handleSubmit}
            disabled={passwordFormik.isSubmitting}
            className="btn-premium w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-widest cursor-pointer disabled:opacity-50"
          >
            {passwordFormik.isSubmitting ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProfileChangePasswordForm