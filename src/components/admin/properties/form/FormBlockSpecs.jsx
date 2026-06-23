import React from "react";
import FormSelectField from "./FormSelectField";

const FormBlockSpecs = ({formik, heatingOptions, occupancyOptions}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
      <h3 className="col-span-2 md:col-span-4 text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        4. Yapısal Özellikler
      </h3>

      {/* Gross Area Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Brüt Alan (m²)
        </label>
        <input
          type="number"
          name="grossArea"
          value={formik.values.grossArea ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>
      {/* Net Area Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Net Alan (m²)
        </label>
        <input
          type="number"
          name="netArea"
          value={formik.values.netArea ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>
      {/* Room Count Composition Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Oda Sayısı
        </label>
        <input
          type="text"
          name="roomCount"
          placeholder="3+1"
          value={formik.values.roomCount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-premium bg-slate-50/50 dark:bg-slate-950/20 ${formik.touched.roomCount && formik.errors.roomCount ? "border-red-500 focus:border-red-500" : ""}`}
        />
        {formik.touched.roomCount && formik.errors.roomCount && (
          <span className="text-[11px] text-red-500 font-light mt-1">
            {formik.errors.roomCount}
          </span>
        )}
      </div>
      {/* Bathroom Count Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Banyo Sayısı
        </label>
        <input
          type="number"
          name="bathroomCount"
          placeholder="2"
          value={formik.values.bathroomCount ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>
      {/* Building Age Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Bina Yaşı
        </label>
        <input
          type="number"
          name="buildingAge"
          placeholder="5"
          value={formik.values.buildingAge ?? ""}
          onChange={formik.handleChange}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
          onBlur={formik.handleBlur}
        />
      </div>
      {/* Current Floor Level Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Bulunduğu Kat
        </label>
        <input
          type="number"
          name="floor"
          placeholder="4"
          value={formik.values.floor ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>
      {/* Total Floors Capacity Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Toplam Kat Sayısı
        </label>
        <input
          type="number"
          name="totalFloors"
          placeholder="10"
          value={formik.values.totalFloors ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20"
        />
      </div>

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
