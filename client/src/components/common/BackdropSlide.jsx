import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {[...backdrops].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="pt-[60%] bg-top bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.file_path})` }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;