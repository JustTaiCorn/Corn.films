import { Play, ChevronRight } from "lucide-react";
import { Autoplay, Thumbs, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { routesGen } from "../../routes/routes";
import { useList } from "../../api/modules/media.api";
import { useState } from "react";
import GlobalLoading from "../common/GlobalLoading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSlide = ({ mediaType }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const { isLoading, data } = useList({
    mediaType,
    page: 1
  });

  const movies = data?.items || [];
  if (isLoading) {
    return (
      <GlobalLoading isLoading={isLoading} />
    );
  }

  return (
    <div className="relative">
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay, Thumbs, Navigation]}
        navigation={false}
        style={{ width: "100%", height: "max-content" }}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie, index) => {
            const thumbUrl = movie.thumb_url
              ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
              : "https://via.placeholder.com/500x750";
            return (
              <SwiperSlide key={index}>
                <div className="w-full relative h-[450px] md:h-[850px] ">
                  <img
                    src={thumbUrl}
                    alt={movie.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent " />
                </div>
                <div className="absolute top-[50px] left-0 w-full h-full pl-6 md:pl-0 px-2 sm:px-[10px] md:px-20 lg:px-20">
                  <div className="h-full flex items-center w-[90%] md:w-[35%] lg:w-[45%] text-foreground">
                    <div className="flex flex-col gap-2 sm:gap-4">
                      {/* title */}
                      <h3 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight">
                        {movie.name}
                      </h3>
                      <p className="text-xs md:text-sm lg:text-base font-normal line-clamp-2">
                        {movie.origin_name}
                      </p>

                      <div className="flex flex-row gap-2 flex-wrap">
                        {[movie.quality, movie.year, movie.lang, movie.episode_current].map((label, i) => (
                          label && (
                            <Badge key={i} variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5 h-auto font-normal rounded-sm">
                              {label}
                            </Badge>
                          )
                        ))}
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        {movie?.category?.map((theLoai, index) => (
                          <Badge
                            key={index}
                            className="bg-primary text-primary-foreground text-[10px] sm:text-xs px-2 py-0.5 h-auto font-normal rounded-sm hover:bg-primary/90"
                          >
                            {theLoai?.name}
                          </Badge>
                        ))}
                      </div>

                      {/* buttons */}
                      <div className="flex flex-row gap-2 items-center mt-2">
                        <Button
                          size="lg"
                          asChild
                          className="text-xs sm:text-sm md:text-base px-4 py-2 h-auto"
                        >
                          <Link to={`${routesGen.mediaWatch(movie.slug)}#player`}>
                            <Play className="mr-2 h-4 w-4" />
                            Watch now
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          asChild
                          className="text-xs sm:text-sm md:text-base px-4 py-2 h-auto text-foreground border-primary hover:bg-primary/10"
                        >
                          <Link to={routesGen.mediaDetail(movie.slug)}>
                            Xem chi tiết
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div className="text-center py-4">
            <span className="text-foreground">Không có dữ liệu</span>
          </div>
        )}
      </Swiper>

      <div className="hidden md:block absolute right-0 bottom-[50px] mr-2 w-[40%] h-[50px] bg-transparent z-[100] rounded-l-[5px]">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          loop={true}
        >
          {movies.map((movie, index) => {
            const thumbUrl = movie.thumb_url
              ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
              : "https://via.placeholder.com/500x750";
            return (
              <SwiperSlide key={index}
                className={index === activeIndex ? "swiper-slide-thumb-active" : ""}
                onClick={() => handleThumbnailClick(index)}
              >
                <div className={`border-2 border-transparent hover:border-white rounded p-0.5 transition-all ${index === activeIndex ? 'border-primary' : ''}`}>
                  <img src={thumbUrl} alt={movie.name}
                    className="w-full h-[50px] object-cover rounded cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlide;
