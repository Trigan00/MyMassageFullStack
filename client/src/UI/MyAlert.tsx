import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { removeAlert } from "../store/slices/alertSlice";

interface AlertProps {
  message: string | null;
  open: boolean;
  severity: AlertColor | undefined;
}

const MyAlert: React.FC<AlertProps> = ({ message, open, severity }) => {
  const dispatch = useTypedDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeAlert());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
