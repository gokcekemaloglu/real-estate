import * as Yup from "yup"
import { isRentType } from "./listingTypeLabels";

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
  userNameOrEmail: Yup.string()
    .required("Kullanıcı adı veya e-posta adresi zorunludur!")
    .min(3, "Giriş bilgisi çok kısa!"),
  password: Yup.string()
    .required("Şifre alanı zorunludur!")
})

// Comprehensive validation constraints mapped accurately from your Mongoose Property model
export const PropertySchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "İlan başlığı çok kısa!")
    .required("İlan başlığı girmek zorunludur."),
  description: Yup.string()
    .min(10, "Mimari açıklama en az 10 karakter olmalıdır.")
    .required("Mimari açıklama girmek zorunludur."),
  price: Yup.number()
    .positive("Fiyat pozitif bir sayı olmalıdır.")
    .required("Fiyat alanı zorunludur."),
  listingType: Yup.string()
    .required("İlan durumunu (Satılık/Kiralık) seçmek zorunludur."),
  rentPeriod: Yup.string()
    .nullable()
    .when("listingType", {
      is: (value) => isRentType(value),
      then: (schema) =>
        schema
          .required("Kiralık ilanlarda kira periyodu (Aylık/Yıllık) seçmek zorunludur.")
          .oneOf(["monthly", "yearly"], "Geçersiz kira periyodu seçimi."),
      otherwise: (schema) => schema.notRequired(),
    }),
  propertyCategory: Yup.string()
    .required("Mülk kategorisini (Villa/Daire) seçmek zorunludur."),
  district: Yup.string()
    .required("İlçe seçimi zorunludur."),
  neighbourhood: Yup.string()
    .required("Mahalle bilgisi zorunludur."),
  roomCount: Yup.string()
    .required("Oda sayısı zorunludur (Örn: 3+1)."),
  bathroomCount: Yup.number()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .min(0, "Banyo sayısı negatif olamaz.")
    .nullable(),
  totalFloors: Yup.number()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .positive("Toplam kat sayısı pozitif bir sayı olmalıdır.")
    .nullable(),
  buildingAge: Yup.number()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .min(0, "Bina yaşı negatif olamaz.")
    .nullable(),
  maintenanceFee: Yup.number()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .min(0, "Aidat bedeli negatif olamaz.")
    .nullable(),
  occupancyStatus: Yup.string()
    .oneOf(["vacant", "tenant", "owner"], "Geçersiz kullanım durumu seçimi.")
    .nullable(),
  ownerId: Yup.string()
    .required("Mülk sahibi seçimi zorunludur."),
});

// Comprehensive validation constraints mapped accurately from your Mongoose Customer model
export const CustomerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Müşteri adı çok kısa!")
    .max(50, "Müşteri adı çok uzun!")
    .required("Müşteri adı girmek zorunludur."),
  lastName: Yup.string()
    .min(2, "Müşteri soyadı çok kısa!")
    .max(50, "Müşteri soyadı çok uzun!")
    .required("Müşteri soyadı girmek zorunludur."),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Telefon numarası sadece rakamlardan oluşmalıdır.")
    .min(10, "Telefon numarası en az 10 hane olmalıdır.")
    .required("Telefon numarası girmek zorunludur (Sistemde benzersiz olmalıdır)."),
  email: Yup.string()
    .email("Geçersiz e-posta adresi biçimi!")
    .notRequired()
    .nullable(),
  citizenshipId: Yup.string()
    .transform((value, originalValue) => originalValue === "" ? null : value)
    .matches(/^[0-9]*$/, "TC Kimlik numarası sadece rakamlardan oluşabilir.")
    .length(11, "TC Kimlik numarası tam 11 hane olmalıdır.")
    .nullable()
    .notRequired(),
  address: Yup.string()
    .max(300, "Adres tanımı çok uzun!")
    .notRequired()
    .nullable(),
  isActive: Yup.boolean()
    .default(true)
    .required("Müşteri aktiflik durumu zorunludur."),
});

export const ProfileUpdateSchema = Yup.object().shape({
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
  phone: Yup.string()
    .transform((value, originalValue) => originalValue === "" ? undefined : value)
    .matches(/^[0-9]*$/, "Telefon numarası sadece rakamlardan oluşmalıdır.")
    .min(10, "Telefon numarası en az 10 hane olmalıdır.")
    .notRequired(),
  address: Yup.string()
    .max(300, "Adres tanımı çok uzun!")
    .notRequired()
    .nullable(),
});

// Comprehensive security schema mapped precisely for your changeMyPassword controller boundaries
export const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Mevcut şifrenizi girmeniz zorunludur!"),
  newPassword: Yup.string()
    .required("Yeni şifre alanı zorunludur!")
    .min(8, "Şifre en az 8 karakter olmalıdır!")
    .matches(/\d+/, "En az bir rakam içermelidir!")
    .matches(/[a-z]/, "En az bir küçük harf içermelidir!")
    .matches(/[A-Z]/, "En az bir büyük harf içermelidir!")
    .matches(/[@$%&?!*]+/, "(@$%&?!*) özel karakterlerinden en az bir tanesini içermelidir!")
    // Avoid user mapping their old credentials directly as the new password layer
    .notOneOf([Yup.ref("currentPassword")], "Yeni şifreniz mevcut şifrenizle aynı olamaz!"),
  retypePassword: Yup.string()
    .required("Şifre tekrarı alanı zorunludur!")
    //Explicitly forces strict string comparisons to guarantee retype matching bounds
    .oneOf([Yup.ref("newPassword"), null], "Yeni şifreleriniz birbiriyle eşleşmiyor!"),
});