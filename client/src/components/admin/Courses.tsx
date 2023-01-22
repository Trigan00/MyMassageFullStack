import { Button, Card } from "@mui/material";
import Paper from "@mui/material/Paper/Paper";
import React from "react";
import { Course } from "../../hooks/useVideos";
import Loader from "../../UI/Loader";

interface CoursesProps {
  courseName: string;
  setCourseName: React.Dispatch<React.SetStateAction<string>>;
  coursesArr: Course[];
  setIsNewCourse: React.Dispatch<React.SetStateAction<boolean>>;
  fetchVideos: (name: string) => Promise<void>;
  isCoursesLoading: boolean;
}

const Courses: React.FC<CoursesProps> = ({
  courseName,
  setCourseName,
  coursesArr,
  setIsNewCourse,
  fetchVideos,
  isCoursesLoading,
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: "270px",
        width: "100%",
        marginRight: "20px",
        padding: " 0 10px",
        height: "fit-content",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Курсы</h3>
      {!isCoursesLoading ? (
        coursesArr.map(({ name, id }) => (
          <Card
            variant="outlined"
            key={id}
            style={{
              padding: "5px",
              cursor: "pointer",
              color: name === courseName ? "blue" : "black",
              marginBottom: "10px",
            }}
            onClick={() => {
              setCourseName(name);
              setIsNewCourse(false);
              fetchVideos(name);
            }}
          >
            {name}
          </Card>
        ))
      ) : (
        <div className="FlexJustifyCentr">
          <Loader />
        </div>
      )}

      <Button
        variant="contained"
        style={{ width: "100%", margin: "10px 0" }}
        onClick={() => setIsNewCourse(true)}
      >
        Создать курс
      </Button>
    </Paper>
  );
};

export default Courses;
