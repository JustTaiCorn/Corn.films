import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { useList } from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

const MediaSlide = ({ mediaType }) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useList({
    mediaType,
    page: 1
  });

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  const medias = data?.items;

  return (
    <AutoSwiper>
      {medias?.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} isLoading={isLoading} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;