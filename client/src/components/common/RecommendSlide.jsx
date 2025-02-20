import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { useSortedMovies } from "../../api/modules/media.api";

const RecommendSlide = ({ category, country, year,
  sort_field,
  page,
  type, }) => {
  const { isLoading, data } = useSortedMovies({
    category, country, year, sort_field, page, type,
  });
  const medias = data?.items;
  if (isLoading) {
    return null;
  }

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;