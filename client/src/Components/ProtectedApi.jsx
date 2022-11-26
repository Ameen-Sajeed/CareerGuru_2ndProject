import { useSelector } from "react-redux";
import { Navigate, Outlet,} from "react-router-dom";

function ProtectedApi() {
  const user = useSelector((state) => state.user);

  return !user ? <Navigate to="login" /> : <Outlet />;
}

export default ProtectedApi;
