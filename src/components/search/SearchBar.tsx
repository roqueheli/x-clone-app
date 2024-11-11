"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

type SearchBarProps = {
  query: string;
};

const SearchBar = ({ query }: SearchBarProps) => {
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {};

  return (
    <div className="flex w-full">
        <FormProvider {...methods}>
            <form className="flex items-center w-full" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                type="text"
                fieldName="query"
                placeholder="Buscar por #fuerza, #jedi..."
                styles="mt-2 w-full"
                />
                <SubmitButton
                label={"Buscar"}
                onSubmit={onSubmit}
                styles={""}
                />
            </form>
        </FormProvider>
    </div>
  );
};

export default SearchBar;
