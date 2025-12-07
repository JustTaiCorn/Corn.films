import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { useList } from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";


const MediaSlide = ({ mediaType }) => {

  const { isLoading, data } = useList({
    mediaType,
    page: 1
  });
  const medias = data?.items;
  return (
    <AutoSwiper>
      {medias?.map((media, index) => (
        <SwiperSlide key={index} >
          <MediaItem media={media} isLoading={isLoading} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;