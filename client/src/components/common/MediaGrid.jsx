import MediaItem from "./MediaItem";

const MediaGrid = ({ medias }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 px-4">
      {medias?.map((media, index) => (
        <div key={index}>
          <MediaItem media={media} />
        </div >
      ))}
    </div>
  );
};

export default MediaGrid;