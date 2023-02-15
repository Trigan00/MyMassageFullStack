import Button from "@mui/material/Button/Button";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";
import TextEditor from "./TextEditor";

interface NewCourseProps {
  fetchCourses: (isFirstLoad: boolean) => Promise<void>;
}

const NewCourse: React.FC<NewCourseProps> = ({ fetchCourses }) => {
  const [courseName, setCourseName] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [fullDescription, setFullDescription] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const { createNewCourse, isLoading } = useAdmin();

  const onSubmit = async (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();
    const file = e.target[4].files[0];
    await createNewCourse(
      courseName,
      +coursePrice,
      shortDescription,
      fullDescription,
      file
    );
    fetchCourses(false);
  };
  return (
    <form encType="multipart/form-data" onSubmit={onSubmit}>
      <Paper elevation={3} style={{ padding: "15px" }}>
        <DialogTitle
          style={{
            textAlign: "center",
            color: "#1976d2",
            margin: "0 0 20px 0",
          }}
        >
          Новый курс
        </DialogTitle>
        <FormGroup>
          <TextField
            id="name"
            label="название курса"
            variant="outlined"
            type="text"
            size="small"
            margin="normal"
            value={courseName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourseName(e.target.value)
            }
          />
          <TextField
            id="price"
            label="цена"
            variant="outlined"
            type="number"
            size="small"
            margin="normal"
            value={coursePrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCoursePrice(e.target.value)
            }
          />
        </FormGroup>
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
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFileName(e.target.value)
            }
          />
          <span style={{ color: "#7f8486", fontSize: "0.9em" }}>
            {fileName ? fileName : "Файл не выбран"}
          </span>

          <Button
            size="small"
            component="span"
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Добавить изображение
          </Button>
        </label>
      </Paper>
      <Paper elevation={3} sx={{ mt: "20px", p: "15px" }}>
        <DialogTitle
          style={{
            textAlign: "center",
            color: "#1976d2",
            margin: "0 0 20px 0",
          }}
        >
          Краткое описание
        </DialogTitle>
        <TextEditor text={shortDescription} setText={setShortDescription} />
      </Paper>
      <Paper elevation={3} sx={{ mt: "20px", p: "15px" }}>
        <DialogTitle
          style={{
            textAlign: "center",
            color: "#1976d2",
            margin: "0 0 20px 0",
          }}
        >
          Полное описание
        </DialogTitle>
        <TextEditor text={fullDescription} setText={setFullDescription} />
      </Paper>

      {!isLoading ? (
        <Button
          variant="contained"
          type="submit"
          // onClick={onSubmit}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Создать
        </Button>
      ) : (
        <div className="FlexJustifyCentr">
          <Loader />
        </div>
      )}
    </form>
  );
};

export default NewCourse;
