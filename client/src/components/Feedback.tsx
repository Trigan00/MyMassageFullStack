import { Paper, DialogTitle, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import Loader from "../UI/Loader";

interface FeedbackProps {
  videoName: string;
  courseName: string;
}

const Feedback: React.FC<FeedbackProps> = ({ videoName, courseName }) => {
  const dispatch = useTypedDispatch();
  const { token, id, email, username } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [imgFileURL, setImgFileURL] = useState<string>("");
  const [data, setData] = useState<{
    message: string;
    imageURL: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const imgRef: any = useRef(null);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_SERVERURL}/api/courses/feedback`,
          {
            params: {
              courseName,
              videoName,
            },
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        if (res.data.data) {
          setData({
            message: res.data.data.message,
            imageURL: res.data.data.imageURL,
          });
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ImgInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    if (imgRef.current.files[0])
      setImgFileURL(URL.createObjectURL(imgRef.current.files[0]));
    else setImgFileURL("");
  };

  const sendMessage = async () => {
    try {
      if (!message.trim())
        return dispatch(
          setAlert({
            severity: "error",
            message: "Введите отзыв",
          })
        );
      if (id && email && username) {
        setIsLoading(true);

        const data = new FormData();
        data.append("message", message);
        data.append("videoName", videoName);
        data.append("courseName", courseName);
        data.append("userID", id);
        data.append("email", email);
        data.append("username", username);
        data.append("file", imgRef.current.files[0]);

        const res = await axios.post(
          `${process.env.REACT_APP_SERVERURL}/api/courses/feedback`,
          data,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        dispatch(
          setAlert({
            severity: "success",
            message: res.data.message,
          })
        );
      } else {
        console.log("Пользователь не найден");
      }

      setData({ message: message, imageURL: imgFileURL });
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
    }
  };

  return (
    <Paper elevation={3} sx={{ mt: 5, mb: 5, p: 2 }}>
      <DialogTitle sx={{ textAlign: "center" }}>Оставить отзыв</DialogTitle>
      {!isLoading ? (
        data ? (
          <>
            <Box>{data.message}</Box>
            <img
              src={data.imageURL}
              width="200px"
              height="200px"
              style={{
                marginTop: "15px",
                display: "block",
                objectFit: "cover",
              }}
              alt="YourImage"
            />
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => {
                setData(null);
                setMessage(data.message);
                setImgFileURL(data.imageURL);
              }}
            >
              Изменить
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Отзыв"
              multiline
              maxRows={4}
              sx={{ width: "100%" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {imgFileURL && (
              <img
                src={imgFileURL}
                width="200px"
                height="200px"
                style={{
                  marginTop: "15px",
                  display: "block",
                  objectFit: "cover",
                }}
                alt="YourImage"
              />
            )}
            <label
              htmlFor="upload-file"
              className="FlexAlignCentr"
              style={{
                marginTop: "10px",
                justifyContent: "space-between",
              }}
            >
              <input
                ref={imgRef}
                id="upload-file"
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={ImgInputChangeHandler}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  size="small"
                  component="span"
                  variant="contained"
                  sx={{ marginRight: "10px" }}
                >
                  {imgFileURL ? "Изменить" : "Добавить изображение"}
                </Button>
                <span style={{ color: "#7f8486", fontSize: "0.9em" }}>
                  {fileName ? fileName : "Файл не выбран"}
                </span>
              </div>
            </label>

            <Button
              variant="contained"
              sx={{ mt: 3, width: "100%" }}
              onClick={sendMessage}
            >
              Отправить
            </Button>
          </>
        )
      ) : (
        <div className="FlexJustifyCentr">
          <Loader />
        </div>
      )}
    </Paper>
  );
};

export default Feedback;
