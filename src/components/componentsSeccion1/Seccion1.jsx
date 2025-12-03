import { Box, Button, Stack, Typography, Menu, MenuItem, useMediaQuery, Dialog, DialogContent } from "@mui/material";
import "./seccion1.css";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../LanguageProvider";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Form from "../componentsForm/Form";

const Seccion1 = () => {
  const { translation } = useContext(LanguageContext);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [location, setLocation] = useState("");
  const [dateOption, setDateOption] = useState("");
  const [people, setPeople] = useState("");

  const [anchorLocation, setAnchorLocation] = useState(null);
  const [anchorDate, setAnchorDate] = useState(null);
  const [anchorPeople, setAnchorPeople] = useState(null);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [isPeopleMenuOpen, setIsPeopleMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const locationOptions = [translation.filter.Aeropuerto+" Tobias Bolanos", translation.filter.Aeropuerto+" Juan Santamaría", translation.filter.Aeropuerto+" Daniel Oduber Quirós", "Los sueños", "Papagayo", "Quepos", "Limón" ,"Santa Teresa", "Nosara", "Tamarindo", "Cobano","Tango Mar","Montezuma","Jaco","Uvita", "Palma Sur","Drake","Golfito","Laurel","San Vito", "Jimenez","Fortuna", "Los Chiles", "Puerto Viejo", "Hacienda Altagracias", "Tortuguero"];
  const dateOptions = [translation.filter.Aeropuerto+" Tobias Bolanos", translation.filter.Aeropuerto+" Juan Santamaría", translation.filter.Aeropuerto+" Daniel Oduber Quirós", "Los sueños", "Papagayo", "Quepos", "Limón" ,"Santa Teresa", "Nosara", "Tamarindo", "Cobano","Tango Mar","Montezuma","Jaco","Uvita", "Palma Sur","Drake","Golfito","Laurel","San Vito", "Jimenez","Fortuna", "Los Chiles", "Puerto Viejo", "Hacienda Altagracias", "Tortuguero"];
  const peopleOptions = ["1 "+translation.filter.person, "2 "+translation.filter.people, "3 "+translation.filter.people, "4 "+translation.filter.people, "5 "+translation.filter.people, "6 "+translation.filter.people, "7 "+translation.filter.people];

  const handleOpenLocation = (event) => {
    setAnchorLocation(event.currentTarget);
    setIsLocationMenuOpen(true);
  };
  const handleOpenDate = (event) => {
    setAnchorDate(event.currentTarget);
    setIsDateMenuOpen(true);
  };
  const handleOpenPeople = (event) => {
    setAnchorPeople(event.currentTarget);
    setIsPeopleMenuOpen(true);
  };

  const handleCloseLocation = () => setIsLocationMenuOpen(false);
  const handleCloseDate = () => setIsDateMenuOpen(false);
  const handleClosePeople = () => setIsPeopleMenuOpen(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  // Función para cerrar todos los menús
  const closeAllMenus = () => {
    setIsLocationMenuOpen(false);
    setIsDateMenuOpen(false);
    setIsPeopleMenuOpen(false);
  };

  // Effect para cerrar menús al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      // Solo cerrar si algún menú está abierto
      if (isLocationMenuOpen || isDateMenuOpen || isPeopleMenuOpen) {
        // Cerrar inmediatamente
        closeAllMenus();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLocationMenuOpen, isDateMenuOpen, isPeopleMenuOpen]);
  return (
    <Stack style={{height: "100%", width: isMobile ? "100%" : "100%"}}>
    <Stack
      style={{
        width: "100%",
        height: isMobile ? "80vh" : "90vh",
        position: "relative",
      }}
    >
      <Box
        className="videobackground"
        component="video"
        src="/images/videohome.mp4"
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
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
<Stack spacing={20}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        style={{ width: "95%", zIndex: -1, paddingLeft: "2.5%", paddingRight: "2.5%" }}
      >
        <img src="/images/logo.png" alt="logo" style={{ width: isMobile ? "25%" : isTablet ? "20%" : "7%" }} />



      </Stack>


      <Stack spacing={isMobile || isTablet ? 9 : 4} style={{zIndex:0, paddingLeft: isMobile || isTablet ? "2%" : "3%"}}>
        <Stack spacing={1}>
        <Stack>

        <Typography className="title1" variant="h1">
            {translation.seccion1.titulo1}
        </Typography>
        <Typography className="title2" variant="h1">
            {translation.seccion1.titulo2}
        </Typography>
        </Stack>

        <Typography className="title3" variant="h2">
        {translation.seccion1.descripcion}
        </Typography>
        </Stack>
        <Stack spacing={isMobile || isTablet ? 0.5 : 1} style={{backgroundColor:"#F2F4F8", width: isMobile || isTablet ? "90%" : "45%", borderRadius: isMobile || isTablet ? "10px" : "20px", padding:isMobile || isTablet ? "1.5% 2%" : "1% 1%"}} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>

          <Stack spacing={0.5} style={{flex: 1, cursor: "pointer"}} onClick={handleOpenLocation}>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Typography style={{fontSize: isMobile ? "0.7rem" : "14px", fontWeight: "600", color: "#374151"}}>{translation.seccion1.from}</Typography>
              <KeyboardArrowDownRoundedIcon style={{color: "#134A4B", fontSize: 25}} />
            </Stack>
            <Typography style={{fontSize: isMobile ? "0.6rem" : "1rem", color: "#9CA3AF"}}>{location || translation.seccion1.yourOrigin}</Typography>
          </Stack>

          <Stack spacing={0.5} style={{flex: 1, cursor: "pointer"}} onClick={handleOpenDate}>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Typography style={{fontSize: isMobile ? "0.7rem" : "14px", fontWeight: "600", color: "#374151"}}>{translation.seccion1.to}</Typography>
              <KeyboardArrowDownRoundedIcon style={{color: "#134A4B", fontSize: 25}} />
            </Stack>
            <Typography style={{fontSize: isMobile ? "0.6rem" :"1rem", color: "#9CA3AF"}}>{dateOption || translation.seccion1.yourDestination}</Typography>
          </Stack>

          <Stack spacing={0.5} style={{flex: 1, cursor: "pointer"}} onClick={handleOpenPeople}>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Typography style={{fontSize: isMobile ? "0.7rem" : "14px", fontWeight: "600", color: "#374151"}}>{translation.seccion1.people}</Typography>
              <KeyboardArrowDownRoundedIcon style={{color: "#134A4B", fontSize: 25}} />
            </Stack>
            <Typography style={{fontSize: isMobile ? "0.6rem" : "1rem", color: "#9CA3AF"}}>{people || translation.seccion1.howManyPeople}</Typography>
          </Stack>

          <Button className="btnExplore" onClick={handleOpenDialog}>
            {isMobile || isTablet ? <img src="/images/search.svg" alt="search" style={{width: "20px", height: "20px"}}/> : translation.seccion1.request}
          </Button>

        </Stack>
        {/* Menús desplegables */}
        <Menu 
          anchorEl={anchorLocation} 
          open={isLocationMenuOpen} 
          onClose={handleCloseLocation} 
          transformOrigin={{ horizontal: "left", vertical: "top" }} 
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          disableScrollLock={true}
          disableAutoFocusItem={true}
          disableRestoreFocus={true}
          MenuListProps={{
            disablePadding: false,
            style: { position: 'relative' }
          }}
          PaperProps={{
            style: {
              maxHeight: 48 * 5.5, // Altura aproximada para 5.5 items (48px por item)
              width: 'auto',
              zIndex: 1300, // Asegurar que aparezca por encima de otras secciones
            },
          }}
        >
          {locationOptions.map((opt) => (
            <MenuItem key={opt} onClick={() => { setLocation(opt); handleCloseLocation(); }}>{opt}</MenuItem>
          ))}
        </Menu>
        <Menu 
          anchorEl={anchorDate} 
          open={isDateMenuOpen} 
          onClose={handleCloseDate} 
          transformOrigin={{ horizontal: "left", vertical: "top" }} 
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          disableScrollLock={true}
          disableAutoFocusItem={true}
          disableRestoreFocus={true}
          MenuListProps={{
            disablePadding: false,
            style: { position: 'relative' }
          }}
          PaperProps={{
            style: {
              maxHeight: 48 * 5.5, // Altura aproximada para 5.5 items (48px por item)
              width: 'auto',
              zIndex: 1300, // Asegurar que aparezca por encima de otras secciones
            },
          }}
        >
          {dateOptions.map((opt) => (
            <MenuItem key={opt} onClick={() => { setDateOption(opt); handleCloseDate(); }}>{opt}</MenuItem>
          ))}
        </Menu>
        <Menu 
          anchorEl={anchorPeople} 
          open={isPeopleMenuOpen} 
          onClose={handleClosePeople} 
          transformOrigin={{ horizontal: "left", vertical: "top" }} 
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          disableScrollLock={true}
          disableAutoFocusItem={true}
          disableRestoreFocus={true}
          MenuListProps={{
            disablePadding: false,
            style: { position: 'relative' }
          }}
          PaperProps={{
            style: {
              maxHeight: 48 * 5.5, // Altura aproximada para 5.5 items (48px por item)
              width: 'auto',
              zIndex: 1300, // Asegurar que aparezca por encima de otras secciones
            },
          }}
        >
          {peopleOptions.map((opt) => (
            <MenuItem key={opt} onClick={() => { setPeople(opt); handleClosePeople(); }}>{opt}</MenuItem>
          ))}
        </Menu>

        {/* Dialog para el formulario */}
        <Dialog 
          open={dialogOpen} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              borderRadius: "1.25rem",
              backgroundColor: "#298c8d6b",
              minHeight: 'auto',
              backdropFilter: "blur(10px)",
              width: isMobile || isTablet ? "90%" : "35%",
              maxWidth: isMobile || isTablet ? "90%" : "35%",
              height: isMobile || isTablet ? "auto" : "auto",
              maxHeight: isMobile || isTablet ? "100%" : "100%",
             

            }
          }}
        >
      
          <DialogContent sx={{ padding: isMobile || isTablet ? "4% 5%" : "2% 5%" }}>
            <Form 
              location={location}
              destination={dateOption}
              people={people}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      



      </Stack>

      </Stack>





    </Stack>
    </Stack>
  );
};

export default Seccion1;
