import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <p className="text-[20px] text-red mt-[15px]">
        Oops! Something went wrong
      </p>
      <Link to={"/"}>
        <div className="border-[1px] border-customDark w-[120px] py-[10px] hover:scale-110 duration-300 ease-in-out mx-auto mt-[20px] cursor-pointer">
          Go Back
        </div>
      </Link>
    </div>
  );
};

export default Error;
