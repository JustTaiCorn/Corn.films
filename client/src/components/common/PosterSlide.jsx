import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import React from "react";

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="pt-[160%] bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.file_path})` }}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default React.memo(PosterSlide);