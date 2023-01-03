import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../UI/Form";
import { firebaseErrors, errorsTypes } from "../utils/firebaseErrors";
import { useNavigate } from "react-router-dom";
import { consts } from "../utils/routsConsts";

const Login: React.FC = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const navigate = useNavigate();

  const loginHandler = (email: string, password: string) => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      return setErrorMsg({
        email: email.trim() ? "" : "Поле не должно быть пустым",
        password: password.trim() ? "" : "Поле не должно быть пустым",
      });
    }

    setloading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate(consts.HOME_ROUTE))
      .catch((error) => {
        //Доработать, показывать общую ошибку (просто e)
        const e: string = error.code;
        if (e.indexOf("password") > 0)
          setErrorMsg({
            email: "",
            password: firebaseErrors[e as keyof errorsTypes],
          });
        else
          setErrorMsg({
            email: firebaseErrors[e as keyof errorsTypes],
            password: "",
          });
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
      errorMsg={errorMsg}
    />
  );
};

export default Login;
