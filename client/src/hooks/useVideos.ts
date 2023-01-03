import { getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./useAuth";

const useVideos = () => {
  const { prime } = useAuth();
  const [adminPrimeVideos, setAdminPrimeVideos] = useState<[]>([]);
  const [adminNoPrimeVideos, setAdminNoPrimeVideos] = useState<[]>([]);
  const [primeLoading, setPrimeLoading] = useState<boolean>(false);
  const [noPrimeLoading, setNoPrimeLoading] = useState<boolean>(false);

  useEffect(() => {
    const q = query(collection(db, "videos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const videos: any = [];
      querySnapshot.forEach((doc) => {
        videos.push({
          id: doc.id,
          name: doc.data().name,
          fileName: doc.data().fileName,
        });
      });
      setAdminNoPrimeVideos(videos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!prime) return;
    const q = query(collection(db, "primevideos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const videos: any = [];
      querySnapshot.forEach((doc) => {
        videos.push({
          id: doc.id,
          name: doc.data().name,
          fileName: doc.data().fileName,
        });
      });
      setAdminPrimeVideos(videos);
    });

    return () => unsubscribe();
  }, [prime]);

  const getPrimeVideos = useCallback(async () => {
    setPrimeLoading(true);
    const newArr: any = [];

    getDocs(collection(db, "primevideos"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          newArr.push({ id: doc.id, data: doc.data() });
        });
      })
      .catch((e) => console.log(e))
      .finally(() => setPrimeLoading(false));

    return newArr;
  }, []);

  const getNoPrimeVideos = useCallback(async () => {
    setNoPrimeLoading(true);
    const newArr: any = [];
    getDocs(collection(db, "videos"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          newArr.push({ id: doc.id, data: doc.data() });
        });
      })
      .catch((e) => console.log(e))
      .finally(() => setNoPrimeLoading(false));

    return newArr;
  }, []);

  return {
    getNoPrimeVideos,
    primeLoading,
    getPrimeVideos,
    noPrimeLoading,
    adminPrimeVideos,
    adminNoPrimeVideos,
  };
};

export default useVideos;
