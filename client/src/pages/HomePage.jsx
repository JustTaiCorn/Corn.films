
import HeroSlide from '../components/common/HeroSlide';
import MediaType from "../api/configs/tmdb.configs";
import { Box } from '@mui/material';
import uiConfigs from '../api/configs/ui.configs';
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import MediaCard from '../components/common/MediaCard';

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={MediaType.phimmoicapnhat} />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="Phim mới cập nhật">
          <MediaSlide mediaType={MediaType.phimmoi} />
        </Container>

        <Container header="Phim bộ">
          <MediaSlide mediaType={MediaType.phimbo} />
        </Container>

        <Container header="Phim lẻ">
          <MediaSlide mediaType={MediaType.phimle} />
        </Container>

        <Container header="Phim mới phải xem" >
          <MediaCard mediaType={MediaType.phimmoicapnhat} />
        </Container>

        <Container header="Tv Show">
          <MediaSlide mediaType={MediaType.tvshow} />
        </Container>

        <Container header="Phim hoạt hình">
          <MediaSlide mediaType={MediaType.phimhoathinh} />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;