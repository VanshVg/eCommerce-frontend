import axios from "axios";
import { useEffect, useState } from "react";
import { productInterface } from "../../interfaces";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

type propsType = {
  url: string;
  title: String;
};

const HomeListing = (props: propsType) => {
  const { url, title } = props;
  const [product, setProduct] = useState<productInterface[]>();
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${url}?limit=3`)
      .then((resp) => {
        setProduct(resp.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  return (
    <div className="mb-[50px] font-customFont text-customDark">
      <h2 className="text-center ml-[10px] text-[40px]  font-bold mt-[20px]">
        {title}
      </h2>
      <div className="h-[1px] bg-customDark mx-auto w-[50%]"></div>
      <div className="flex justify-center gap-[25px] px-[30px] mt-[20px]">
        {product &&
          product.map((element: productInterface, index: number) => (
            <Link to={`/product/${element.id}`}>
              <div
                className="bg-silver rounded-[5px] cursor-pointer p-[20px] hover:scale-110 duration-300 ease-in-out"
                key={index}
              >
                <div className="mx-auto ">
                  <div>
                    <img
                      src={element.thumbnail}
                      className="mx-auto"
                      alt="image"
                    />
                  </div>
                  <div>
                    <p className="text-[20px] font-bold -mt-[20px]">
                      {element.title}
                    </p>
                    <p className="text-[15px] mt-[20px]">
                      {element.description.length < 200
                        ? element.description
                        : element.description.slice(0, 200) + `...`}
                    </p>
                    <p className="font-bold text-[25px] mt-[10px]">
                      ${element.price}
                    </p>
                    <p className="mt-[10px]">
                      <Rating value={element.rating} precision={0.5} readOnly />{" "}
                    </p>
                  </div>
                </div>
              </div>{" "}
            </Link>
          ))}
      </div>
      <Link to={`/list/${url}`}>
        <div className="bg-white border-[1px] border-customDark text-customDark p-[10px] w-[150px] mx-auto text-[20px] mt-[30px] rounded-[4px] cursor-pointer hover:bg-customDark hover:text-white duration-300 ease-in-out">
          View All
        </div>
      </Link>
    </div>
  );
};

export default HomeListing;
