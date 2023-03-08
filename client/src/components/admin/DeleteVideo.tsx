import {
  Avatar,
  Box,
  DialogTitle,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { Demo } from "../../UI/MyTabPanel";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";
import { Video } from "../../hooks/useVideos";
import DeleteModal from "../../UI/DeleteModal";
import EditVideoDescripiton from "./EditVideoDescripiton";

interface DeleteVideoProps {
  videos: Video[];
  courseName: string;
  isLoading: boolean;
  fetchVideos: (name: string) => Promise<void>;
  setCommentsVideo: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteVideo: React.FC<DeleteVideoProps> = ({
  courseName,
  videos,
  isLoading,
  fetchVideos,
  setCommentsVideo,
}) => {
  const { deleteFiles } = useAdmin();
  const [modalInfo, setModalInfo] = useState<{
    isModalOpen: boolean;
    modalName: string;
    deleteIsActive: boolean;
    data: {};
  }>({ isModalOpen: false, modalName: "", deleteIsActive: false, data: {} });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editVideoId, setEditVideoId] = useState<string>("");

  const deleteHandler = async ({ id }: { id: string }) => {
    await deleteFiles(courseName, id);
    fetchVideos(courseName);
  };

  return (
    <Paper elevation={3} sx={{ mt: "20px", p: "15px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Список видео</DialogTitle>
      <Box sx={{ width: "100%" }}>
        <Demo>
          <List>
            {!isLoading ? (
              videos.map((video: Video) => (
                <ListItem
                  key={video.id}
                  secondaryAction={
                    <div>
                      <IconButton
                        sx={{ mr: "5px" }}
                        aria-label="edit"
                        onClick={() => {
                          setCommentsVideo(video.name);
                        }}
                      >
                        <Icon>comment</Icon>
                      </IconButton>
                      <IconButton
                        sx={{ mr: "5px" }}
                        aria-label="edit"
                        onClick={() => {
                          setEditVideoId(video.id);
                          setIsEdit(true);
                        }}
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          setModalInfo({
                            isModalOpen: true,
                            modalName: video.name,
                            deleteIsActive: false,
                            data: {
                              id: video.id,
                            },
                          })
                        }
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>video_file</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={video.name}
                    secondary={video.fileName}
                  />
                </ListItem>
              ))
            ) : (
              <div className="FlexJustifyCentr">
                <Loader />
              </div>
            )}
          </List>
        </Demo>
      </Box>
      <DeleteModal
        type="Видео"
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        onDelete={deleteHandler}
      />
      <EditVideoDescripiton
        open={isEdit}
        setOpen={setIsEdit}
        courseName={courseName}
        videoId={editVideoId}
      />
    </Paper>
  );
};

export default DeleteVideo;
