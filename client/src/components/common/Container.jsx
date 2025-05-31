import { Box, Stack, Typography } from '@mui/material';

const Container = ({ header, children }) => {
  return (
    <Box sx={{
      marginTop: "5rem",
      marginX: "auto",
      color: "text.primary"
    }}>
      <Stack spacing={4}>
        {header && (
          <Box sx={{
            position: "relative",
            paddingX: { xs: "20px", md: 0 },
            maxWidth: "1366px",
            marginX: "auto",
            width: "100%",
            "&::before": {
              content: '""',
              position: "absolute",
              left: { xs: "20px", md: "0" },
              top: "100%",
              height: "5px",
              width: "100px",
              backgroundColor: "primary.main"
            }
          }}>
            <Typography variant="h5" fontWeight="700" textTransform="uppercase"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.5rem" }
              }}>
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;