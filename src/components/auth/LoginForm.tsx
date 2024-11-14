"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import LoginScheme from "../../schemes/login.scheme";
import authAPI from "../../service/auth/auth.api";
import { AccesDeniedError } from "../../service/common/http.errors";
import InputField from "../form/InputField";
import SubmitButton from "../form/SubmitButton";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: yupResolver(LoginScheme) as Resolver<FormData>,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      await authAPI.login(data.username, data.password);      
      router.push("/");
      router.refresh();
      setServerError(null);
    } catch (error) {
      if (error instanceof AccesDeniedError){
        setServerError("No valid username-password pair or user is disabled.");
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
        <SubmitButton
          label={"Iniciar sesión"}
          onSubmit={onSubmit}
          styles={"mt-2"}
        />
        {serverError && <div className="mt-4 text-red-600">{serverError}</div>}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
