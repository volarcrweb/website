import { Box, Button, Stack, Typography, Menu, MenuItem, useMediaQuery } from "@mui/material";
import "./seccion1.css";
import { useContext, useState } from "react";
import { LanguageContext } from "../LanguageProvider";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const Seccion1 = () => {
  const { translation, toggleLanguage } = useContext(LanguageContext);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [location, setLocation] = useState("");
  const [dateOption, setDateOption] = useState("");
  const [people, setPeople] = useState("");

  const [anchorLocation, setAnchorLocation] = useState(null);
  const [anchorDate, setAnchorDate] = useState(null);
  const [anchorPeople, setAnchorPeople] = useState(null);

  const locationOptions = ["San José", "Tamarindo", "La Fortuna", "Monteverde"];
  const dateOptions = ["15 minutes", "30 minutes", "1 hour", "2+ hours"];
  const peopleOptions = ["1 person", "2 people", "3 people", "4+ people"];

  const handleOpenLocation = (event) => setAnchorLocation(event.currentTarget);
  const handleOpenDate = (event) => setAnchorDate(event.currentTarget);
  const handleOpenPeople = (event) => setAnchorPeople(event.currentTarget);

  const handleCloseLocation = () => setAnchorLocation(null);
  const handleCloseDate = () => setAnchorDate(null);
  const handleClosePeople = () => setAnchorPeople(null);
  return (
    <Stack style={{paddingTop:isMobile ? "2%" : "0.5%", paddingLeft:isMobile ? "2%" : "1%", paddingRight:isMobile ? "1%" : "0%", height: "100%", width: isMobile ? "99%" : "100%"}}>
    <Stack
      style={{
        width: "99%",
        height: isMobile ? "80vh" : "90vh",
        paddingTop: isMobile ? "0%" : "0%",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Box
        className="videobackground"
        component="video"
        src="/images/video-horizontal.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <Box
        style={{
          backgroundColor: "rgba(76, 76, 78, 0.45)",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
<Stack spacing={20}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        style={{ width: "95%", zIndex: 1, paddingLeft: "2.5%", paddingRight: "2.5%" }}
      >
        <img src="/images/logo.png" alt="logo" style={{ width: isMobile ? "25%" : isTablet ? "20%" : "7%" }} />

        <Button className='btnTranslate' onClick={toggleLanguage}>
        <img src={translation.buttonText} style={{width:"69%"}}/>
      </Button>

      </Stack>


      <Stack spacing={isMobile || isTablet ? 9 : 4} style={{zIndex:1, paddingLeft: isMobile || isTablet ? "2%" : "3%"}}>
        <Stack spacing={1}>
        <Stack>

        <Typography className="title1" variant="h1">
            Discover New
        </Typography>
        <Typography className="title2" variant="h1">
            Horizons
        </Typography>
        </Stack>

        <Typography className="title3" variant="h2">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </Typography>
        </Stack>
        <Stack spacing={isMobile || isTablet ? 0.5 : 1} style={{backgroundColor:"#F2F4F8", width: isMobile || isTablet ? "90%" : "45%", borderRadius: isMobile || isTablet ? "10px" : "20px", padding:isMobile || isTablet ? "1.5% 2%" : "1% 1%"}} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>

          <Stack spacing={0.5} style={{flex: 1, cursor: "pointer"}} onClick={handleOpenLocation}>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Typography style={{fontSize: isMobile ? "0.7rem" : "14px", fontWeight: "600", color: "#374151"}}>Location</Typography>
              <KeyboardArrowDownRoundedIcon style={{color: "#134A4B", fontSize: 25}} />
            </Stack>
            <Typography style={{fontSize: isMobile ? "0.6rem" : "1rem", color: "#9CA3AF"}}>{location || "Your destination"}</Typography>
          </Stack>

          <Stack spacing={0.5} style={{flex: 1, cursor: "pointer"}} onClick={handleOpenDate}>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Typography style={{fontSize: isMobile ? "0.7rem" : "14px", fontWeight: "600", color: "#374151"}}>Duration</Typography>
              <KeyboardArrowDownRoundedIcon style={{color: "#134A4B", fontSize: 25}} />
            </Stack>
            <Typography style={{fontSize: isMobile ? "0.6rem" :"1rem", color: "#9CA3AF"}}>{dateOption || "When does it start?"}</Typography>
          </Stack>

          <Stack spacing={0.5} style={{flex: 1, cursor: "pointer"}} onClick={handleOpenPeople}>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Typography style={{fontSize: isMobile ? "0.7rem" : "14px", fontWeight: "600", color: "#374151"}}>People</Typography>
              <KeyboardArrowDownRoundedIcon style={{color: "#134A4B", fontSize: 25}} />
            </Stack>
            <Typography style={{fontSize: isMobile ? "0.6rem" : "1rem", color: "#9CA3AF"}}>{people || "How many people?"}</Typography>
          </Stack>

          <Button className="btnExplore" >
            {isMobile || isTablet ? <img src="/images/search.svg" alt="search" style={{width: "20px", height: "20px"}}/> : "Explore Now"}
          </Button>

        </Stack>
        {/* Menús desplegables */}
        <Menu anchorEl={anchorLocation} open={Boolean(anchorLocation)} onClose={handleCloseLocation} transformOrigin={{ horizontal: "left", vertical: "top" }} anchorOrigin={{ horizontal: "left", vertical: "bottom" }} disableScrollLock>
          {locationOptions.map((opt) => (
            <MenuItem key={opt} onClick={() => { setLocation(opt); handleCloseLocation(); }}>{opt}</MenuItem>
          ))}
        </Menu>
        <Menu anchorEl={anchorDate} open={Boolean(anchorDate)} onClose={handleCloseDate} transformOrigin={{ horizontal: "left", vertical: "top" }} anchorOrigin={{ horizontal: "left", vertical: "bottom" }} disableScrollLock>
          {dateOptions.map((opt) => (
            <MenuItem key={opt} onClick={() => { setDateOption(opt); handleCloseDate(); }}>{opt}</MenuItem>
          ))}
        </Menu>
        <Menu anchorEl={anchorPeople} open={Boolean(anchorPeople)} onClose={handleClosePeople} transformOrigin={{ horizontal: "left", vertical: "top" }} anchorOrigin={{ horizontal: "left", vertical: "bottom" }} disableScrollLock>
          {peopleOptions.map((opt) => (
            <MenuItem key={opt} onClick={() => { setPeople(opt); handleClosePeople(); }}>{opt}</MenuItem>
          ))}
        </Menu>
      



      </Stack>

      </Stack>





    </Stack>
    </Stack>
  );
};

export default Seccion1;
