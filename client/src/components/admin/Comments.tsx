import { Box, Card, DialogTitle, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";
import styles from "../styles/Comments.module.scss";

interface CommentsProps {
  commentsVideo: string;
  courseName: string;
}

export type Comment = {
  email: string;
  imageURL?: string;
  message: string;
  username: string;
};

const Comments: React.FC<CommentsProps> = ({ commentsVideo, courseName }) => {
  const { isLoading, getComments } = useAdmin();
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    (async function () {
      const res: any = await getComments(commentsVideo, courseName);
      if (res.data) {
        setComments(res.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!isLoading ? (
        <Paper elevation={3} sx={{ p: "15px" }}>
          <DialogTitle style={{ textAlign: "center" }}>Отзывы</DialogTitle>
          {comments?.length ? (
            comments.map((comment) => (
              <Card
                key={comment.email}
                sx={{
                  p: 1,
                  mb: 2,
                }}
              >
                <Box sx={{ fontSize: "14px", fontWeight: "600" }}>
                  {comment.email} ({comment.username})
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                  }}
                >
                  <div>{comment.message}</div>
                  <div
                    className={styles.Image}
                    style={{ alignSelf: "center", marginLeft: "5px" }}
                  >
                    <a href={comment.imageURL} target="_blank" rel="noreferrer">
                      <img
                        src={comment.imageURL}
                        width="80px"
                        height="80px"
                        style={{
                          objectFit: "cover",
                        }}
                        alt="CommentImage"
                      />
                    </a>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <span>Нет отзывов</span>
          )}
        </Paper>
      ) : (
        <div className="FlexJustifyCentr">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Comments;
