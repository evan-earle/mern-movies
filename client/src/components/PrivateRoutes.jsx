import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function PrivateRoutes() {
  const { auth } = useAuth();
  if (auth === undefined) {
    return "LOADING.";
  }

  return auth === true ? <Outlet></Outlet> : <Navigate to="/"></Navigate>;
}

export default PrivateRoutes;
