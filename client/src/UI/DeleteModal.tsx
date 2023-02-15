import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon/Icon";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface TransitionsModalProps {
  type: "Курс" | "Видео";
  modalInfo: {
    isModalOpen: boolean;
    modalName: string;
    deleteIsActive: boolean;
    data: {};
  };

  setModalInfo: React.Dispatch<
    React.SetStateAction<{
      isModalOpen: boolean;
      modalName: string;
      deleteIsActive: boolean;
      data: {};
    }>
  >;
  onDelete: any;
}

const TransitionsModal: React.FC<TransitionsModalProps> = ({
  type,
  modalInfo,
  setModalInfo,
  onDelete,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalInfo.isModalOpen}
      onClose={() =>
        setModalInfo((prev) => {
          return { ...prev, isModalOpen: false };
        })
      }
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalInfo.isModalOpen}>
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Удалить {type.toLowerCase()}?
            </Typography>
            <Icon
              style={{ cursor: "pointer" }}
              onClick={() =>
                setModalInfo((prev) => {
                  return { ...prev, isModalOpen: false };
                })
              }
            >
              close
            </Icon>
          </div>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {type} &#171;{modalInfo.modalName}&#187; будет{" "}
            {type === "Курс" ? "удален" : "удалено"} без возможности
            восстановления
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={modalInfo.deleteIsActive}
                  onChange={() =>
                    setModalInfo((prev) => {
                      return { ...prev, deleteIsActive: !prev.deleteIsActive };
                    })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={`Удалить ${type.toLowerCase()}`}
            />
          </Typography>
          <div style={{ marginTop: "20px", float: "right" }}>
            <Button
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() =>
                setModalInfo((prev) => {
                  return { ...prev, isModalOpen: false };
                })
              }
            >
              Отменить
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              disabled={!modalInfo.deleteIsActive}
              onClick={() => {
                onDelete(modalInfo.data);
                setModalInfo((prev) => {
                  return { ...prev, isModalOpen: false };
                });
              }}
            >
              Удалить
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
