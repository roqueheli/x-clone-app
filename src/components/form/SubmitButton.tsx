import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";

type SubmitButtonProps<T extends FieldValues> = {
  label: string;
  styles?: string;
  onSubmit: (data: T) => void;
};

const SubmitButton = <T extends FieldValues>({
  label,
  styles,
  onSubmit,
}: SubmitButtonProps<T>) => {
  const { handleSubmit } = useFormContext<T>();

  return (
    <div className={`${styles ?? ""}`}>
      <button
        type="submit"
        className="button-primary"
        onClick={handleSubmit(onSubmit)}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
