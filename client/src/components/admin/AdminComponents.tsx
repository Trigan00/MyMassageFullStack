import React from "react";
import { Course, Video } from "../../hooks/useVideos";
import AddVideo from "./AddVideo";
import Comments from "./Comments";
import DeleteVideo from "./DeleteVideo";
import EditCourse from "./EditCourse";
import NewCourse from "./NewCourse";

interface AdminComponentsProps {
  isNewCourse: boolean;
  courses: Course[];
  fetchCourses: (isFirstLoad: boolean) => Promise<void>;
  courseInfo: Course | null;
  fetchVideos: (name: string) => Promise<void>;
  courseName: string;
  videos: Video[];
  isVideosLoading: boolean;
  isCoursesLoading: boolean;
  commentsVideo: string;
  setCommentsVideo: React.Dispatch<React.SetStateAction<string>>;
}

const AdminComponents: React.FC<AdminComponentsProps> = ({
  isNewCourse,
  courses,
  fetchCourses,
  courseInfo,
  fetchVideos,
  courseName,
  videos,
  isVideosLoading,
  isCoursesLoading,
  commentsVideo,
  setCommentsVideo,
}) => {
  if (isNewCourse || !courses.length)
    return <NewCourse fetchCourses={fetchCourses} />;

  if (courseInfo) return <EditCourse courseInfo={courseInfo} />;

  if (commentsVideo)
    return <Comments commentsVideo={commentsVideo} courseName={courseName} />;

  return (
    <>
      <AddVideo courseName={courseName} fetchVideos={fetchVideos} />
      <DeleteVideo
        courseName={courseName}
        videos={videos}
        isLoading={isVideosLoading || isCoursesLoading}
        fetchVideos={fetchVideos}
        setCommentsVideo={setCommentsVideo}
      />
    </>
  );
};

export default AdminComponents;
