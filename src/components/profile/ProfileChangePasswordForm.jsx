import React from "react";
import useUserCall from "../../hooks/useUserCall";
import { useFormik } from "formik";
import { PasswordChangeSchema } from "../../helper/ValidationSchemas";
import { useState } from "react";

const ProfileChangePasswordForm = ({ currentUserId }) => {
  const { changeMyPassword } = useUserCall();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRetype, setShowRetype] = useState(false);

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      retypePassword: "",
    },
    validationSchema: PasswordChangeSchema,
    onSubmit: async (values, { resetForm }) => {
      await changeMyPassword(currentUserId, values);
      resetForm();
    },
  });
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-colors duration-300 w-full flex flex-col gap-5">
      <h3 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
        Güvenlik & Şifre Değiştirme
      </h3>

      <div className="flex flex-col gap-5">
        {/* 1. Current Active Password Field Layer */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Mevcut Şifreniz
          </label>
          <div className="relative w-full">
            <input
              type={showCurrent ? "text" : "password"} // FIXED: Dynamic input type evaluation matching visibility states
              name="currentPassword"
              value={passwordFormik.values.currentPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              placeholder="••••••••"
              className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full pr-10"
            />
            {/* Minimalist interactive eye icon mask */}
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-brand-gold transition-colors duration-200 cursor-pointer text-[14px]"
            >
              {showCurrent ? "🙈" : "👁️"}
            </button>
          </div>
          {passwordFormik.touched.currentPassword &&
            passwordFormik.errors.currentPassword && (
              <div className="text-[11px] text-red-500 font-medium mt-0.5">
                {passwordFormik.errors.currentPassword}
              </div>
            )}
        </div>

        {/* 2. New Password Input Field Layer */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Yeni Şifre
          </label>
          <div className="relative w-full">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              placeholder="••••••••"
              className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-brand-gold transition-colors duration-200 cursor-pointer text-[14px]"
            >
              {showNew ? "🙈" : "👁️"}
            </button>
          </div>
          {passwordFormik.touched.newPassword &&
            passwordFormik.errors.newPassword && (
              <div className="text-[11px] text-red-500 font-medium mt-0.5">
                {passwordFormik.errors.newPassword}
              </div>
            )}
        </div>

        {/* 3. Retype Password Validation Field Layer */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            Yeni Şifre Tekrarı
          </label>
          <div className="relative w-full">
            <input
              type={showRetype ? "text" : "password"}
              name="retypePassword"
              value={passwordFormik.values.retypePassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              placeholder="••••••••"
              className="input-premium bg-slate-50 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white font-light placeholder:text-slate-400 focus:border-brand-gold w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowRetype(!showRetype)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-brand-gold transition-colors duration-200 cursor-pointer text-[14px]"
            >
              {showRetype ? "🙈" : "👁️"}
            </button>
          </div>
          {passwordFormik.touched.retypePassword &&
            passwordFormik.errors.retypePassword && (
              <div className="text-[11px] text-red-500 font-medium mt-0.5">
                {passwordFormik.errors.retypePassword}
              </div>
            )}
        </div>

        {/* Dynamic localized execution button trigger */}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={passwordFormik.handleSubmit}
            disabled={passwordFormik.isSubmitting}
            className="btn-premium w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-widest cursor-pointer disabled:opacity-50"
          >
            {passwordFormik.isSubmitting
              ? "Güncelleniyor..."
              : "Şifreyi Güncelle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileChangePasswordForm;
