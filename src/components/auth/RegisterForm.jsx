import React from "react";
import * as Yup from "yup";
import FormInput from "./FormInput";

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
  email: Yup.string()
    .email("Geçersiz e-posta adresi biçimi!")
    .required("E-posta adresi zorunludur!"),
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

const RegisterForm = (props) => {
  const { handleSubmit, isSubmitting } = props;
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <form
      className="flex flex-col gap-5"
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
    >
      <FormInput
        label={"Kullanıcı Adı"}
        name={"userName"}
        placeholder={"gorkememlak"}
        formikProps={props}
      />
      {/* Firstname and lastname grid */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label={"Ad"}
          name={"firstName"}
          placeholder={"Adınız"}
          formikProps={props}
        />
        <FormInput
          label={"Soy Ad"}
          name={"lastName"}
          placeholder={"Soyadınız"}
          formikProps={props}
        />
      </div>
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
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-premium w-full py-3.5 mt-2 font-semibold text-center tracking-widest transition-all duration-300 shadow-md dark:shadow-lg dark:hover:shadow-brand-gold/10"
      >
        {isSubmitting ? "yükleniyor" + "..." : "Kayıt Ol"}
      </button>
    </form>
  );
};

export default RegisterForm;
