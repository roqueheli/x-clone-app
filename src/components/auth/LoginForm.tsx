"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

type FormData = {
  username: string;
  password: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          fieldName="username"
          label="Nombre de usuario:"
          placeholder="Anakin Skywalker"
        />
        <InputField
          type="password"
          fieldName="password"
          label="Contraseña:"
          styles={"mt-4"}
        />
        <SubmitButton
          label={"Iniciar sesión"}
          onSubmit={onSubmit}
          styles={"mt-2"}
        />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
