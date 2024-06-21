import { Helmet } from "react-helmet";
import HomeListing from "../../components/home/HomeListing";

const Devices = () => {
  return (
    <div>
      <Helmet>
        <title>Devices</title>
      </Helmet>
      <HomeListing title={"Tablets"} url={"tablets"} />
      <HomeListing title={"Mobile Accessories"} url={"mobile-accessories"} />
      <HomeListing title={"Laptops"} url={"laptops"} />
    </div>
  );
};

export default Devices;
