import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productInterface } from "../interfaces";
import { Rating } from "@mui/material";

const Listing = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<productInterface[]>();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${params.category}`)
      .then((resp) => {
        setProducts(resp.data.products);
      })
      .catch(() => {
        navigate("/error");
      });
  }, [params.category]);

  return (
    <div className="mb-[50px] font-customFont text-customDark">
      <h2 className="text-center ml-[10px] text-[40px] font-bold mt-[20px]">
        {params?.category?.[0].toUpperCase() +
          `${params?.category?.slice(1, params.category.length)}`}
      </h2>
      <div className="h-[1px] bg-customDark mx-auto w-[50%]"></div>
      <div className="flex flex-wrap justify-center gap-[25px] px-[30px] mt-[20px]">
        {products &&
          products?.map((element: productInterface, index: number) => (
            <div
              className="bg-silver rounded-[5px] cursor-pointer p-[20px] hover:scale-110 duration-300 ease-in-out w-[calc(100%/4)] mt-[20px]"
              key={index}
              onClick={() => {
                navigate(`/product/${element.id}`);
              }}
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Listing;
