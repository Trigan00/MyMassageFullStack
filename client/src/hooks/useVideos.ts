import {
  getDocs,
  collection /* , onSnapshot, query  */,
} from "firebase/firestore";
import { useCallback, /* useEffect, */ useState } from "react";
import { db } from "../firebase";
// import { useAuth } from "./useAuth";

export type Video = {
  id: string;
  name: string;
  fileName: string;
};
export type Course = {
  id: string;
  name: string;
};

const useVideos = () => {
  // const { prime } = useAuth();
  // const [adminPrimeVideos, setAdminPrimeVideos] = useState<[]>([]);
  // const [adminNoPrimeVideos, setAdminNoPrimeVideos] = useState<[]>([]);
  // const [primeLoading, setPrimeLoading] = useState<boolean>(false);
  // const [noPrimeLoading, setNoPrimeLoading] = useState<boolean>(false);

  const [isVideosLoading, SetIsVideosLoading] = useState<boolean>(false);
  const [isCoursesLoading, SetIsCoursesLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setNoPrimeLoading(true);
  //   const q = query(collection(db, "videos"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const videos: any = [];
  //     querySnapshot.forEach((doc) => {
  //       videos.push({
  //         id: doc.id,
  //         name: doc.data().name,
  //         fileName: doc.data().fileName,
  //       });
  //     });
  //     setAdminNoPrimeVideos(videos);
  //   });
  //   setNoPrimeLoading(false);
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   setPrimeLoading(true);
  //   if (!prime) return;
  //   const q = query(collection(db, "primevideos"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const videos: any = [];
  //     querySnapshot.forEach((doc) => {
  //       videos.push({
  //         id: doc.id,
  //         name: doc.data().name,
  //         fileName: doc.data().fileName,
  //       });
  //     });
  //     setAdminPrimeVideos(videos);
  //   });
  //   setPrimeLoading(false);
  //   return () => unsubscribe();
  // }, [prime]);

  // const getPrimeVideos = useCallback(async () => {
  //   setPrimeLoading(true);
  //   const newArr: any = [];

  //   getDocs(collection(db, "primevideos"))
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         newArr.push({
  //           id: doc.id,
  //           name: doc.data().name,
  //         });
  //       });
  //     })
  //     .catch((e) => console.log(e))
  //     .finally(() => setPrimeLoading(false));

  //   return newArr;
  // }, []);

  // const getNoPrimeVideos = useCallback(async () => {
  //   setNoPrimeLoading(true);
  //   const newArr: any = [];
  //   getDocs(collection(db, "videos"))
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         newArr.push({
  //           id: doc.id,
  //           name: doc.data().name,
  //         });
  //       });
  //     })
  //     .catch((e) => console.log(e))
  //     .finally(() => setNoPrimeLoading(false));

  //   return newArr;
  // }, []);

  const getVideos = useCallback(
    async (category: string): Promise<void | Video[]> => {
      try {
        SetIsVideosLoading(true);
        const data = await getDocs(collection(db, category));
        const videos: Video[] = [];
        data.forEach((doc) => {
          videos.push({
            id: doc.id,
            name: doc.data().name,
            fileName: doc.data().fileName,
          });
        });
        SetIsVideosLoading(false);
        return videos;
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
      const courses: { id: string; name: string }[] = [];
      data.forEach((doc) => {
        courses.push({
          id: doc.id,
          name: doc.data().name,
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
    // getNoPrimeVideos,
    // primeLoading,
    // getPrimeVideos,
    // noPrimeLoading,
    // adminPrimeVideos,
    // adminNoPrimeVideos,
    isVideosLoading: isVideosLoading,
    getVideos,
    isCoursesLoading: isCoursesLoading,
    getCourses,
  };
};

export default useVideos;
