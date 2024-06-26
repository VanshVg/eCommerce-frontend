import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";

const Activation = () => {
  const params = useParams();
  const navigate = useNavigate();

  const cartStorage = localStorage.getItem("cart");

  const [activationError, setActivationError] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    axios
      .put(
        `http://192.168.10.107:4000/activate/${params.token}`,
        {},
        {
          withCredentials: true,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        if (resp.data.success) {
          if (cartStorage != null) {
            const storageData = JSON.parse(cartStorage);
            axios
              .post(
                `http://192.168.10.107:4000/cart/add`,
                {
                  cartData: storageData,
                },
                { withCredentials: true }
              )
              .then((resp) => {
                if (resp.data.success) {
                  localStorage.removeItem("cart");
                  navigate("/");
                }
              })
              .catch((error) => {
                navigate("/error");
              });
          }
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.type === "server") {
          navigate("/error");
        } else if (!data.success) {
          setActivationError({ type: data.type, message: data.message });
        }
      });
  }, [params.token]);
  return (
    <>
      <Helmet>
        <title>Activation</title>
      </Helmet>
      <div className="activation-container">
        {activationError.type !== "" ? (
          <>
            <p className="text-red">
              {activationError.message ||
                "You are not authorised to access this page"}
            </p>
            <p className="text-fontBlue">
              <Link
                to={"/register"}
                className="text-link cursor-pointer hover:underline"
              >
                Click here to continue
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-fontBlue mt-[10px]">
              Your account has been activated.
            </p>
            <p className="text-fontBlue">
              <span
                className="text-link cursor-pointer hover:underline"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Click here to continue
              </span>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Activation;
