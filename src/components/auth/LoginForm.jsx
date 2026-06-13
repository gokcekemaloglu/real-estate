import React from "react";
import { object, string } from "yup";
import FormInput from "./FormInput";

export const SignInSchema = object({
  email: string()
    .email("Geçersiz e-posta adresi biçimi!")
    .required("E-posta adresi zorunludur!"),
  userName: string()
    .required("Kullanıcı adı zorunludur!")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır!"),
  password: string()
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

const LoginForm = (props) => {
  const { handleSubmit, isSubmitting } = props;
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <form className="flex flex-col gap-5" onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
      <FormInput
        label={"Kullanıcı Adı"}
        name={"userName"}
        placeholder={"gorkememlak"}
        formikProps={props}
      />
      {/* <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          E-Posta Adresi
        </label>
        <input
          type="email"
          placeholder="isim@gorkememlak.com"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
      </div> */}
      <FormInput
        label={"E-Posta Adresi"}
        name={"email"}
        placeholder={"isim@gorkememlak.com"}
        formikProps={props}
      />

      <FormInput
        label={"Şifre"}
        name={"password"}
        type="password"
        placeholder={"••••••••"}
        formikProps={props}
      />
      {/* <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          Şifre
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="input-premium bg-slate-100 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white w-full font-light placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand-gold"
        />
      </div> */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-premium w-full py-3.5 mt-2 font-semibold text-center tracking-widest transition-all duration-300 shadow-md dark:shadow-lg dark:hover:shadow-brand-gold/10"
      >
        {isSubmitting ? "Yükleniyor" + "..." : "Giriş Yap"}
      </button>
    </form>
  );
};

export default LoginForm;
