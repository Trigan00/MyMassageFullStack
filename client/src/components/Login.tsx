import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../UI/Form";
import { useNavigate } from "react-router-dom";
import { consts } from "../utils/routsConsts";

const Login: React.FC = () => {
  const [loading, setloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const loginHandler = (email: string, password: string) => {
    setloading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate(consts.HOME_ROUTE))
      .catch((error) => {
        setError(error.code);
      })
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <Form
      isSignUp={false}
      onSubmit={loginHandler}
      isLoading={loading}
      title={"Войти"}
      error={error}
    />
  );
};

export default Login;
