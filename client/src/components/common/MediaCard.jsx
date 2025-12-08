import { useList } from '../../api/modules/media.api';
import { Swiper, SwiperSlide } from 'swiper/react';

const MediaCard = ({ mediaType }) => {
    const { data } = useList({
        mediaType,
        page: 1
    });
    const medias = data?.items || [];

    return (
        <div className="[&_.swiper-slide]:w-1/2 [&_.swiper-slide]:sm:w-1/2 [&_.swiper-slide]:md:w-1/2 [&_.swiper-slide]:lg:w-[32.5%]">
            <Swiper
                slidesPerView="3"
                spaceBetween={10}
            >
                {medias?.map((media, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[100px] md:h-[280px] cursor-pointer group">
                            {/* Thumbnail Background */}
                            <div className="absolute top-0 left-0 w-full h-[100px] md:h-[200px] rounded-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                                <img
                                    src={`https://img.ophim.live/uploads/movies/${media.thumb_url}`}
                                    alt={media.name}
                                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-105"
                                />
                            </div>

                            {/* Poster and Info Overlay */}
                            <div className="absolute bottom-[20px] left-[10px] right-[10px] z-[5] hidden md:block">
                                <div className="flex flex-col md:flex-row gap-4 p-2.5 rounded-lg bg-transparent">
                                    {/* Small Poster */}
                                    <div className="relative shrink-0">
                                        <img
                                            src={`https://img.ophim.live/uploads/movies/${media.poster_url}`}
                                            alt={`${media.name} poster`}
                                            className="w-[60px] h-[80px] object-cover rounded-md border-2 border-white/30"
                                        />
                                    </div>

                                    {/* Movie Info */}
                                    <div className="flex flex-col gap-0.5 bg-black/50 p-2.5 rounded-lg w-full">
                                        <p className="text-white text-sm font-bold line-clamp-1 overflow-hidden text-ellipsis">
                                            {media.name}
                                        </p>
                                        <p className="text-[#ddd] text-xs line-clamp-1 overflow-hidden text-ellipsis">
                                            {media.origin_name || media.subtitle || ''}
                                        </p>
                                        <div className="flex flex-row flex-wrap gap-2 text-sm text-[#bbb]">
                                            <p  >{media.episode_current}</p>
                                            <p  >{media.year}</p>
                                            <p  >{media.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MediaCard;