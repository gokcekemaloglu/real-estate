import React from "react";

// Reusable atomic field component to abstract standard input template logic and errors smoothly
const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  formikProps,
}) => {
  const { values, errors, touched, handleChange, handleBlur } = formikProps;
  // Computes validation failure boundary condition to inject luxury red border accent
  const hasError = touched[name] && errors[name];
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        placeholder={placeholder}
        className={`input-premium ${hasError ? "border-red-500 focus:border-red-500" : ""}`}
      />
      {hasError && (
        <span className="text-[11px] text-red-500 font-light tracking-wide">
          {errors[name]}
        </span>
      )}
    </div>
  );
};

export default FormInput;
