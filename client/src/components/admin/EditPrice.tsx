import { Button, DialogTitle, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { Course } from "../../hooks/useVideos";
import Loader from "../../UI/Loader";

interface EditPriceProps {
  courseInfo: Course;
}

const EditPrice: React.FC<EditPriceProps> = ({ courseInfo }) => {
  const { changeCoursePrice, isLoading } = useAdmin();
  const [coursePrice, setCoursePrice] = useState<string>(courseInfo.price + "");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onSaveHandler = async () => {
    await changeCoursePrice(+coursePrice, courseInfo.id);
    setIsEdit(false);
  };

  const resetPrice = () => {
    setCoursePrice(courseInfo.price + "");
    setIsEdit(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mt: "20px",
        p: "15px",
      }}
    >
      <DialogTitle
        style={{
          textAlign: "center",
          margin: "0 0 20px 0",
        }}
      >
        Цена
      </DialogTitle>
      {!isLoading ? (
        <div>
          <TextField
            id="price"
            variant="outlined"
            type="number"
            size="small"
            margin="normal"
            sx={{ width: "100%" }}
            value={coursePrice}
            disabled={!isEdit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCoursePrice(e.target.value)
            }
          />
          {!isEdit ? (
            <Button
              variant="contained"
              size="small"
              onClick={() => setIsEdit(true)}
            >
              Изменить
            </Button>
          ) : (
            <div>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  onSaveHandler();
                }}
              >
                Сохранить
              </Button>
              <Button
                size="small"
                sx={{ ml: "10px" }}
                onClick={() => resetPrice()}
              >
                Отменить
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="FlexJustifyCentr">
          <Loader />
        </div>
      )}
    </Paper>
  );
};

export default EditPrice;
