import Carousel from "react-material-ui-carousel";

const Slider = () => {
  return (
    <div className="mt-[25px] w-[100%] mx-auto">
      <Carousel>
        <div className="w-full flex h-[500px]">
          <div className="w-[40%] pl-[30px] bg-silver italic font-customFont text-customDark font-bold text-[60px]">
            <p className="mt-[20%]">Quality Electronic</p>
            <p>Products At</p>
            <p className="underline">Affordable Prices.</p>
            <div className="border-[1px] border-customDark rounded-[5px] mt-[20px] w-[70%] text-[40px] mx-auto cursor-pointer hover:bg-customDark hover:text-silver duration-300 ease-in-out">
              Shop Devices
            </div>
          </div>
          <img
            src="/backgrounds/gadgetsBg.jpg"
            className="mx-auto w-[60%] object-fill"
            alt="image1"
          />
        </div>
        <div className="w-full flex h-[500px]">
          <img
            src="/backgrounds/clothesBg.jpg"
            className="mx-auto w-[60%] object-fill"
            alt="image2"
          />
          <div className="w-[40%] bg-silver italic font-customFont text-customDark font-bold text-[60px]">
            <div className="mt-[30%]">
              Wear the <span className="underline">Best.</span>
            </div>
            <div className="border-[1px] border-customDark rounded-[5px] mt-[20px] w-[70%] text-[40px] mx-auto cursor-pointer hover:bg-customDark hover:text-silver duration-300 ease-in-out">
              Shop Clothes
            </div>
          </div>
        </div>
        <div className="w-full flex h-[500px]">
          <div className="w-[60%] bg-silver italic font-customFont text-customDark font-bold text-[55px]">
            <p className="mt-[10%]">
              <span className="underline">Unique</span> and{" "}
              <span className="underline">exquisite</span>
            </p>
            <p> jewellery for the</p>
            <p>discerning customer.</p>
            <div className="border-[1px] border-customDark rounded-[5px] mt-[20px] w-[70%] text-[40px] mx-auto cursor-pointer hover:bg-customDark hover:text-silver duration-300 ease-in-out">
              Shop Jewellery
            </div>
          </div>
          <img
            src="/backgrounds/jewelleryBg.jpg"
            className="mx-auto w-[40%] object-fill"
            alt="image3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
