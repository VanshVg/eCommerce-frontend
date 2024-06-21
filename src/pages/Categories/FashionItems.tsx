import { Helmet } from "react-helmet";
import HomeListing from "../../components/home/HomeListing";

const FashionItems = () => {
  return (
    <div>
      <Helmet>
        <title>Fashion Items</title>
      </Helmet>
      <HomeListing title={"Tops"} url={"tops"} />
      <HomeListing title={"Women's Dresses"} url={"womens-dresses"} />
      <HomeListing title={"Men's Shirts"} url={"mens-shirts"} />
      <HomeListing title={"Men's Watches"} url={"mens-watches"} />
      <HomeListing title={"Women's Watches"} url={"womens-watches"} />
      <HomeListing title={"Men's Shoes"} url={"mens-shoes"} />
      <HomeListing title={"Women's Shoes"} url={"womens-shoes"} />
    </div>
  );
};

export default FashionItems;
