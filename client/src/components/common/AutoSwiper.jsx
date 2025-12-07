import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
    <div className="w-full h-max p-0 overflow-hidden">
      <Swiper
        slidesPerView= "6"
        spaceBetween={10}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default AutoSwiper;