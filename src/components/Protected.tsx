import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export interface propsInterface {
  Component: () => JSX.Element;
}

const Protected = (props: propsInterface) => {
  const { Component } = props;
  const cookies: Cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const token: string = cookies.get("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
