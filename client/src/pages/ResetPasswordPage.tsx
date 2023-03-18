import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Loader from "../UI/Loader";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { Container } from "react-bootstrap";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const dispatch = useTypedDispatch();

  const resetPassword = () => {
    setisLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(
          setAlert({
            severity: "success",
            message: "Ссылка на сброс пароля отправлена на вашу почту",
          })
        );
      })
      .catch((error) => {
        console.log("errorCode: " + error.code);
        console.log("errorMessage: " + error.message);
        dispatch(
          setAlert({
            severity: "error",
            message: error.code,
          })
        );
      })
      .finally(() => setisLoading(false));
  };

  return (
    <Container>
      <Card
        sx={{
          maxWidth: "500px",
          w: "100%",
          m: "40px auto 0 auto",
          p: "10px",
          boxSizing: "border-box",
        }}
      >
        <TextField
          label="Email"
          variant="filled"
          margin="normal"
          // error={!!errorMsg.email}
          // helperText={errorMsg.email}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          sx={{
            width: "100%",
          }}
        />
        {isLoading ? (
          <div className="FlexJustifyCentr">
            <Loader />
          </div>
        ) : (
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            onClick={resetPassword}
            sx={{ width: "100%" }}
          >
            Сбросить
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default ResetPasswordPage;
