import { Paper, Box, LinearProgress, Toolbar, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { LoadingButton } from "@mui/lab";

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
    <Paper sx={{
      transition: "all .3s ease",
      position: "fixed",
      width: "100vw",
      height: "100vh",
      zIndex: 999
    }}>
      <Toolbar />
      <LinearProgress />
      <Box sx={{
        position: "absolute",
        margin: "auto",
        top: "50%",
        left: "40%",

      }}>
        <CircularProgress size={100} />
      </Box>
    </Paper>
  );
};

export default GlobalLoading;