import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField/TextField";
import { useEffect, useState } from "react";
import useVideos, { Video } from "../../hooks/useVideos";
import Loader from "../../UI/Loader";
import TextEditor from "./TextEditor";
import { Button } from "@mui/material";
import useAdmin from "../../hooks/useAdmin";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface EditVideoDescripitonProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseName: string;
  videoId: string;
}

const EditVideoDescripiton: React.FC<EditVideoDescripitonProps> = ({
  open,
  setOpen,
  courseName,
  videoId,
}) => {
  const { getVideos } = useVideos();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { changeVideoDescription } = useAdmin();

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos(courseName);

      if (data) {
        data.forEach(({ id, name, description }: Video) => {
          if (id === videoId) {
            setName(name);
            setDescription(description);
          }
        });
      }
    };
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const onSaveHandler = async () => {
    await changeVideoDescription(videoId, courseName, name, description);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {name ? (
              <>
                <TextField
                  id="outlined-basic"
                  label="название"
                  variant="outlined"
                  type="text"
                  size="small"
                  value={name}
                  sx={{ width: "100%", mb: 3 }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                />
                <label
                  style={{
                    color: "#7f8486",
                    fontWeight: "normal",
                    fontSize: "0.9rem",
                  }}
                >
                  Описание
                </label>
                <TextEditor text={description} setText={setDescription} />
                <div style={{ marginTop: "20px", float: "right" }}>
                  <Button
                    size="small"
                    sx={{ mr: "10px" }}
                    onClick={() => setOpen(false)}
                  >
                    Отменить
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={onSaveHandler}
                  >
                    Сохранить
                  </Button>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditVideoDescripiton;
