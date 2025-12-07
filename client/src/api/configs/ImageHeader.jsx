const ImageHeader = ({ imgPath }) => {
  return (
    <div
      className="relative z-0 pt-[60%] sm:pt-[40%] md:pt-[35%] bg-center bg-cover bg-fixed before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-background before:to-transparent"
      style={{ backgroundImage: `url(${imgPath})` }}
    />
  );
};

export default ImageHeader;