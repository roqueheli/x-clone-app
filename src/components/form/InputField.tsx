import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  type: "text" | "password";
  label?: string;
  fieldName: string;
  placeholder?: string;
  styles?: string;
};

const InputField = <T extends FieldValues>({ type, fieldName, label, placeholder, styles, }: InputFieldProps<T>) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={`flex flex-col ${styles ?? ""}`}>
      <label>{label}</label>
      <input
        {...register(fieldName)}
        className="p-2 mb-2 rounded bg-gray-50 border border-gray-200"
        type={type}
        placeholder={placeholder}
      />
      {errors?.[fieldName] && (
        <div className="text-red-600 mb-4">Este campo es obligatorio</div>
      )}
    </div>
  );
};

export default InputField;
