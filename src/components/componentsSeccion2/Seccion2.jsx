import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import "./seccion2.css";

const Seccion2 = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      spacing={3}
      style={{
        width: "95%",
        height: "80vh",
        backgroundColor: "#F2F4F8",
        borderRadius: "20px",
        marginTop: isMobile ? "-9%" : "-5%",
        zIndex: 0,
        paddingTop: "5%",
        paddingBottom: "3%",
      }}
    >
      <Stack
        direction={isMobile || isTablet ? "column" : "row"}
        alignItems={"center"}
        spacing={isMobile || isTablet ? 3 : 2}
        justifyContent={"center"}
        style={{ width: "90%", height: isMobile || isTablet ? "70%" : "90%"}}
      >
        <Box
          style={{
            width: isMobile || isTablet ? "100%" : "30%",
            height: isMobile || isTablet ? "60%" : "100%",
            borderRadius: "30px",
            backgroundImage: "url('/images/arenal.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />

        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          spacing={isMobile || isTablet ? 1 : -2}
          style={{ width: isMobile || isTablet ? "100%" : "60%", height: isMobile || isTablet ? "30%" : "100%" }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"flex-start"}
            style={{ width: "90%" }}
          >
            <Typography className="titleBold">UNLEASH</Typography>
            <Typography className="titleLight">
              Discover a world without limits. Where you are chasing sunsets on
              tropical beaches.
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"flex-start"}
            style={{ width: "90%" }}
          >
            <Typography className="titleBold">wanderlust with</Typography>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"flex-start"}
            style={{ width: "90%" }}
          >
            <Typography className="titleLight">
              from breathtaking landscapes to culturaL wonders. The world is
              yours to explore.
            </Typography>
            <Typography className="titleBold">VOLAR</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={isMobile || isTablet ? "column" : "row"}
        alignItems={"center"}
        spacing={isMobile || isTablet ? 3 : 2}
        justifyContent={"flex-end"}
        style={{ width: "82.5%", height: isMobile || isTablet ? "40%" : "20%" }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          justifyContent={"center"}
          style={{
            width: isMobile || isTablet ? "100%" : "40%",
            height: isMobile || isTablet ? "30%" : "100%",
            backgroundColor: "#DDDDDE",
            borderRadius: isMobile ? "20px" : "30px",
          }}
        >
          <Typography className="textRed">20% OFF</Typography>
          <Typography className="textBlack">till 15th of August</Typography>
        </Stack>

        <Box
          style={{
            width: isMobile || isTablet ? "100%" : "80%",
            height: isMobile || isTablet ? "60%" : "100%",
            borderRadius: "30px",
            backgroundImage: "url('/images/ballena.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />
      </Stack>


    </Stack>
  );
};

export default Seccion2;
