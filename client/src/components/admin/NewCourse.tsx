import Button from "@mui/material/Button/Button";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";

interface NewCourseProps {
  fetchCourses: (isFirstLoad: boolean) => Promise<void>;
}

const NewCourse: React.FC<NewCourseProps> = ({ fetchCourses }) => {
  const [courseName, setCourseName] = useState<string>("");
  const { createNewCourse, isLoading } = useAdmin();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await createNewCourse(courseName);
    fetchCourses(false);
  };
  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <h2
        style={{ textAlign: "center", color: "#1976d2", margin: "0 0 20px 0" }}
      >
        Новый курс
      </h2>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <FormGroup>
          <TextField
            id="outlined-basic"
            label="courseName"
            variant="outlined"
            type="text"
            size="small"
            value={courseName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourseName(e.target.value)
            }
          />
          {!isLoading ? (
            <Button
              variant="contained"
              type="submit"
              style={{ width: "100%", marginTop: "10px" }}
            >
              Создать
            </Button>
          ) : (
            <div className="FlexJustifyCentr">
              <Loader />
            </div>
          )}
        </FormGroup>
      </form>
    </Paper>
  );
};

export default NewCourse;
