import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
import { useEffect, useState } from "react";
import getTMDBImages from "../../api/configs/images.config";
import { cn } from "@/lib/utils";

const MediaItem = ({ media, className }) => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (media) {
        const { posters } = await getTMDBImages(media);
        setPosters(posters);
      }
    };

    fetchImages();
  }, [media]);

  const {
    name,
    year,
    slug,
    poster_url,
    time,
    origin_name
  } = media;

  const title = name;
  const posterPath = posters[0]?.file_path
    ? `https://image.tmdb.org/t/p/w500${posters[0].file_path}`
    : `https://img.ophim.live/uploads/movies/${poster_url}`;

  return (
    <div className={cn("p-1 sm:p-2 m-0.5 w-full max-w-full min-h-[300px]  group", className)}>
      <Link to={routesGen.mediaDetail(slug)} className="no-underline block">
        {/* Poster Image */}
        <div className="relative w-full h-[300px]    mb-2 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
          <img
            loading="lazy"
            src={posterPath}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-105"
          />
        </div>

        {/* Text content below poster */}
        <div className="flex flex-col gap-0.5 mt-1 text-center h-[60px] sm:h-[70px]">
          <h6 className="text-primary font-bold text-xs sm:text-sm md:text-base line-clamp-1 overflow-hidden text-ellipsis px-1">
            {title}
          </h6>

          <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm line-clamp-1 overflow-hidden text-ellipsis px-1">
            {origin_name || (time && `${time} - `) || year}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MediaItem;
