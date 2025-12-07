const Container = ({ header, children }) => {
  return (
    <div className="mt-20 mx-auto text-foreground">
      <div className="flex flex-col gap-4">
        {header && (
          <div className="relative px-5 md:px-0 max-w-[1366px] mx-auto w-full after:content-[''] after:absolute after:left-5 md:after:left-0 after:top-full after:h-[5px] after:w-[100px] after:bg-primary">
            <h5 className="font-bold uppercase text-xl md:text-2xl">
              {header}
            </h5>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Container;