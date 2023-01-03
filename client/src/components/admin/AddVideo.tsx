import {
  Button,
  Card,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { setAlert } from "../../store/slices/alertSlice";
import Loader from "../../UI/Loader";

const AddVideo: React.FC = () => {
  const { uploadFiles, isLoading } = useAdmin();
  const [name, setName] = useState<string>("");
  const [prime, setPrime] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useTypedDispatch();

  const onDeleteHandler = () => {
    const input = document.getElementById("upload-file") as HTMLInputElement;

    if (input.value) {
      input.value = "";
      setFileName("Файл не выбран");
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const file = e.target[2].files[0];
    if (!file) {
      dispatch(
        setAlert({
          severity: "error",
          message: "Файл не выбран",
        })
      );
      return;
    }
    uploadFiles(file, name, prime ? "primevideos" : "videos");
  };

  return (
    <Card style={{ padding: "15px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Добавить видео</DialogTitle>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <FormGroup>
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            type="text"
            size="small"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <label
            htmlFor="upload-file"
            className="FlexAlignCentr"
            style={{
              marginTop: "10px",

              justifyContent: "space-between",
            }}
          >
            <input
              id="upload-file"
              type="file"
              accept=".mp4"
              style={{ display: "none" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFileName(e.target.value)
              }
            />
            <span style={{ color: "#7f8486", fontSize: "0.9em" }}>
              {fileName ? fileName : "Файл не выбран"}
            </span>
            <div>
              <Button
                size="small"
                component="span"
                variant="contained"
                style={{ marginRight: "10px" }}
              >
                Добавить файл
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={onDeleteHandler}
              >
                удалить
              </Button>
            </div>
          </label>

          <FormControlLabel
            control={
              <Switch
                checked={prime}
                onChange={() => setPrime((prev) => !prev)}
              />
            }
            label="Prime"
          />
          {!isLoading ? (
            <Button variant="contained" type="submit">
              Отправить
            </Button>
          ) : (
            <Loader color="#1976d2" />
          )}
        </FormGroup>
      </form>
    </Card>
  );
};

export default AddVideo;
