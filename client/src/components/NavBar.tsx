import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Icon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import shortenText from "../helpers/shortenText";
import { useAuth } from "../hooks/useAuth";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { removeUser } from "../store/slices/userSlice";
import { consts } from "../utils/routsConsts";
import styles from "./styles/NavBar.module.scss";

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
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ padding: 0 }}>
            <Box
              className={styles.Logo}
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(consts.HOME_ROUTE)}
            >
              MyMassage
            </Box>
            {/* <Button
              color="inherit"
              onClick={() => navigate(consts.ALLCOURSES_ROUTE)}
            >
              <span className={styles.NavbarText}>Курсы</span>
            </Button> */}
            <Button
              color="inherit"
              onClick={() => navigate(consts.MYCOURSES_ROUTE)}
            >
              <span className={styles.NavbarText}> Мои курсы</span>
            </Button>

            {isAuth ? (
              <>
                {role === "admin" && (
                  <Button
                    color="inherit"
                    onClick={() => navigate(consts.ADMIN_ROUTE)}
                  >
                    <span className={styles.NavbarText}> Админ</span>
                  </Button>
                )}

                <div
                  className={styles.Email}
                  style={{
                    padding: isVerified ? "4px 10px" : "4px 10px 4px 35px",
                  }}
                >
                  {!isVerified && (
                    <IconButton
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        left: "2px",
                      }}
                      size="small"
                      onClick={() =>
                        dispatch(
                          setAlert({
                            severity: "warning",
                            message: "Подтвердите emai! (Проверьте спам)",
                          })
                        )
                      }
                    >
                      <Icon color="warning" /* style={{ marginLeft: "5px" }} */>
                        warning_amber
                      </Icon>
                    </IconButton>
                  )}
                  <Tooltip title={email}>
                    <span>{shortenText(email || "", 10)}</span>
                  </Tooltip>
                </div>
                <IconButton
                  sx={{ color: "white" }}
                  size="small"
                  onClick={signOutHandler}
                >
                  <Icon>power_settings_new</Icon>
                </IconButton>
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
