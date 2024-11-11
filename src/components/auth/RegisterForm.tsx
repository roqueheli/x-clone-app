"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

type FormData = {
  username: string;
  password: string;
  name: string;
  photoUrl: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    name: yup.string().required(),
    photoUrl: yup.string().required(),
  })
  .required();

const RegisterForm = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
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
          fieldName="name"
          label="Tu nombre:"
          placeholder="Anakin Skywalker"
          styles={""}
        />
        <InputField
          type="text"
          fieldName="username"
          label="Nombre de usuario:"
          placeholder="anakin"
          styles={"mt-4"}
        />
        <InputField
          type="text"
          fieldName="photoUrl"
          label="La URL de tu foto de perfil:"
          placeholder="https://www..."
          styles={"mt-4"}
        />
        <InputField
          type="password"
          fieldName="password"
          label="Contraseña:"
          styles={"mt-4"}
        />
        <SubmitButton
          label={"Crear cuenta"}
          onSubmit={onSubmit}
          styles={"mt-2"}
        />
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
