import React from "react";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {

  return (
    <div className="flex items-center w-full flex-col">
      <h2 className="mb-4">Iniciar sesión en la red social</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
