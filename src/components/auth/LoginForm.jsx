import React from "react";
import FormInput from "./FormInput";

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
        label={"Kullanıcı Adı veya E-Posta"}
        name={"userNameOrEmail"} // Matches the key name in SignInSchema and initialValues
        placeholder={"gorkememlak veya isim@gorkememlak.com"}
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
        {isSubmitting ? "Yükleniyor" + "..." : "Giriş Yap"}
      </button>
    </form>
  );
};

export default LoginForm;
