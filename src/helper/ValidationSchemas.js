import * as Yup from "yup"

// Reusable validation schema for registering new user accounts
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

// Advanced logic tracking: User can type either a valid email format or a plain string username

export const SignInSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required("Kullanıcı adı veya e-posta adresi zorunludur!")
    .min(3, "Giriş bilgisi çok kısa!"),
  password: Yup.string()
    .required("Şifre alanı zorunludur!")
})

// export const SignInSchema = object({
//   email: string()
//     .email("Geçersiz e-posta adresi biçimi!")
//     .required("E-posta adresi zorunludur!"),
//   userName: string()
//     .required("Kullanıcı adı zorunludur!")
//     .min(3, "Kullanıcı adı en az 3 karakter olmalıdır!"),
//   password: string()
//     .required("Şifre alanı zorunludur!")
//     .min(8, "Şifre en az 8 karakter olmalıdır!")
//     .matches(/\d+/, "En az bir rakam içermelidir!")
//     .matches(/[a-z]/, "En az bir küçük harf içermelidir!")
//     .matches(/[A-Z]/, "En az bir büyük harf içermelidir!")
//     .matches(
//       /[@$%&?!*]+/,
//       "(@$%&?!*) özel karakterlerinden en az bir tanesini içermelidir!",
//     ),
// });
