import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {[...backdrops].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box sx={{
            paddingTop: "60%",
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.file_path})`
          }} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;