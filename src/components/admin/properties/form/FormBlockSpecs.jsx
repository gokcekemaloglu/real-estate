import React from "react";
import FormSelectField from "./FormSelectField";
import FormInput from "../../../auth/FormInput";

const FormBlockSpecs = ({formik, heatingOptions, occupancyOptions}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 shadow-sm">
      <h3 className="col-span-2 md:col-span-3 lg:col-span-4 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        4. Yapısal Özellikler
      </h3>
      {/* Gross Area Input Field */}
      <FormInput
        label="Brüt Alan (m²)"
        name="grossArea"
        type="number"
        placeholder="Brüt Alan (m²)"
        formikProps={formik}
        disabled={formik.isSubmitting}
      />
      {/* Net Area Input Field */}
      <FormInput
        label="Net Alan (m²)"
        name="netArea"
        type="number"
        placeholder="Net Alan (m²)"
        formikProps={formik}
        disabled={formik.isSubmitting}
      />
      {/* Room Count Composition Input Field */}
      <FormInput
        label="Oda Sayısı"
        name="roomCount"
        placeholder="Oda Sayısı... (Örn: 3+1)"
        formikProps={formik}
        required={true}
        disabled={formik.isSubmitting}
      />
      {/* Bathroom Count Input Field */}
      <FormInput
        label="Banyo Sayısı"
        name="bathroomCount"
        type="number"
        placeholder="Banyo Sayısı"
        formikProps={formik}
        disabled={formik.isSubmitting}
      />
      {/* Building Age Input Field */}
      <FormInput
        label="Bina Yaşı"
        name="buildingAge"
        type="number"
        placeholder="Bina Yaşı"
        formikProps={formik}
        disabled={formik.isSubmitting}
      />
      {/* Current Floor Level Input Field */}
      <FormInput
        label="Bulunduğu Kat"
        name="floor"
        type="number"
        placeholder="Bulunduğu Kat"
        formikProps={formik}
        disabled={formik.isSubmitting}
      />
      {/* Total Floors Capacity Input Field */}
      <FormInput
        label="Toplam Kat Sayısı"
        name="totalFloors"
        type="number"
        placeholder="Toplam Kat Sayısı"
        formikProps={formik}
        disabled={formik.isSubmitting}
      />

      {/* Heating Infrastructure Selection Dropdown Field */}
      <FormSelectField
        label="Isıtma Tipi"
        name="heatingType"
        options={heatingOptions}
        formik={formik}
      />
      {/* Occupancy State Condition Selection Dropdown Field */}
      <FormSelectField
        label="Kullanım Durumu"
        name="occupancyStatus"
        options={occupancyOptions}
        formik={formik}
      />
    </div>
    
  );
};

export default FormBlockSpecs;
