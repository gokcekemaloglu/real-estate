import React from "react";
import FormToggleField from "./FormToggleField";

const FormBlockToggles = ({formik}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
      <h3 className="col-span-1 sm:col-span-2 md:col-span-4 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        5. Donanım Detayları
      </h3>

      <FormToggleField label="Eşyalı Mülk" name="isFurnished" formik={formik} />
      <FormToggleField label="Asansör" name="hasElevator" formik={formik} />
      <FormToggleField label="Otopark" name="hasParking" formik={formik} />
      <FormToggleField label="Krediye Uygun" name="isLoanEligible" formik={formik}/>
    </div>
  );
};

export default FormBlockToggles;
