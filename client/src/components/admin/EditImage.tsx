import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useRef, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { Course } from "../../hooks/useVideos";

interface EditImageProps {
  courseInfo: Course;
}

const EditImage: React.FC<EditImageProps> = ({ courseInfo }) => {
  const { changeCourseImage } = useAdmin();

  const [fileName, setFileName] = useState<string>("");
  const [imgFileURL, setImgFileURL] = useState<string>("");

  const imgRef: any = useRef(null);

  const ImgInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    if (imgRef.current.files[0])
      setImgFileURL(URL.createObjectURL(imgRef.current.files[0]));
    else setImgFileURL(courseInfo.pictureUrl);
  };

  const savePictureHandler = async () => {
    await changeCourseImage(
      imgRef.current.files[0],
      courseInfo.id,
      courseInfo.name
    );
    setFileName("");
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <img
        src={imgFileURL || courseInfo.pictureUrl}
        width="200px"
        height="200px"
        style={{ display: "block", objectFit: "cover" }}
        alt="CoursePicture"
      />
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
            Изменить
          </Button>
          <span style={{ color: "#7f8486", fontSize: "0.9em" }}>
            {fileName ? fileName : "Файл не выбран"}
          </span>
        </div>
      </label>
      {fileName && (
        <Button
          size="small"
          component="span"
          variant="contained"
          sx={{ mt: "10px" }}
          onClick={savePictureHandler}
        >
          Сохранить
        </Button>
      )}
    </Paper>
  );
};

export default EditImage;
