import HeroSlide from '../components/common/HeroSlide';
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import MediaCard from '../components/common/MediaCard';
import Topbar from "@/components/common/Topbar.jsx";

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
    <><Topbar/>
      <HeroSlide mediaType={mediaType.phimmoicapnhat} />

      <div className="mt-[-4rem] max-w-[1366px] mx-auto px-5 md:px-0 pb-20 relative z-10">
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
      </div>
    </>
  );
};

export default HomePage;