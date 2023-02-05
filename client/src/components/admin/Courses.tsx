import { Button, Card, Icon } from "@mui/material";
import Paper from "@mui/material/Paper/Paper";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { Course } from "../../hooks/useVideos";
import Loader from "../../UI/Loader";
import MyModal from "../../UI/MyModal";

interface CoursesProps {
  courseName: string;
  setCourseName: React.Dispatch<React.SetStateAction<string>>;
  coursesArr: Course[];
  setIsNewCourse: React.Dispatch<React.SetStateAction<boolean>>;
  fetchVideos: (name: string) => Promise<void>;
  isCoursesLoading: boolean;
  // fetchCourses: (isFirstLoad: boolean) => Promise<void>;
}

const Courses: React.FC<CoursesProps> = ({
  courseName,
  setCourseName,
  coursesArr,
  setIsNewCourse,
  fetchVideos,
  isCoursesLoading,
  // fetchCourses,
}) => {
  const { deleteCourse, isLoading } = useAdmin();
  const [modalInfo, setModalInfo] = useState<{
    isModalOpen: boolean;
    modalName: string;
    deleteIsActive: boolean;
    data: {};
  }>({ isModalOpen: false, modalName: "", deleteIsActive: false, data: {} });

  const deleteCourseHandler = async ({ name }: { name: string }) => {
    await deleteCourse(name);
  };

  return (
    <Paper elevation={3} className="AdminCourses">
      <h3 style={{ textAlign: "center" }}>Курсы</h3>
      {!isCoursesLoading || !isLoading ? (
        coursesArr.map(({ name, id }) => (
          <div
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Card
              variant="outlined"
              style={{
                padding: "5px",
                cursor: "pointer",
                color: name === courseName ? "blue" : "black",
                marginBottom: "10px",
                width: "100%",
              }}
              onClick={() => {
                setCourseName(name);
                setIsNewCourse(false);
                fetchVideos(name);
              }}
            >
              {name}
            </Card>
            <Icon
              style={{ marginTop: "5px", color: "#757575", cursor: "pointer" }}
              onClick={() =>
                setModalInfo({
                  isModalOpen: true,
                  modalName: name,
                  deleteIsActive: false,
                  data: {
                    name: name,
                  },
                })
              }
            >
              delete
            </Icon>
          </div>
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

      <MyModal
        type="Курс"
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        onDelete={deleteCourseHandler}
      />
    </Paper>
  );
};

export default Courses;
