import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { errorsTypes, firebaseErrors } from "../utils/firebaseErrors";
import Loader from "./Loader";

interface FormProps {
  isSignUp: boolean;
  title: string;
  isLoading: boolean;
  error: string;
  onSubmit: (email: string, password: string, username?: string) => void;
}

const Form: React.FC<FormProps> = ({
  isSignUp,
  title,
  isLoading,
  error,
  onSubmit,
}) => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [username, setUsername] = useState<string>("");
  const [confirmPassword, setCofirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });
  const [usernameErorr, setUsernameErorr] = useState("");

  useEffect(() => {
    //Доработать, показывать общую ошибку (просто e)
    if (error) {
      if (error.indexOf("password") > 0)
        setErrorMsg({
          email: "",
          password: firebaseErrors[error as keyof errorsTypes],
        });
      else
        setErrorMsg({
          email: firebaseErrors[error as keyof errorsTypes],
          password: "",
        });
    }
  }, [error]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg({ email: "", password: "" });
    setUsernameErorr("");
    setConfirmPasswordError("");
    if (!form.email.trim().length || !form.password.trim().length) {
      if (!username.trim().length) {
        setUsernameErorr("Поле не должно быть пустым");
      }
      setErrorMsg({
        email: form.email.trim() ? "" : "Поле не должно быть пустым",
        password: form.password.trim() ? "" : "Поле не должно быть пустым",
      });
      return;
    }
    if (isSignUp) {
      if (form.password !== confirmPassword) {
        return setConfirmPasswordError("Пароли не совпадают");
      }

      return onSubmit(form.email, form.password, username);
    }

    onSubmit(form.email, form.password);
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isSignUp && (
        <>
          <TextField
            label="Имя пользователя"
            variant="filled"
            margin="normal"
            error={!!usernameErorr}
            helperText={usernameErorr}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </>
      )}

      <TextField
        label="Email"
        variant="filled"
        margin="normal"
        error={!!errorMsg.email}
        helperText={errorMsg.email}
        name="email"
        value={form.email}
        onChange={changeHandler}
        type="email"
      />
      <TextField
        label="Пароль"
        variant="filled"
        margin="normal"
        error={!!errorMsg.password}
        helperText={errorMsg.password}
        name="password"
        value={form.password}
        onChange={changeHandler}
        type="password"
      />

      {isSignUp && (
        <>
          <TextField
            label="Подтвердите пароль"
            variant="filled"
            margin="normal"
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            name="password"
            value={confirmPassword}
            onChange={(e) => setCofirmPassword(e.target.value)}
            type="password"
          />
        </>
      )}

      {isLoading ? (
        <Loader color="#1976d2" />
      ) : (
        <Button variant="contained" type="submit" disabled={isLoading}>
          {title}
        </Button>
      )}
    </form>
  );
};

export default Form;
