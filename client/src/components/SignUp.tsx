import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import Form from "../UI/Form";
import { firebaseErrors, errorsTypes } from "../utils/firebaseErrors";

import { useNavigate } from "react-router-dom";
import { consts } from "../utils/routsConsts";
import { useHttp } from "../hooks/useHttp";

const SignUp: React.FC = () => {
  const { request } = useHttp();
  const [loading, setloading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const navigate = useNavigate();

  const registerHandler = (email: string, password: string) => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      return setErrorMsg({
        email: email.trim() ? "" : "Поле не должно быть пустым",
        password: password.trim() ? "" : "Поле не должно быть пустым",
      });
    }
    setloading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        try {
          const res = await request(
            `${process.env.REACT_APP_SERVERURL}/api/auth/addUser`,
            "POST",
            {
              id: cred.user.uid,
              email,
            }
          );
          if (res) sendEmailVerification(cred.user);
        } catch (e) {
          console.log(e);
        }
      })
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
      isSignUp={true}
      onSubmit={registerHandler}
      isLoading={loading}
      title={"Зарегистрироваться"}
      errorMsg={errorMsg}
    />
  );
};

export default SignUp;
