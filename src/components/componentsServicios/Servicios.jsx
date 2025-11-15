import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material"
import "./servicios.css"
import { useContext } from "react";
import { LanguageContext } from "../LanguageProvider";


const Servicios = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const { translation } = useContext(LanguageContext);

        // Datos de ejemplo para los servicios
        const servicios = [
            { id: 1, titulo: translation.seccion2.service1, icono: "images/icons/helicopter.svg" },
            { id: 2, titulo: translation.seccion2.service2, icono: "images/icons/premium.svg" },
            { id: 3, titulo: translation.seccion2.service3, icono: "images/icons/events.svg" },
            { id: 4, titulo: translation.seccion2.service4, icono: "images/icons/camera.svg" },
            { id: 5, titulo: translation.seccion2.service5, icono: "images/icons/radar.svg" },
            { id: 6, titulo: translation.seccion2.service6, icono: "images/icons/cargo.svg" },
        ];

  return (

    <Stack
    direction={"column"}
    alignItems={"center"}
    spacing={3}
    style={{
      width: "100%",
      height: isMobile ? "45vh" : "48vh",
      backgroundColor: "#F2F4F8",
    //   borderRadius: "20px",
      marginTop: isMobile ? "0%" : "0%",
      zIndex: 0,
      paddingTop: isMobile ? "10%" : "2%",
      paddingBottom: isMobile ? "0%" : "3%",
    }}>

<Typography className="titleSeccion4S"> Our Services</Typography>

{/* Grid Responsive */}
<Box style={{ position: "relative", zIndex: 1, padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Grid 
        container 
        spacing={2}
        sx={{
            // En web: 2 filas, 3 columnas
            // En móvil: 2 columnas, 3 filas
            gridTemplateColumns:  'repeat(3, 1fr)',
            gridTemplateRows:  'repeat(2, 1fr)',
            width: isMobile ? "100%" : "100%",
            rowGap: isMobile ? "2.5rem" : "5rem",
        }}
    >
        {servicios.map((servicio) => (
            <Grid 
                item 
                key={servicio.id}
                xs={isMobile ? 4 : 4} // 6 = 2 columnas en móvil, 4 = 3 columnas en web
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Stack justifyContent={"center"} alignItems={"center"} spacing={1.5} style={{width: "100%", height: "100%"}}>
                    <img src={servicio.icono} alt={servicio.titulo} style={{width: isMobile ? "40px" : "80px"}}/>
                    <Typography className="serviceTitleS">{servicio.titulo}</Typography>
                    
                </Stack>
            </Grid>
        ))}
    </Grid>
</Box>

    </Stack>
  )
}

export default Servicios