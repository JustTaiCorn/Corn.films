import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
    <div className="w-full h-max p-0 overflow-hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
        breakpoints={{
          320: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default AutoSwiper;