import React from "react";
import useUserCall from "../../hooks/useUserCall";
import { useFormik } from "formik";
import { PasswordChangeSchema } from "../../helper/ValidationSchemas";
import FormInput from "../auth/FormInput";

const ProfileChangePasswordForm = ({ currentUserId }) => {
  const { changeMyPassword } = useUserCall();

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
        <FormInput
          label="Mevcut Şifreniz"
          name="currentPassword"
          type="password"
          placeholder="Mevcut Şifrenizi Giriniz"
          formikProps={passwordFormik}
          required= {true}
          disabled={passwordFormik.isSubmitting}
        />

        {/* 2. New Password Input Field Layer */}
        <FormInput
          label="Yeni Şifreniz"
          name="newPassword"
          type="password"
          placeholder="Yeni Şifrenizi Giriniz"
          formikProps={passwordFormik}
          required= {true}
          disabled={passwordFormik.isSubmitting}
        />

        {/* 3. Retype Password Validation Field Layer */}
        <FormInput
          label="Yeni Şifre Tekrarı"
          name="retypePassword"
          type="password"
          placeholder="Yeni Şifre Tekrar Giriniz"
          formikProps={passwordFormik}
          required= {true}
          disabled={passwordFormik.isSubmitting}
        />

        {/* Dynamic localized execution button trigger */}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            title={passwordFormik.isSubmitting ? "Güncelleniyor..." : "Şifreyi Güncelle"}
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
