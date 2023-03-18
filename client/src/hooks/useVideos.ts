import { getDocs, collection } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase";

export type Video = {
  id: string;
  name: string;
  fileName: string;
  description: string;
  timeStamp: number;
};
export type Course = {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  pictureUrl: string;
};

const useVideos = () => {
  const [isVideosLoading, SetIsVideosLoading] = useState<boolean>(false);
  const [isCoursesLoading, SetIsCoursesLoading] = useState<boolean>(false);

  const getVideos = useCallback(
    async (category: string): Promise<void | Video[]> => {
      try {
        SetIsVideosLoading(true);
        const data = await getDocs(collection(db, category));
        const videos: Video[] = [];
        data.forEach((doc) => {
          const videoData = doc.data();
          videos.push({
            id: doc.id,
            name: videoData.name,
            fileName: videoData.fileName,
            description: videoData.description,
            timeStamp: videoData.timeStamp,
          });
        });
        SetIsVideosLoading(false);
        return videos.sort((a, b) => b.timeStamp - a.timeStamp);
      } catch (error) {
        SetIsVideosLoading(false);

        console.log(error);
      }
    },
    []
  );
  const getCourses = useCallback(async (): Promise<void | Course[]> => {
    try {
      SetIsCoursesLoading(true);
      const data = await getDocs(collection(db, "courses"));
      const courses: Course[] = [];
      data.forEach((doc) => {
        const courseData = doc.data();
        courses.push({
          id: doc.id,
          name: courseData.name,
          price: courseData.price,
          shortDescription: courseData.shortDescription,
          fullDescription: courseData.fullDescription,
          pictureUrl: courseData.pictureUrl,
        });
      });
      SetIsCoursesLoading(false);
      return courses;
    } catch (error) {
      SetIsCoursesLoading(false);

      console.log(error);
    }
  }, []);

  return {
    isVideosLoading: isVideosLoading,
    getVideos,
    isCoursesLoading: isCoursesLoading,
    getCourses,
  };
};

export default useVideos;
