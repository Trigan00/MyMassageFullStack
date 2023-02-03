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

  const { createNewCourse, isLoading } = useAdmin();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await createNewCourse(courseName, +coursePrice, shortDescription);
    fetchCourses(false);
  };
  return (
    <>
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
        <form encType="multipart/form-data">
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
        </form>
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

      {!isLoading ? (
        <Button
          variant="contained"
          onClick={onSubmit}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Создать
        </Button>
      ) : (
        <div className="FlexJustifyCentr">
          <Loader />
        </div>
      )}
    </>
  );
};

export default NewCourse;
