import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value }) => {
  const ratingValue = value;
  return (
    <Box sx={{
      position: "relative",
      display: "inline-block",
      width: "max-content"
    }}>
      <CircularProgress variant="determinate" value={value * 10} color={ratingValue > 0 ? "success" : "error"} size={50} />
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{ marginTop: "-5px" }}
        >
          {value === 0 || isNaN(value) ?
            (<><Typography variant="caption" color="error" fontSize={25}>💩</Typography></>)
            :
            Math.floor(value * 10) / 10
          }
        </Typography>
      </Box>
    </Box >
  );
};

export default CircularRate;