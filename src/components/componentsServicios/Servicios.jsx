import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material"
import "./servicios.css"


const Servicios = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');

        // Datos de ejemplo para los servicios
        const servicios = [
            { id: 1, titulo: "Helicopter Tours", icono: "images/icons/helicopter.svg" },
            { id: 2, titulo: "VIP Charter Flights", icono: "images/icons/premium.svg" },
            { id: 3, titulo: "Weddings & Events", icono: "images/icons/events.svg" },
            { id: 4, titulo: "Aerial Filming & Photography", icono: "images/icons/camera.svg" },
            { id: 5, titulo: "Lidar Mapping & Survey", icono: "images/icons/radar.svg" },
            { id: 6, titulo: "External Loads", icono: "images/icons/cargo.svg" },
        ];

  return (

    <Stack
    direction={"column"}
    alignItems={"center"}
    spacing={3}
    style={{
      width: "95%",
      height: "48vh",
      backgroundColor: "#F2F4F8",
      borderRadius: "20px",
      marginTop: isMobile ? "-9%" : "-5%",
      zIndex: 0,
      paddingTop: "2%",
      paddingBottom: isMobile ? "1%" : "3%",
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