
import HeroSlide from '../components/common/HeroSlide';
import { Box } from '@mui/material';
import uiConfigs from '../api/configs/ui.configs';
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import MediaCard from '../components/common/MediaCard';

const mediaType = {
    phimmoicapnhat: "phim-moi-cap-nhat",
    phimbo: "phim-bo",
    phimle: "phim-le",
    phimhoathinh: "hoat-hinh",
    tvshow: "tv-shows",
    phimmoi: "phim-moi",
};
const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={mediaType.phimmoicapnhat} />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="Phim mới cập nhật">
          <MediaSlide mediaType={mediaType.phimmoi} />
        </Container>

        <Container header="Phim bộ">
          <MediaSlide mediaType={mediaType.phimbo} />
        </Container>

        <Container header="Phim lẻ">
          <MediaSlide mediaType={mediaType.phimle} />
        </Container>

        <Container header="Phim mới phải xem" >
          <MediaCard mediaType={mediaType.phimmoicapnhat} />
        </Container>

        <Container header="Tv Show">
          <MediaSlide mediaType={mediaType.tvshow} />
        </Container>

        <Container header="Phim hoạt hình">
          <MediaSlide mediaType={mediaType.phimhoathinh} />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;