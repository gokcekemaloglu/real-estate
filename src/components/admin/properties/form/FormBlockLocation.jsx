import React from "react";
import FormSelectField from "./FormSelectField";
import FormInput from "../../../auth/FormInput";

const FormBlockLocation = ({formik, districtOptions}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
      <h3 className="md:col-span-3 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        3. Konum Bilgileri
      </h3>
      <FormInput
        label="Şehir"
        name="city"
        type="text"
        placeholder=""
        formikProps={formik}
        disabled={true}
      />

      <FormSelectField
        label="İlçe"
        name="district"
        options={districtOptions}
        formik={formik}
      />
      <FormInput
        label="Mahalle"
        name="neighbourhood"
        placeholder="Mahalle..."
        formikProps={formik}
        required= {true}
        disabled={formik.isSubmitting}
      />
    </div>
  );
};

export default FormBlockLocation;
