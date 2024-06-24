import { Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import { RootState } from "../redux/store";
import Swal from "sweetalert2";
import { checkout } from "../redux/reducers/cartReducers";

interface categoryInterface {
  slug: string;
  name: string;
}

const Navbar = () => {
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoryInterface[]>();
  const [countCart, setCountCart] = useState<number>(0);

  const { pathname } = useLocation();
  const cookies: Cookie = new Cookies();
  const navigate = useNavigate();
  const token: string = cookies.get("token");

  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const cartStorage = localStorage.getItem("cart");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((error) => {
        navigate("/error");
      });
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://192.168.10.107:4000/cart/get`, { withCredentials: true })
        .then((resp) => {
          if (resp.data.success) {
            setCountCart(resp.data.cartData.length);
          }
        })
        .catch((error) => {
          navigate("/error");
        });
    } else if (cartStorage) {
      const storageData = JSON.parse(cartStorage);
      setCountCart(storageData.length);
    }
  }, [cartData, cookies]);

  if (pathname.includes("auth") || pathname.includes("error")) {
    return null;
  }

  const handleLogout = (): void => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are sure you want to Logout?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        cookies.remove("token", { path: "/" });
        setCountCart(0);
        dispatch(checkout());
        localStorage.clear();
        Swal.fire({
          text: "Logout successful",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="font-customFont text-dark py-[10px] px-[30px] flex justify-between max-w-[1440px] mx-auto">
      <Link to={"/"}>
        <div className="font-bold E-Commerce text-[35px] cursor-pointer ">
          E - Commerce
        </div>
      </Link>
      <div className="relative">
        <ul className="flex justify-between gap-[30px] mt-[5px]">
          <Link to={"/"}>
            {" "}
            <li
              className={
                pathname === "/"
                  ? "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px] font-bold underline"
                  : "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px]"
              }
            >
              Home
            </li>
          </Link>
          <div
            className={
              "flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]"
            }
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <li>Categories</li>{" "}
            {showCategories ? (
              <img
                src="/icons/down-arrow.svg"
                className="-ml-[8px] mt-[2px]"
                alt=""
              />
            ) : (
              <img
                src="/icons/right-arrow.svg"
                className="-ml-[8px] mt-[2px]"
                alt=""
              />
            )}
          </div>
          {token ? (
            <Link to={"/orders"}>
              {" "}
              <li
                className={
                  pathname === "/orders"
                    ? "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px] font-bold underline"
                    : "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px]"
                }
              >
                Orders
              </li>
            </Link>
          ) : (
            ""
          )}
        </ul>
        {showCategories ? (
          <div
            className="absolute z-10 bg-customDark text-silver p-[10px] text-left right-[0%] top-11 rounded-[5px] h-[305px] overflow-y-auto"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <ul>
              {categories &&
                categories.map((element: categoryInterface, index: number) => {
                  return (
                    <div>
                      {element.slug !== "vehicle" &&
                      element.slug !== "fragrances" &&
                      element.slug !== "smartphones" ? (
                        <Link to={`/list/${element.slug}`}>
                          <li className="p-[3px] pl-[5px] duration-300 ease-in-out hover:bg-silver hover:text-customDark rounded-[4px] cursor-pointer">
                            {element.name}
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}{" "}
                    </div>
                  );
                })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="relative">
        <ul className="flex justify-between gap-[15px] mt-[5px]">
          <Tooltip title="Search">
            <li className="flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]">
              <img src="/icons/search.svg" alt="search"></img>
            </li>
          </Tooltip>
          <Tooltip title="Cart">
            <Link to={"/cart"}>
              <li className="flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]">
                <img src="/icons/cart.svg" alt="cart"></img>
              </li>
            </Link>
          </Tooltip>
          {token ? (
            <Tooltip title="Logout">
              <li className="flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]">
                <img
                  src="/icons/logout.svg"
                  alt="logout"
                  onClick={handleLogout}
                ></img>
              </li>
            </Tooltip>
          ) : (
            <Tooltip title="Login">
              <li className="flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]">
                <img
                  src="/icons/login.svg"
                  alt="logout"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                ></img>
              </li>
            </Tooltip>
          )}
        </ul>
        {countCart > 0 ? (
          <div className="absolute top-0 right-[42%]">
            <p className="text-red font-bold h-[20px] w-[20px] ">{countCart}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
