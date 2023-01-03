import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Icon,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { removeUser } from "../store/slices/userSlice";
import { consts } from "../utils/routsConsts";

const NavBar: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { email, isAuth, role, isVerified } = useAuth();
  const navigate = useNavigate();

  const signOutHandler = (): void => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate(consts.HOME_ROUTE);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(consts.HOME_ROUTE)}
            >
              MyMassage
            </Typography>
            <Button
              color="inherit"
              onClick={() => navigate(consts.VIDEOS_ROUTE)}
            >
              Уроки
            </Button>

            {isAuth ? (
              <>
                {role === "admin" && (
                  <Button
                    color="inherit"
                    onClick={() => navigate(consts.ADMIN_ROUTE)}
                  >
                    Админ
                  </Button>
                )}
                <Button color="inherit" onClick={signOutHandler}>
                  Выйти
                </Button>
                <span
                  style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                    borderRadius: "7px",
                    padding: "4px 10px",
                    marginRight: "10px",
                    color: "#fff",
                    fontWeight: "100",
                    fontSize: "1rem",
                  }}
                >
                  {email}
                </span>
                {!isVerified && (
                  <>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch(
                          setAlert({
                            severity: "warning",
                            message: "Подтвердите emai! (Проверьте спам)",
                          })
                        )
                      }
                    >
                      <Icon color="warning" style={{ marginLeft: "5px" }}>
                        warning_amber
                      </Icon>
                    </div>
                  </>
                )}
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate(consts.LOGIN_ROUTE)}
              >
                Войти
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
