import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  const togglePassword = (): void => {
    setPassword(!password);
  };
  const toggleConfirmPassword = (): void => {
    setConfirmPassword(!confirmPassword);
  };

  return (
    <div className="w-[40%] bg-silver mx-auto shadow-[1px_1px_1px_1px_silver] rounded-[5px] mt-[5%] p-[20px]">
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
                // value={values.contactNo}
                // onChange={handleInputChange}
                // onBlur={handleBlur}
              />
              <label
                htmlFor="contactNo"
                className="absolute text-sm text-customDark dark:text-customDark duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-silver px-2 peer-focus:px-2 peer-focus:text-customDark peer-focus:dark:text-customDark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Contact No.
              </label>
            </div>
            {/* {errors.username && touched.username ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.username}
              </p>
            ) : (
              ""
            )} */}
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
                // value={values.email}
                // onChange={handleInputChange}
                // onBlur={handleBlur}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-customDark dark:text-customDark duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-silver px-2 peer-focus:px-2 peer-focus:text-customDark peer-focus:dark:text-customDark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Email Id
              </label>
            </div>
            {/* {errors.username && touched.username ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.username}
              </p>
            ) : (
              ""
            )} */}
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
                  // value={values.password}
                  // onChange={handleInputChange}
                  // onBlur={handleBlur}
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
            {/* {(errors.password && touched.password) ||
            loginError.type === "credentials" ||
            loginError.type === "active" ? (
              <p className="-mb-[12px] mt-[2px] ml-[2px] text-left text-[15px] text-red">
                {errors.password || loginError.message}
              </p>
            ) : (
              ""
            )} */}
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
                  // value={values.confirmPassword}
                  // onChange={handleInputChange}
                  // onBlur={handleBlur}
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
            {/* {(errors.password && touched.password) ||
            loginError.type === "credentials" ||
            loginError.type === "active" ? (
              <p className="-mb-[12px] mt-[2px] ml-[2px] text-left text-[15px] text-red">
                {errors.password || loginError.message}
              </p>
            ) : (
              ""
            )} */}
          </div>
        </form>
        <div
          tabIndex={3}
          className="text-blue border-[1px] bg-customDark text-white w-[150px] p-[10px] mx-auto mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue cursor-pointer hover:scale-105"
          // onClick={handleSubmit}
        >
          Register
        </div>
        <p className="mt-[20px] text-customDark">
          New to Team Up?{" "}
          <Link to={"/register"} className="text-link hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
