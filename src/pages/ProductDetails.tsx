import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { productDetailsInterface } from "../interfaces";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  const params = useParams();

  const [productData, setProductData] = useState<productDetailsInterface>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then((resp) => {
        setProductData(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  const increaseQuantity = (): void => {
    if (quantity !== productData?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = (): void => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="text-customDark font-customFont pb-[50px]">
      <div className="mt-[50px] flex justify-center gap-[70px]">
        <div className="w-[30%] ml-[50px]">
          <Carousel className="bg-silver">
            {productData &&
              productData.images?.map((element: string, index: number) => {
                return (
                  <img
                    src={element}
                    key={index}
                    className="max-w-[300px] h-[340px] mx-auto"
                  />
                );
              })}
          </Carousel>
        </div>
        <div className="w-[50%]">
          <h1 className="text-[40px] text-left -mt-[15px] max-w-[500px]">
            {productData?.title}
          </h1>
          <p className="text-left text-[18px] mt-[5px] font-bold">
            Brand: {productData?.brand}
          </p>
          <div className="flex mt-[8px]">
            {productData?.rating}{" "}
            <span className="ml-[5px]">
              <Rating
                value={productData?.rating || 5}
                precision={0.5}
                readOnly
              />
            </span>
          </div>
          <div className="h-[1px] bg-customDark max-w-[67%] mt-[10px]"></div>
          <div className="text-left mt-[5px]">
            <p>
              Discount:{" "}
              <span className="text-red ml-[5px] text-[22px]">
                -{productData?.discountPercentage}%
              </span>
              <p>
                Price:{" "}
                <span className="line-through">
                  $
                  {(
                    (productData?.price as number) +
                    ((productData?.price as number) *
                      (productData?.discountPercentage as number)) /
                      100
                  ).toFixed(2)}
                </span>
                <span className="text-[25px] ml-[10px]">
                  ${productData?.price}
                </span>
              </p>
            </p>
            <div className="flex justify-between max-w-[67%]">
              {(productData?.stock as number) < 10 ? (
                <p className="text-red text-[20px] mt-[10px]">
                  Hurry Up! Only {productData?.stock} available
                </p>
              ) : (
                <p className="text-green mt-[10px] text-[18px]">In Stocks</p>
              )}
              <div className="mt-[15px]">
                <p className="flex">
                  {" "}
                  <span className="font-bold">Quantity:</span>
                  <img
                    src="/icons/minus.svg"
                    className="ml-[10px] mr-[15px] cursor-pointer"
                    onClick={decreaseQuantity}
                  />{" "}
                  <span className="text-[20px] -mt-[5px]">{quantity} </span>{" "}
                  <img
                    src="/icons/plus.svg"
                    className="ml-[15px] cursor-pointer"
                    onClick={increaseQuantity}
                  />
                </p>
              </div>
            </div>
            <div className="mt-[30px] flex gap-[15px] max-w-[67%]">
              <div className="border-[1px] py-[10px] cursor-pointer border-customDark w-[150px] text-center duration-300 ease-in-out hover:scale-110">
                Add to cart
              </div>
              <div className="border-[1px] bg-customDark text-white py-[10px] cursor-pointer border-customDark w-[150px] text-center duration-300 ease-in-out hover:scale-110">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[81%] mx-auto">
        <div>
          <h2 className="text-left mt-[30px] text-[25px]">
            Product Description:
          </h2>
          <div className="h-[1px] bg-customDark max-w-[85%]" />
          <div className="text-left max-w-[85%] mt-[5px]">
            {productData?.description}
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-left mt-[30px] text-[25px]">
            Extra Information:
          </h2>
          <div className="h-[1px] bg-customDark max-w-[85%]" />
          <p className="text-[17px] mt-[5px]">
            <span className="text-[18px] font-bold mr-[5px]">
              Return Policy:
            </span>{" "}
            {productData?.returnPolicy}
          </p>
          <p className="text-[17px]">
            <span className="text-[18px] font-bold mr-[5px]">Warranty:</span>{" "}
            {productData?.warrantyInformation}
          </p>
          <p className="text-[17px]">
            <span className="text-[18px] font-bold mr-[5px]">
              Shipping Information:
            </span>{" "}
            {productData?.shippingInformation}
          </p>
        </div>
        <div>
          <h2 className="text-left mt-[30px] text-[25px]">Product Details:</h2>
          <div className="h-[1px] bg-customDark max-w-[85%]" />
          <div className="text-left max-w-[85%] mt-[5px]">
            <p className="text-[17px] mt-[5px]">
              <span className="text-[18px] font-bold mr-[5px]">
                Product Name:
              </span>
              {productData?.title}
            </p>
            <p className="text-[17px] mt-[5px]">
              <span className="text-[18px] font-bold mr-[5px]">
                Product Brand:
              </span>
              {productData?.brand}
            </p>
            <p className="text-[17px] mt-[5px]">
              <span className="text-[18px] font-bold mr-[5px]">
                Product Category:
              </span>
              {productData?.category}
            </p>
            <p className="text-[17px] mt-[5px]">
              <span className="text-[18px] font-bold mr-[5px]">
                Product Width:
              </span>
              {productData?.dimensions.width}
            </p>
            <p className="text-[17px] mt-[5px]">
              <span className="text-[18px] font-bold mr-[5px]">
                Product Height:
              </span>
              {productData?.dimensions.height}
            </p>
            <p className="text-[17px] mt-[5px]">
              <span className="text-[18px] font-bold mr-[5px]">
                Product Depth:
              </span>
              {productData?.dimensions.depth}
            </p>
          </div>
          <div>
            <h2 className="text-left mt-[30px] text-[25px]">
              Customer Reviews:
            </h2>
            <div className="h-[1px] bg-customDark max-w-[85%]" />
            <div className="text-left max-w-[85%] mt-[5px]">
              {productData?.reviews.map((element, index: number) => {
                return (
                  <div className="mt-[10px]">
                    <div className="flex">
                      <p className="text-[18px] font-bold">
                        {element.reviewerName}
                      </p>
                      <p className="ml-[8px]">
                        <Rating value={element.rating} readOnly />{" "}
                      </p>
                    </div>
                    <p className="-mt-[5px]">{element.comment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
