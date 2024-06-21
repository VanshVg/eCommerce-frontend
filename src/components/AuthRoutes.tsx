import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthRoutes = () => {
  const cookies: Cookies = new Cookies();

  const token: string = cookies.get("token");

  return !token ? <Outlet /> : <Navigate to={"/"} />;
};

export default AuthRoutes;
