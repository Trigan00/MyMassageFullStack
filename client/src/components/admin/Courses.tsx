import { Button, Card, Icon } from "@mui/material";
import Paper from "@mui/material/Paper/Paper";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { Course } from "../../hooks/useVideos";
import Loader from "../../UI/Loader";
import DeleteModal from "../../UI/DeleteModal";

interface CoursesProps {
  courseName: string;
  setCourseName: React.Dispatch<React.SetStateAction<string>>;
  coursesArr: Course[];
  setIsNewCourse: React.Dispatch<React.SetStateAction<boolean>>;
  fetchVideos: (name: string) => Promise<void>;
  isCoursesLoading: boolean;
  onEditCourse: (course: Course | null) => void;
  setCommentsVideo: React.Dispatch<React.SetStateAction<string>>;
}

const Courses: React.FC<CoursesProps> = ({
  courseName,
  setCourseName,
  coursesArr,
  setIsNewCourse,
  fetchVideos,
  isCoursesLoading,
  onEditCourse,
  setCommentsVideo,
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
        coursesArr.map((course) => (
          <div
            key={course.id}
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
                color: course.name === courseName ? "blue" : "black",
                marginBottom: "10px",
                width: "100%",
              }}
              onClick={() => {
                setCourseName(course.name);
                setIsNewCourse(false);
                fetchVideos(course.name);
                onEditCourse(null);
                setCommentsVideo("");
              }}
            >
              {course.name}
            </Card>
            <div
              style={{
                display: "flex",
                marginTop: "5px",
                color: "#757575",
              }}
            >
              <Icon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCourseName(course.name);
                  onEditCourse(course);
                }}
              >
                edit
              </Icon>
              <Icon
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  setModalInfo({
                    isModalOpen: true,
                    modalName: course.name,
                    deleteIsActive: false,
                    data: {
                      name: course.name,
                    },
                  })
                }
              >
                delete
              </Icon>
            </div>
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

      <DeleteModal
        type="Курс"
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        onDelete={deleteCourseHandler}
      />
    </Paper>
  );
};

export default Courses;
