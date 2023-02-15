import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import AddVideo from "../components/admin/AddVideo";
import Courses from "../components/admin/Courses";
import DeleteVideo from "../components/admin/DeleteVideo";
import EditCourse from "../components/admin/EditCourse";
import NewCourse from "../components/admin/NewCourse";
import useVideos, { Course, Video } from "../hooks/useVideos";

const AdminPage: React.FC = () => {
  const [courses, setCoursees] = useState<Course[]>([]);
  const { getVideos, isVideosLoading, getCourses, isCoursesLoading } =
    useVideos();
  const [courseName, setCourseName] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isNewCourse, setIsNewCourse] = useState<boolean>(false);
  const [courseInfo, setCourseInfo] = useState<Course | null>(null);

  const onEditCourse = (course: Course | null) => {
    setCourseInfo(course);
  };

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

  return (
    <Container sx={{ mt: "20px", mb: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#1976d2",
          margin: "0 0 20px 0",
        }}
      >
        {courseName}
      </h1>
      <div className="AdminPageWrapper">
        <Courses
          setCourseName={setCourseName}
          courseName={courseName}
          coursesArr={courses}
          setIsNewCourse={setIsNewCourse}
          fetchVideos={fetchVideos}
          isCoursesLoading={isCoursesLoading}
          onEditCourse={onEditCourse}
          // fetchCourses={fetchCourses}
        />
        <div style={{ width: "100%" }}>
          {isNewCourse || !courses.length ? (
            <NewCourse fetchCourses={fetchCourses} />
          ) : courseInfo ? (
            <EditCourse courseInfo={courseInfo} />
          ) : (
            <>
              <AddVideo courseName={courseName} fetchVideos={fetchVideos} />
              <DeleteVideo
                courseName={courseName}
                videos={videos}
                isLoading={isVideosLoading || isCoursesLoading}
                fetchVideos={fetchVideos}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminPage;
