import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useAuthState } from "./hooks/useAuthState";
import { useTypedSelector } from "./store/hooks/useTypedSelector";
import MyAlert from "./UI/MyAlert";

function App() {
  useAuthState();
  const selector = useTypedSelector((state) => state.alert);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <MyAlert
        message={selector.message}
        open={selector.isOpen}
        severity={selector.severity}
      />
    </BrowserRouter>
  );
}

export default App;
