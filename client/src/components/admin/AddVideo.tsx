import {
  Button,
  DialogTitle,
  FormGroup,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { setAlert } from "../../store/slices/alertSlice";
import Loader from "../../UI/Loader";
import TextEditor from "./TextEditor";

interface AddVideoProps {
  courseName: string;
  fetchVideos: (name: string) => Promise<void>;
}

const AddVideo: React.FC<AddVideoProps> = ({ courseName, fetchVideos }) => {
  const { uploadFiles, isLoading } = useAdmin();
  const [name, setName] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useTypedDispatch();
  const [description, setDescription] = useState<string>("");

  const onDeleteHandler = () => {
    const input = document.getElementById("upload-file") as HTMLInputElement;
    setName("");
    setDescription("");
    if (input.value) {
      input.value = "";
      setFileName("Файл не выбран");
    }
  };

  const onSubmit = async (e: { target: any; preventDefault: () => void }) => {
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
    await uploadFiles(file, name, courseName, description);
    fetchVideos(courseName);
  };

  return (
    <Paper elevation={3} sx={{ p: "15px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Добавить видео</DialogTitle>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <FormGroup>
          <TextField
            id="outlined-basic"
            label="название"
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
              accept="video/*"
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

          <div>
            <DialogTitle
              style={{
                // textAlign: "center",
                fontWeight: "normal",
                fontSize: "1rem",
                color: "#7f8486",
              }}
            >
              Описание
            </DialogTitle>
            <TextEditor text={description} setText={setDescription} />
          </div>

          <div style={{ marginTop: "10px" }}>
            {!isLoading ? (
              <Button
                variant="contained"
                type="submit"
                style={{ width: "100%" }}
              >
                Отправить
              </Button>
            ) : (
              <div className="FlexJustifyCentr">
                <Loader />
              </div>
            )}
          </div>
        </FormGroup>
      </form>
    </Paper>
  );
};

export default AddVideo;
