import { Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import Paper from "@mui/material/Paper/Paper";
import React, { useState } from "react";
import Sanitize from "../../helpers/Sanitize";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";
import TextEditor from "./TextEditor";

interface DescriptionProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: string;
  courseID: string;
  type: "shortDescription" | "fullDescription";
  title: string;
}

const Description: React.FC<DescriptionProps> = ({
  description,
  setDescription,
  defaultValue,
  courseID,
  type,
  title,
}) => {
  const { changeDescription, isLoading } = useAdmin();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const resetDescription = () => {
    setDescription(defaultValue);
    setIsEdit(false);
  };

  const onSaveHandler = async () => {
    await changeDescription(type, description, courseID);
    setIsEdit(false);
  };

  return (
    <Paper elevation={3} sx={{ mt: "20px", p: "15px" }}>
      <DialogTitle
        style={{
          textAlign: "center",
          margin: "0 0 20px 0",
        }}
      >
        {title}
      </DialogTitle>
      {!isLoading ? (
        <>
          {!isEdit ? (
            <Sanitize html={description} />
          ) : (
            <TextEditor text={description} setText={setDescription} />
          )}

          {!isEdit ? (
            <Button
              variant="contained"
              size="small"
              onClick={() => setIsEdit(true)}
            >
              Изменить
            </Button>
          ) : (
            <div style={{ marginTop: "15px" }}>
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
                onClick={() => resetDescription()}
              >
                Отменить
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="FlexJustifyCentr">
          <Loader />
        </div>
      )}
    </Paper>
  );
};

export default Description;
