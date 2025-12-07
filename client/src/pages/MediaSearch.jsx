import { useState, useEffect, useCallback } from "react";
import { useSearch } from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";

const MediaSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debounceSearch = useCallback(
    debounce((query) => {
      setDebouncedQuery(query);
    }, 500),
    []
  );

  const { data, isLoading } = useSearch({
    query: debouncedQuery,
    enabled: !!debouncedQuery.trim()
  });

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    if (newQuery.trim().length >= 3) {
      debounceSearch(newQuery.trim());
    } else {
      setDebouncedQuery("");
    }
  };

  useEffect(() => {
    return () => debounceSearch.cancel();
  }, [debounceSearch]);

  return (
    <div className="mt-20 max-w-[1366px] mx-auto text-foreground px-5 md:px-0 min-h-screen">
      <div className="flex flex-col gap-8 w-full">
        <Input
          placeholder="Tìm kiếm phim..."
          className="w-full h-12 text-lg"
          autoFocus
          value={searchQuery}
          onChange={onQueryChange}
        />

        {debouncedQuery && (
          <MediaGrid
            medias={data?.items || []}
            isLoading={isLoading} // MediaGrid likely ignores this prop in pure tailwind version if not handled, but good to keep
          />
        )}
      </div>
    </div>
  );
};

export default MediaSearch;