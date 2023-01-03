import { Container } from "@mui/system";
import AddVideo from "../components/admin/AddVideo";
import DeleteVideo from "../components/admin/DeleteVideo";

const AdminPage: React.FC = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <AddVideo />
      <DeleteVideo />
    </Container>
  );
};

export default AdminPage;
