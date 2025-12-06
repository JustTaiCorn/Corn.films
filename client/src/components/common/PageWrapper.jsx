import { useEffect } from "react";


const PageWrapper = ({  children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      children
  );
};

export default PageWrapper;