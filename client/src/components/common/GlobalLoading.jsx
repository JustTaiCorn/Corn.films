import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const GlobalLoading = ({ isLoading }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isLoading) {
      setShouldShow(true);
    } else {
      timeoutId = setTimeout(() => {
        setShouldShow(false);
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-background/90 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[progress_1s_infinite_ease-in-out] bg-primary rounded-full origin-left-right" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;