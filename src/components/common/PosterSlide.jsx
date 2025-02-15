import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import React from "react";

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box sx={{
            paddingTop: "160%",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.file_path})`
          }} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default React.memo(PosterSlide);