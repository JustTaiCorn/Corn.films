import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

const NavigationSwiper = ({ children }) => {
  return (
    <div className="pb-12 bg-background [&_.swiper-slide]:w-full [&_.swiper-slide]:opacity-60 [&_.swiper-slide]:pb-12 [&_.swiper-slide-active]:opacity-100 [&_.swiper-pagination-bullet]:bg-foreground [&_.swiper-button-next]:text-foreground [&_.swiper-button-prev]:text-foreground [&_.swiper-button-next::after]:text-base [&_.swiper-button-next::after]:md:text-2xl [&_.swiper-button-prev::after]:text-base [&_.swiper-button-prev::after]:md:text-2xl [&_.swiper]:px-4 [&_.swiper]:md:px-16 text-foreground">
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default NavigationSwiper;