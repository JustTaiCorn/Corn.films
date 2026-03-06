import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-background/90 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-16 w-16 text-primary" />
      </div>
    </div>
  );
};

export default GlobalLoading;