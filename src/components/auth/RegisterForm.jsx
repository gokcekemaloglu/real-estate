import React from "react";
import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Kullanıcı adı zorunludur!")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır!"),
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
    handleSubmit,
    isSubmitting,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }
  return (
    <form className="flex flex-col gap-5" onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          Kullanıcı Adı
        </label>
        <input
          name="userName"
          type="text"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="gorkememlak"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"

        />
        {touched.userName && errors.userName && (
          <span className="text-[11px] text-red-500 font-light tracking-wide">{errors.userName}</span>
        )}
      </div>
      {/* Firstname and lastname grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Ad</label>
          <input
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Adınızı buraya yazın."
            className={`input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light ${touched.firstName && errors.firstName ? 'border-red-500 focus:border-red-500' : 'focus:border-brand-gold'}`}
          />
          {touched.firstName && errors.firstName && (
            <span className="text-[11px] text-red-500 font-light tracking-wide">{errors.firstName}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Soyad</label>
          <input
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Soyadınızı buraya yazın."
            className={`input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light ${touched.lastName && errors.lastName ? 'border-red-500 focus:border-red-500' : 'focus:border-brand-gold'}`}
          />
          {touched.lastName && errors.lastName && (
            <span className="text-[11px] text-red-500 font-light tracking-wide">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          E-Posta Adresi
        </label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="isim@gorkememlak.com"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
        {touched.email && errors.email && (
          <span className="text-[11px] text-red-500 font-light tracking-wide">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          Şifre
        </label>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="••••••••"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
        {touched.password && errors.password && (
          <span className="text-[11px] text-red-500 font-light tracking-wide">{errors.password}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-premium w-full py-3.5 mt-2 font-semibold text-center tracking-widest transition-all duration-300 shadow-md dark:shadow-lg dark:hover:shadow-brand-gold/10"
      >
        {isSubmitting ? "yükleniyor"+"..." : "Kayıt Ol"}
      </button>
    </form>
  );
};

export default RegisterForm;
