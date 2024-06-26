import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const Protected = () => {
  const cookies: Cookies = new Cookies();

  const token: string = cookies.get("token");

  return token ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

export default Protected;
