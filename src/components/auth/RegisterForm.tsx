"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import RegisterScheme from "../../schemes/register.scheme";
import authAPI from "../../service/auth/auth.api";
import {
  ConflictError
} from "../../service/common/http.errors";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

type FormData = {
  name: string;
  username: string;
  password: string;
  photoUrl: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: yupResolver(RegisterScheme) as Resolver<FormData>,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      await authAPI.register(data.username, data.password, data.name, data.photoUrl);
      router.push("/");
      router.refresh();
      setServerError(null);
    } catch (error) {
      if (error instanceof ConflictError) {
        setServerError("Username is already taken.");
      } else {
        setServerError("An error ocurred, try again later");
      }
    }
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
        />
        <InputField
          type="password"
          fieldName="password"
          label="Contraseña:"
          styles={"mt-4"}
          placeholder="********"
        />
        <InputField
          type="text"
          fieldName="photoUrl"
          label="La URL de tu foto de perfil:"
          placeholder="https://www..."
          styles={"mt-4"}
        />
        <SubmitButton
          label={"Registrarme"}
          onSubmit={onSubmit}
          styles={"mt-2"}
        />
        {serverError && <div className="mt-4 text-red-600">{serverError}</div>}
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
