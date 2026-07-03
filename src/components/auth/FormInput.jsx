import React from "react";
import { useState } from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  formikProps,
  required = false,
  disabled = false,
}) => {
  const { values, errors, touched, handleChange, handleBlur } = formikProps;
  const hasError = touched[name] && errors[name];
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordType = type === "password"
  const computedType = isPasswordType ? (showPassword ? "text" : "password") : type
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </label>
      <div className="relative w-full">
        <input
          name={name}
          type={computedType}
          value={values[name] ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`input-premium ${hasError ? "border-red-500 focus:border-red-500" : ""}`}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-gold transition-colors duration-200 cursor-pointer p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye Slash Icon (Hide)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              // Eye Icon (Show)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
     
      {hasError && (
        <span className="text-[11px] text-red-500 font-light tracking-wide">
          {errors[name]}
        </span>
      )}
    </div>
  );
};

export default FormInput;
