
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box } from '@mui/material';
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.phimmoicapnhat} />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="Phim mới cập nhật">
          <MediaSlide mediaType={tmdbConfigs.phimmoi} />
        </Container>

        <Container header="Phim bộ">
          <MediaSlide mediaType={tmdbConfigs.phimbo} />
        </Container>

        <Container header="Phim lẻ">
          <MediaSlide mediaType={tmdbConfigs.phimle} />
        </Container>

        <Container header="Tv Show">
          <MediaSlide mediaType={tmdbConfigs.tvshow} />
        </Container>

        <Container header="Phim hoạt hình">
          <MediaSlide mediaType={tmdbConfigs.phimhoathinh} />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;