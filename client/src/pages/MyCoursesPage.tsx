import {
  Avatar,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { Container } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthState } from "../hooks/useAuthState";
import { useHttp } from "../hooks/useHttp";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";

const MyCoursesPage: React.FC = () => {
  const { request, loading } = useHttp();
  const { id, token } = useAuth();
  const { isPending } = useAuthState();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<string[]>([]);

  const fetchCourses = useCallback(async () => {
    try {
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/courses/my_courses`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setCourses(res.courses);
    } catch (e) {}
  }, [request, token]);
  useEffect(() => {
    if (id) fetchCourses();
  }, [id, fetchCourses]);

  if (isPending)
    return (
      <Container className="FlexJustifyCentr">
        <Loader />
      </Container>
    );

  return (
    <Container style={{ marginTop: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Список курсов</DialogTitle>
      {!id && <h3>Для просмотра курсов необходима авторизация</h3>}
      <Paper>
        <List>
          {!loading ? (
            courses ? (
              courses.map((name: string) => (
                <ListItem
                  key={name}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(consts.MYCOURSES_ROUTE + "/" + name)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>folder</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItem>
              ))
            ) : (
              "Нет курсов"
            )
          ) : (
            <div className="FlexJustifyCentr">
              <Loader />
            </div>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default MyCoursesPage;
