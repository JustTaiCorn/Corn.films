import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        style={{ width: "100%", height: "auto" }}
        breakpoints={{
          // Mobile nhỏ (320px+): 2 slides
          320: {
            slidesPerView: 2,
            spaceBetween: 6,
          },
          // Mobile lớn (480px+): 3 slides
          480: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          // Tablet (768px+): 4 slides
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          // Desktop nhỏ (1024px+): 5 slides
          1024: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          // Desktop lớn (1280px+): 6 slides
          1280: {
            slidesPerView: 6,
            spaceBetween: 12,
          },
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default AutoSwiper;