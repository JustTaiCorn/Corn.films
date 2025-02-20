
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { useList } from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import Paginations from "../components/common/Paginations";
const MediaList = () => {
  const { type: mediaType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = parseInt(searchParams.get("page"));
  console.log("currPage", currPage);
  const { isLoading, data } = useList({ mediaType, currPage });
  const dispatch = useDispatch();


  const medias = data?.items || [];
  const totalItems = data?.params?.pagination?.totalItems || 0;
  const totalItemsPerPage = data?.params?.pagination?.totalItemsPerPage || 1;
  const totalPage = Math.ceil(totalItems / totalItemsPerPage);

  const onPageChange = (page) => {
    setSearchParams({ page });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mediaType, currPage]);

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }
    , [isLoading, dispatch]);

  return (
    <>
      {/* <HeroSlide mediaType={type} /> */}
      <Box sx={{ ...uiConfigs.style.mainContent, mt: 20 }}>
        <MediaGrid medias={medias} isLoading={isLoading} />
        <Paginations totalPages={totalPage} onPageChange={onPageChange}
        />
      </Box>
    </>
  )
};

export default MediaList;