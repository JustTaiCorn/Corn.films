const uiConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        backgroundImage:
          "linear-gradient(to top, rgba(18, 18, 18,1), rgba(0,0,0,0))",
      },
      light: {
        backgroundImage:
          "linear-gradient(to top, rgba(255,255,255,2), rgba(0,0,0,0))",
      },
    },
    mainContent: {
      maxWidth: "1366px",
      margin: "auto",
      padding: 2,
      width: "100%",
      minHeight: "100vh",
      boxSizing: "border-box",
    },
    backgroundImage: (imgPath) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url(${imgPath})`,
    }),
  },

};

export default uiConfigs;
