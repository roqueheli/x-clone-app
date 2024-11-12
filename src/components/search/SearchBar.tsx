"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";
import messageApi from "../../service/messages/messages.services";
import { useRouter } from "next/navigation";

type FormData = {
  query: string;
};

type SearchBarProps = {
  initialQuery: string;
};

const SearchBar = ({ initialQuery }: SearchBarProps) => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      query: initialQuery,
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue("query", initialQuery ?? "");
  }, [initialQuery, setValue]);

  const onSubmit = async (data: FormData) => {
    router.push(`/?query=${data.query ?? ""}&type=hash`);
  };

  return (
    <div className="flex w-full">
      <FormProvider {...methods}>
        <form
          className="flex items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            type="text"
            fieldName="query"
            placeholder="Buscar por #fuerza, #jedi..."
            styles="mt-2 w-full"
          />
          <SubmitButton label={"Buscar"} onSubmit={onSubmit} styles={""} />
        </form>
      </FormProvider>
    </div>
  );
};

export default SearchBar;
