import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import CircularRate from "./CircularRate";


const MediaItem = ({ media }) => {
  console.log("MediaItem", media);
  const {
    name,
    year,
    slug,
    poster_url,
    tmdb,
    time
    // id
  } = media;

  const title = name;
  const rate = tmdb?.vote_average;
  // const mediaId = id;
  const posterPath = poster_url
    ? `https://img.ophim.live/uploads/movies/${poster_url}`
    : "https://via.placeholder.com/500x750";
  return (
    <Link to={routesGen.mediaDetail(slug)}>
      <Box sx={{
        ...uiConfigs.style.backgroundImage(posterPath),
        paddingTop: "160%",
        "&:hover .media-info": { opacity: 1, bottom: 0 },
        "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
        color: "primary.contrastText"
      }}>

        {/* Background overlay */}
        <Box className="media-back-drop" sx={{
          opacity: { xs: 1, md: 0 },
          transition: "all 0.3s ease",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
        }} />

        {/* Play button */}
        <Button
          className="media-play-btn"
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            display: { xs: "none", md: "flex" },
            opacity: 0,
            transition: "all 0.3s ease",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "& .MuiButton-startIcon": { marginRight: "-4px" }
          }}
        />

        {/* Media info */}
        <Box
          className="media-info"
          sx={{
            transition: "all 0.3s ease",
            opacity: { xs: 1, md: 0 },
            position: "absolute",
            bottom: { xs: 0, md: "-20px" },
            width: "100%",
            height: "max-content",
            boxSizing: "border-box",
            padding: { xs: "10px", md: "2rem 1rem" }
          }}
        >
          <Stack spacing={{ xs: 1, md: 2 }}>
            {rate && <CircularRate value={rate} />}

            <Typography>{time} - {year}</Typography>

            <Typography
              variant="body1"
              fontWeight="700"
              sx={{
                fontSize: "1rem",
                ...uiConfigs.style.typoLines(1, "left")
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default MediaItem;