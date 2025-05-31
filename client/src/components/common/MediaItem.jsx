import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
import { useEffect, useState } from "react";
import getTMDBImages from "../../api/configs/images.config";

const MediaItem = ({ media }) => {
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
    <Box sx={{
      padding: { xs: 0.5, sm: 0.75, md: 1 },
      margin: { xs: 0.25, sm: 0.5, md: 0.75 },
      maxWidth: { xs: "80%", sm: "100%", md: "100%" },
      "&:hover": {
        "& img": {
          filter: "brightness(0.7)",
        },
      },
    }}>
      <Link to={routesGen.mediaDetail(slug)} style={{ textDecoration: 'none' }}>
        {/* Poster Image */}
        <Box sx={{
          position: 'relative',
          width: '100%',
          height: { xs: "160px", sm: "220px", md: "280px", lg: "300px" },
          marginBottom: 1,
          overflow: "hidden",
          borderRadius: { xs: 2, sm: 3 },
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
          <img
            src={posterPath}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit',
              transition: "all 0.3s ease",
            }}
          />
        </Box>

        {/* Text content below poster */}
        <Stack spacing={0.5} sx={{ mt: 1, textAlign: 'center', height: { xs: "60px", sm: "70px" } }}>
          <Typography
            variant="body1"
            fontWeight="700"
            color="primary"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: '#aaa',
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {origin_name || time && `${time} - ` || year}
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
};

export default MediaItem;