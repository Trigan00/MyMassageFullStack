import { Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import Paper from "@mui/material/Paper/Paper";
import React, { useState } from "react";
import Sanitize from "../../helpers/Sanitize";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";
import TextEditor from "./TextEditor";

interface DescriptionProps {
  shortDescription: string;
  setShortDescription: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: { shortDesc: string };
  courseID: string;
}

const Description: React.FC<DescriptionProps> = ({
  shortDescription,
  setShortDescription,
  defaultValue,
  courseID,
}) => {
  const { changeDescription, isLoading } = useAdmin();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const resetDescription = () => {
    setShortDescription(defaultValue.shortDesc);
    setIsEdit(false);
  };

  const onSaveHandler = async () => {
    await changeDescription("shortDescription", shortDescription, courseID);
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
        Краткое описание
      </DialogTitle>
      {!isLoading ? (
        <>
          {!isEdit ? (
            <Sanitize html={shortDescription} />
          ) : (
            <TextEditor text={shortDescription} setText={setShortDescription} />
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
