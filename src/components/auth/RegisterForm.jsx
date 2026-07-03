import React from "react";
import FormInput from "./FormInput";

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
        required= {true}
        disabled={isSubmitting}
      />
      {/* Firstname and lastname grid */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label={"Ad"}
          name={"firstName"}
          placeholder={"Adınız"}
          formikProps={props}
          required= {true}
          disabled={isSubmitting}
        />
        <FormInput
          label={"Soy Ad"}
          name={"lastName"}
          placeholder={"Soyadınız"}
          formikProps={props}
          required= {true}
          disabled={isSubmitting}
        />
      </div>
      <FormInput
        label={"E-Posta Adresi"}
        name={"email"}
        placeholder={"isim@gorkememlak.com"}
        formikProps={props}
        required= {true}
        disabled={isSubmitting}
      />
      <FormInput
        label={"Şifre"}
        name={"password"}
        type="password"
        placeholder={"••••••••"}
        formikProps={props}
        required= {true}
        disabled={isSubmitting}
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
