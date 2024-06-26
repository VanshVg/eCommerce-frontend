import { replace, useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../schemas/login";
import axios from "axios";
import { errorInterface } from "../../interfaces";
import Cookies, { Cookie } from "universal-cookie";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducers";
import Swal from "sweetalert2";

const Login = () => {
  const data = {
    username: "",
    password: "",
  };
  const [password, setPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<errorInterface>({
    type: "",
    message: "",
  });

  const location = useLocation();
  // console.log(history);

  const togglePassword = (): void => {
    setPassword(!password);
  };

  const navigate = useNavigate();
  const cookies: Cookie = new Cookies();

  const cartStorage = localStorage.getItem("cart");

  const { values, errors, handleBlur, handleChange, submitForm, touched } =
    useFormik({
      initialValues: data,
      validationSchema: login,
      onSubmit: (values) => {
        axios
          .post(`http://192.168.10.107:4000/login`, values)
          .then((resp) => {
            if (resp.data.success) {
              cookies.set("token", resp.data.token, {
                path: "/",
                expires: new Date(Date.now() + 2592000000),
              });
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
                    }
                  })
                  .catch((error) => {
                    navigate("/error");
                  });
              }
              navigate(-1);
            }
          })
          .catch((error) => {
            if (error.response.data.type === "server") {
              navigate("/error");
            } else if (!error.response.data.success) {
              setLoginError({
                type: error.response.data.type,
                message: error.response.data.message,
              });
            }
          });
      },
    });
  const handleSubmit = (): void => {
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent) => {
    handleChange(e);
  };

  return (
    <div className="w-[40%] bg-silver mx-auto shadow-[1px_1px_1px_1px_silver] rounded-[5px] mt-[12%] p-[20px]">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div>
        <h1 className="text-customDark text-[30px] p-[10px] font-bold">
          E-commerce Login
        </h1>
        <form>
          <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]"></div>
          <div className="mt-[20px] max-w-[77%] mx-auto">
            <div className="relative">
              <input
                tabIndex={1}
                type="text"
                id="username"
                name="username"
                className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-customDark bg-silver rounded-lg border-[1px] border-customDark appearance-none dark:text-customDark focus:text-customDark dark:border-customDark dark:focus:border-customDark focus:outline-none focus:ring-0 focus:border-customDark peer mx-auto "
                placeholder=""
                autoComplete="off"
                value={values.username}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-customDark dark:text-customDark duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-silver px-2 peer-focus:px-2 peer-focus:text-customDark peer-focus:dark:text-customDark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Contact No. or Email
              </label>
            </div>
            {errors.username && touched.username ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.username}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className=" mt-[20px] max-w-[77%] mx-auto">
            <div className="flex">
              <div className="relative w-full">
                <input
                  tabIndex={1}
                  type={password ? "text" : "password"}
                  id="password"
                  name="password"
                  className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-customDark bg-silver rounded-lg border-[1px] border-customDark appearance-none dark:text-customDark focus:text-customDark dark:border-customDark dark:focus:border-customDark focus:outline-none focus:ring-0 focus:border-customDark peer mx-auto"
                  placeholder=""
                  autoComplete="off"
                  value={values.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-customDark dark:text-customDark duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-silver px-2 peer-focus:px-2 peer-focus:text-customDark peer-focus:dark:text-customDark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                >
                  Password
                </label>
              </div>
              {password ? (
                <img
                  src="/icons/eye-show.svg"
                  className="-ml-[30px] z-10 cursor-pointer"
                  onClick={togglePassword}
                  alt=""
                ></img>
              ) : (
                <img
                  src="/icons/eye-hide.svg"
                  className="-ml-[30px] z-10 cursor-pointer"
                  onClick={togglePassword}
                  alt=""
                ></img>
              )}
            </div>
            {(errors.password && touched.password) ||
            loginError.type === "credentials" ||
            loginError.type === "active" ? (
              <p className="-mb-[12px] mt-[2px] ml-[2px] text-left text-[15px] text-red">
                {errors.password || loginError.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
        <div
          tabIndex={3}
          className="text-blue border-[1px] bg-customDark text-white w-[150px] p-[10px] mx-auto mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue cursor-pointer hover:scale-105"
          onClick={handleSubmit}
        >
          Login
        </div>
        <p className="mt-[20px] text-customDark">
          New to Team Up?{" "}
          <span
            className="text-link hover:underline cursor-pointer"
            onClick={() => {
              navigate("/auth/register", { replace: true });
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
