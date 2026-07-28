import React from "react";
import FormInput from "./FormInput";

const RegisterForm = (props) => {
  const { handleSubmit, isSubmitting, isKvkkAccepted } = props;
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isKvkkAccepted && !isSubmitting) {
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
        title={isSubmitting ? "Yükleniyor" + "..." : "Kayıt Ol"}
        disabled={!isKvkkAccepted || isSubmitting}
        className={`w-full py-3.5 mt-2 font-semibold text-center tracking-widest transition-all duration-300 rounded-sm shadow-md ${
          isKvkkAccepted
            ? "btn-premium cursor-pointer opacity-100 dark:shadow-lg dark:hover:shadow-brand-gold/10"
            : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50 shadow-none pointer-events-none"
        }`}
      >
        {isSubmitting ? "Yükleniyor" + "..." : "Kayıt Ol"}
      </button>
    </form>
  );
};

export default RegisterForm;
