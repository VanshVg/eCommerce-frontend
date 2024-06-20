import { Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import { RootState } from "../redux/store";

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

  const cartData = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token: string = cookies.get("token");

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
    }
  }, [cartData]);

  if (pathname.includes("auth")) {
    return null;
  }

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
              <img src="/icons/down-arrow.svg" className="-ml-[8px] mt-[2px]" />
            ) : (
              <img
                src="/icons/right-arrow.svg"
                className="-ml-[8px] mt-[2px]"
              />
            )}
          </div>
          <li
            className={
              pathname === "/about"
                ? "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px] font-bold underline"
                : "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px]"
            }
          >
            About
          </li>
        </ul>
        {showCategories ? (
          <div
            className="absolute z-10 bg-customDark text-silver p-[10px] text-left right-[23%] top-11 rounded-[5px] h-[305px] overflow-y-auto"
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
          <Tooltip title="Profile">
            <li className="flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]">
              <img src="/icons/profile.svg" alt="profile"></img>
            </li>
          </Tooltip>
          <Tooltip title="Cart">
            <Link to={"/cart"}>
              <li className="flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]">
                <img src="/icons/cart.svg" alt="cart"></img>
              </li>
            </Link>
          </Tooltip>
        </ul>
        {countCart > 0 ? (
          <div className="absolute top-0 right-2">
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
