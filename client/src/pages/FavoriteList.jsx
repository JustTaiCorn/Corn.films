import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({ favoriteId: media.mediaId });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove favorite success");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <MediaItem media={media} />
      <Button
        className="w-full bg-red-600 hover:bg-red-700"
        onClick={onRemove}
        disabled={onRequest}
      >
        {onRequest ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
        remove
      </Button>
    </div>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));
      if (err) toast.error(err.message);
      if (response) {
        const transformedMedias = response.data.favorites.map(item => ({
          name: item.mediaTitle,
          poster_url: item.mediaPoster,
          rate: item.mediaRate,
          slug: item.mediaSlug,
          mediaId: item.mediaId,
          time: item.mediaTime,
          year: item.mediaYear,
          id: item.id // Ensure ID works for removal filtering
        }));

        setCount(transformedMedias.length);
        setMedias([...transformedMedias]);
        setFilteredMedias([...transformedMedias].splice(0, skip));
      }
    };

    getFavorites();
  }, []);

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter(e => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <div className="mt-20 max-w-[1366px] mx-auto px-5 md:px-0 text-foreground">
      <Container header={`Your favorites (${count})`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMedias.map((media, index) => (
            <div key={index}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </div>
          ))}
        </div>
        {filteredMedias.length < medias.length && (
          <div className="flex justify-center mt-8">
            <Button variant="secondary" onClick={onLoadMore}>load more</Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FavoriteList;