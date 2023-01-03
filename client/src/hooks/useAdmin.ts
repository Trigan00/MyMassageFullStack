import axios from "axios";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
// import { fetchVideos } from "../store/asyncActions";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { useAuth } from "./useAuth";

const useAdmin = () => {
  const { token } = useAuth();
  const dispatch = useTypedDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const uploadFiles = async (
    file: any,
    inputName: string,
    collectionName: string
  ) => {
    try {
      setIsLoading(true);
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/admin/uploadFile`,
        data,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      if (res) {
        addDoc(collection(db, collectionName), {
          name: inputName,
          fileName: res.data.info.Key,
          url: res.data.info.Location,
        })
          .then(() => {
            dispatch(
              setAlert({
                severity: "success",
                message: "Файл успешно добавлен",
              })
            );
          })
          .catch((e) => {
            console.log(e);
            dispatch(
              setAlert({
                severity: "error",
                message: "Что-то пошло не так, попробуйте еще раз",
              })
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
    }
  };

  const deleteFiles = async (
    fileName: string,
    category: string,
    id: string
  ) => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/deleteFile`,
        { fileName },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      if (res) {
        deleteDoc(doc(db, category, id))
          .then()
          .catch((e) => {
            console.log(e);
            dispatch(
              setAlert({
                severity: "error",
                message: "Что-то пошло не так, попробуйте еще раз",
              })
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
      return;
    }
  };

  return { uploadFiles, deleteFiles, isLoading };
};

export default useAdmin;
