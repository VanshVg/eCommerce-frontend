import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorInterface } from "../../interfaces";
import { useFormik } from "formik";
import register from "../../schemas/register";
import axios from "axios";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet";

const Register = () => {
  const data = {
    contactNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [password, setPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<errorInterface>({
    type: "",
    message: "",
  });
  const [activation, setActivation] = useState<string>("");

  const togglePassword = (): void => {
    setPassword(!password);
  };
  const toggleConfirmPassword = (): void => {
    setConfirmPassword(!confirmPassword);
  };

  const cookies = new Cookies();
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, submitForm, touched } =
    useFormik({
      initialValues: data,
      validationSchema: register,
      onSubmit: (values) => {
        axios
          .post(`http://192.168.10.107:4000/register`, values)
          .then((resp) => {
            const { data } = resp;
            if (data.success) {
              cookies.set("token", data.token, {
                path: "/",
                expires: new Date(Date.now() + 2592000000),
              });
              setActivation(data.verification_token);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.type === "server") {
              navigate("/error");
            } else if (!error.response.data.success) {
              setRegisterError({
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
    setRegisterError({ type: "", message: "" });
    handleChange(e);
  };

  return (
    <div className="w-[40%] bg-silver mx-auto shadow-[1px_1px_1px_1px_silver] rounded-[5px] mt-[5%] p-[20px]">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div>
        <h1 className="text-customDark text-[30px] p-[10px] font-bold">
          E-commerce Register
        </h1>
        <form>
          <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]"></div>
          <div className="mt-[20px] max-w-[77%] mx-auto">
            <div className="relative">
              <input
                tabIndex={1}
                type="text"
                id="contactNo"
                name="contactNo"
                className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-silver bg-silver rounded-lg border-[1px] border-customDark appearance-none dark:text-customDark focus:text-customDark dark:border-customDark dark:focus:border-customDark focus:outline-none focus:ring-0 focus:border-customDark peer mx-auto "
                placeholder=""
                autoComplete="off"
                value={values.contactNo}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="contactNo"
                className="absolute text-sm text-customDark dark:text-customDark duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-silver px-2 peer-focus:px-2 peer-focus:text-customDark peer-focus:dark:text-customDark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Contact No.
              </label>
            </div>
            {(errors.contactNo && touched.contactNo) ||
            registerError.type === "contact_no" ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.contactNo || registerError.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-[20px] max-w-[77%] mx-auto">
            <div className="relative">
              <input
                tabIndex={1}
                type="text"
                id="email"
                name="email"
                className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-silver bg-silver rounded-lg border-[1px] border-customDark appearance-none dark:text-customDark focus:text-customDark dark:border-customDark dark:focus:border-customDark focus:outline-none focus:ring-0 focus:border-customDark peer mx-auto "
                placeholder=""
                autoComplete="off"
                value={values.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-customDark dark:text-customDark duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-silver px-2 peer-focus:px-2 peer-focus:text-customDark peer-focus:dark:text-customDark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Email Id
              </label>
            </div>
            {(errors.email && touched.email) ||
            registerError.type === "email" ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.email || registerError.message}
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
                  className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-silver bg-silver rounded-lg border-[1px] border-customDark appearance-none dark:text-customDark focus:text-customDark dark:border-customDark dark:focus:border-customDark focus:outline-none focus:ring-0 focus:border-customDark peer mx-auto "
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
            {errors.password && touched.password ? (
              <p className="-mb-[12px] mt-[2px] ml-[2px] text-left text-[15px] text-red">
                {errors.password}
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
                  type={confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-silver bg-silver rounded-lg border-[1px] border-customDark appearance-none dark:text-customDark focus:text-customDark dark:border-customDark dark:focus:border-customDark focus:outline-none focus:ring-0 focus:border-customDark peer mx-auto "
                  placeholder=""
                  autoComplete="off"
                  value={values.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-sm text-customDark dark:text-customDark duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-silver px-2 peer-focus:px-2 peer-focus:text-customDark peer-focus:dark:text-customDark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                >
                  Confirm Password
                </label>
              </div>
              {confirmPassword ? (
                <img
                  src="/icons/eye-show.svg"
                  className="-ml-[30px] z-10 cursor-pointer"
                  onClick={toggleConfirmPassword}
                  alt=""
                ></img>
              ) : (
                <img
                  src="/icons/eye-hide.svg"
                  className="-ml-[30px] z-10 cursor-pointer"
                  onClick={toggleConfirmPassword}
                  alt=""
                ></img>
              )}
            </div>
            {(errors.password && touched.password) ||
            registerError.type === "credentials" ||
            registerError.type === "active" ? (
              <p className="-mb-[12px] mt-[2px] ml-[2px] text-left text-[15px] text-red">
                {errors.password || registerError.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
        <div className="text-link hover:underline mt-[5px] -mb-[15px]">
          {activation ? (
            <span
              onClick={() => {
                navigate(`/auth/activation/${activation}`, { replace: true });
              }}
            >
              http://192.168.10.107:3000/auth/activation/{activation}
            </span>
          ) : (
            ""
          )}
        </div>
        <div
          tabIndex={3}
          className="text-blue border-[1px] bg-customDark text-white w-[150px] p-[10px] mx-auto mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue cursor-pointer hover:scale-105"
          onClick={handleSubmit}
        >
          Register
        </div>
        <p className="mt-[20px] text-customDark">
          Already a user?{" "}
          <span
            className="text-link hover:underline"
            onClick={() => {
              navigate("/auth/login", { replace: true });
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
