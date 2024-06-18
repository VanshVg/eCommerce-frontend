import { Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  if (pathname.includes("auth")) {
    return null;
  }

  return (
    <div className="font-customFont text-dark py-[10px] px-[30px] flex justify-between max-w-[1440px] mx-auto">
      <div>
        <ul className="flex justify-between gap-[30px] mt-[5px]">
          <li
            className={
              pathname === "/"
                ? "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px] font-bold underline"
                : "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px]"
            }
          >
            Home
          </li>
          <li
            className={
              pathname === "/items"
                ? "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px] font-bold underline"
                : "flex gap-[8px] cursor-pointer text-[18px] hover:bg-silver duration-300 ease-in-out p-[10px] rounded-[22px]"
            }
          >
            Shop Now
          </li>
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
      </div>
      <div className="font-bold E-Commerce text-[35px] -ml-[50px] cursor-pointer ">
        E - Commerce
      </div>
      <div>
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
            <li className="flex gap-[8px] cursor-pointer text-[18px] duration-300 ease-in-out p-[10px] rounded-[22px]">
              <img src="/icons/cart.svg" alt="cart"></img>
            </li>
          </Tooltip>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
