import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import Slider from "../components/Slider";
import { productInterface } from "../interfaces";
import HomeListing from "../components/home/HomeListing";

const Home = () => {
  const [products, setProducts] = useState<productInterface[]>();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((resp) => {
        if (resp.data) {
          setProducts(resp.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Slider />
      <div>
        <HomeListing title={"Men's Shirts"} url={"mens-shirts"} />
        <HomeListing title={"Laptops"} url={"laptops"} />
        <HomeListing title={"Women's Shoes"} url={"womens-shoes"} />
        <HomeListing title={"Home Decoration"} url={"home-decoration"} />
      </div>
      <div className="w-full bg-customDark text-silver text-center py-[8px]">
        All rights are reserved by team Vansh @2024
      </div>
    </div>
  );
};

export default Home;
