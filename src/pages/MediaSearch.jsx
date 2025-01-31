import { Box, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useSearch } from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import debounce from "lodash.debounce"; // Thêm thư viện debounce

const MediaSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Triển khai debounce đúng cách
  const debounceSearch = useCallback(
    debounce((query) => {
      setDebouncedQuery(query);
    }, 500),
    []
  );

  const { data, isLoading } = useSearch({
    query: debouncedQuery,
    enabled: !!debouncedQuery.trim() // Thêm điều kiện kích hoạt
  });
  console.log(data);
  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    // Chỉ debounce khi có nội dung hợp lệ
    if (newQuery.trim().length >= 3) {
      debounceSearch(newQuery.trim());
    } else {
      setDebouncedQuery(""); // Reset kết quả tìm kiếm
    }
  };

  // Cleanup debounce khi unmount
  useEffect(() => {
    return () => debounceSearch.cancel();
  }, [debounceSearch]);

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <TextField
            color="success"
            placeholder="Tìm kiếm phim"
            sx={{ width: "100%" }}
            autoFocus
            value={searchQuery}
            onChange={onQueryChange}
          />

          {/* Chỉ hiển thị khi có query hợp lệ */}
          {debouncedQuery && (
            <MediaGrid
              medias={data?.items || []}
              isLoading={isLoading}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;