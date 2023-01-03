import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Loader from "./Loader";

interface FormProps {
  isSignUp: boolean;
  title: string;
  isLoading: boolean;
  errorMsg: { email: string; password: string };
  onSubmit: (email: string, password: string) => void;
}

const Form: React.FC<FormProps> = ({
  isSignUp,
  title,
  isLoading,
  errorMsg,
  onSubmit,
}) => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [confirmPassword, setCofirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp && form.password !== confirmPassword) {
      return setConfirmPasswordError("Пароли не совпадают");
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
      <TextField
        id="filled-basic"
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
        id="filled-basic_2"
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
            id="filled-basic_3"
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
