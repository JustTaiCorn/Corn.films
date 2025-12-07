import { useEffect } from "react";

import { useParams, useSearchParams } from "react-router-dom";
import { useList } from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import Paginations from "../components/common/Paginations";

const MediaList = () => {
  const { type: mediaType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = parseInt(searchParams.get("page")) || 1;
  const { isLoading, data } = useList({ mediaType, currPage });


  const medias = data?.items || [];
  const totalItems = data?.params?.pagination?.totalItems || 0;
  const totalItemsPerPage = data?.params?.pagination?.totalItemsPerPage || 10; // Default to 10 if undefined
  const totalPage = Math.ceil(totalItems / totalItemsPerPage) || 1;

  const onPageChange = (page) => {
    setSearchParams({ page });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mediaType, currPage]);


  return (
    <div className="mt-20 max-w-[1366px] mx-auto text-foreground">
      <MediaGrid medias={medias} />
      {totalPage > 1 && (
        <Paginations
          currentPage={currPage}
          totalPages={totalPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
};

export default MediaList;