import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useAuthState } from "./hooks/useAuthState";
import { useTypedSelector } from "./store/hooks/useTypedSelector";
import MyAlert from "./UI/MyAlert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/style.css";
import Footer from "./components/Footer";

function App() {
  useAuthState();
  const selector = useTypedSelector((state) => state.alert);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
      <MyAlert
        message={selector.message}
        open={selector.isOpen}
        severity={selector.severity}
      />
    </BrowserRouter>
  );
}

export default App;
