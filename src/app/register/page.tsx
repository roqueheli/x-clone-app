import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";

type FormData = {
  username: string;
  password: string;
}

const Register = () => {
  
  return (
    <div className="flex items-center w-full flex-col">
      <h2 className="mb-4">Crea tu cuenta en la red social</h2>
      <RegisterForm />
    </div>
  );
};

export default Register;
