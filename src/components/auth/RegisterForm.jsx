import React from "react";
import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Bu alan zorunludur!")
    .min(3, "Username en az 3 karakter olmalıdır!"),
  firstName: Yup.string()
    .min(2, "Adınız çok kısa!")
    .max(50, "Adınız çok uzun!")
    .required("Ad alanı zorunludur!"),
  lastName: Yup.string()
    .min(2, "Soyadınız çok kısa!")
    .max(50, "Soyadınız çok uzun!")
    .required("Soyad alanı zorunludur!"),
  email: Yup.string().email("Geçersiz e-posta adresi biçimi!").required("E-posta adresi zorunludur!"),
  password: Yup.string()
    .required("Şifre alanı zorunludur!")
    .min(8, "Şifre en az 8 karakter olmalıdır!")
    .matches(/\d+/, "En az bir rakam içermelidir!")
    .matches(/[a-z]/, "En az bir küçük harf içermelidir!")
    .matches(/[A-Z]/, "En az bir büyük harf içermelidir!")
    .matches(
      /[@$%&?!*]+/,
      "(@$%&?!*) özel karakterlerinden en az bir tanesini içermelidir!",
    ),
});

const RegisterForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    // handleSubmit,
    isSubmitting,
    /* and other goodies */
}) => {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          Kullanıcı Adı
        </label>
        <input
          type="text"
          name="userName"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={touched.userName && Boolean(errors.userName)}
          placeholder="gorkememlak"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"

        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          E-Posta Adresi
        </label>
        <input
          type="email"
          placeholder="isim@gorkememlak.com"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          Şifre
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
      </div>

      <button
        type="submit"
        className="btn-premium w-full py-3.5 mt-2 font-semibold text-center tracking-widest transition-all duration-300 shadow-md dark:shadow-lg dark:hover:shadow-brand-gold/10"
      >
        Kayıt Ol
      </button>
    </form>
  );
};

export default RegisterForm;
