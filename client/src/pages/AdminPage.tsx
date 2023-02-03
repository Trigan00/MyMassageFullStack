import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import AddVideo from "../components/admin/AddVideo";
import Courses from "../components/admin/Courses";
import DeleteVideo from "../components/admin/DeleteVideo";
import Description from "../components/admin/Description";
import NewCourse from "../components/admin/NewCourse";
import useVideos, { Course, Video } from "../hooks/useVideos";

const AdminPage: React.FC = () => {
  const [courses, setCoursees] = useState<Course[]>([]);
  const { getVideos, isVideosLoading, getCourses, isCoursesLoading } =
    useVideos();
  const [courseName, setCourseName] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isNewCourse, setIsNewCourse] = useState<boolean>(false);
  const [shortDescription, setShortDescription] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<{ shortDesc: string }>({
    shortDesc: "",
  });

  const fetchVideos = useCallback(
    async (name: string) => {
      const videos: Video[] | void = await getVideos(name);
      if (videos) setVideos(videos);
    },
    [getVideos]
  );
  const fetchCourses = useCallback(
    async (isFirstLoad: boolean) => {
      const courses: Course[] | void = await getCourses();
      if (courses) {
        setCoursees(courses);
        if (courses.length > 0 && isFirstLoad) {
          setCourseName(courses[0].name);
          fetchVideos(courses[0].name);
        }
      }
    },
    [getCourses, fetchVideos]
  );

  useEffect(() => {
    fetchCourses(true);
  }, [fetchCourses]);

  useEffect(() => {
    if (courseName) {
      const courseIndex = courses.findIndex((el) => el.name === courseName);
      const shortDescription = courses[courseIndex].shortDescription || "";
      setShortDescription(shortDescription);
      setDefaultValue({ shortDesc: shortDescription });
    }
  }, [courseName, courses]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#1976d2",
          margin: "0 0 20px 0",
        }}
      >
        {courseName}
      </h1>
      <div style={{ display: "flex" }}>
        <Courses
          setCourseName={setCourseName}
          courseName={courseName}
          coursesArr={courses}
          setIsNewCourse={setIsNewCourse}
          fetchVideos={fetchVideos}
          isCoursesLoading={isCoursesLoading}
          // fetchCourses={fetchCourses}
        />
        <div style={{ width: "100%" }}>
          {isNewCourse || !courses.length ? (
            <NewCourse fetchCourses={fetchCourses} />
          ) : (
            <>
              <AddVideo courseName={courseName} fetchVideos={fetchVideos} />
              <DeleteVideo
                courseName={courseName}
                videos={videos}
                isLoading={isVideosLoading || isCoursesLoading}
                fetchVideos={fetchVideos}
              />
              <Description
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
                defaultValue={defaultValue}
                courseID={
                  courses[courses.findIndex((el) => el.name === courseName)].id
                }
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminPage;
