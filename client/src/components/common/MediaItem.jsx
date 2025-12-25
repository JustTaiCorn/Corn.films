import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
import { useEffect, useState } from "react";
import getTMDBImages from "../../api/configs/images.config";
import { cn } from "@/lib/utils";

const MediaItem = ({ media, className }) => {
  const {
    name,
    year,
    slug,
    poster_url,
    time,
    origin_name
  } = media;

  const title = name;
  const posterPath =
    `https://img.ophim.live/uploads/movies/${poster_url}`;

  return (
    <div className={cn("w-full group", className)}>
      <Link to={routesGen.mediaDetail(slug)} className="no-underline block">
        {/* Poster Image - Aspect ratio 2:3 (chuẩn poster phim) */}
        <div className="relative w-full aspect-[2/3] mb-2 overflow-hidden rounded-lg shadow-md">
          <img
            loading="lazy"
            src={posterPath}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-105"
          />
        </div>

        {/* Text content below poster */}
        <div className="flex flex-col gap-0.5 mt-1 text-center min-h-[45px] sm:min-h-[50px]">
          <h6 className="text-primary font-bold text-xs sm:text-sm line-clamp-2 overflow-hidden px-1">
            {title}
          </h6>

          <p className="text-muted-foreground text-[10px] sm:text-xs line-clamp-1 overflow-hidden px-1">
            {origin_name || (time && `${time} - `) || year}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MediaItem;