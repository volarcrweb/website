import { Box, Stack, Typography, useMediaQuery, Grid, Card, CardContent } from "@mui/material"
import "./seccion4.css"


const Seccion4 = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    
    // Datos de ejemplo para los servicios
    const servicios = [
        { id: 1, titulo: "Helicopter Tours", icono: "images/helicopterIcon.svg" },
        { id: 2, titulo: "VIP Charter Flights", icono: "images/premiumIcon.svg" },
        { id: 3, titulo: "Weddings & Events", icono: "images/eventIcon.svg" },
        { id: 4, titulo: "Aerial Filming & Photography", icono: "images/cameraIcon.svg" },
        { id: 5, titulo: "Lidar Mapping & Survey", icono: "images/mappingIcon.svg" },
        { id: 6, titulo: "External Loads", icono: "images/cargoIcon.svg" },
    ];

    return (
        <Stack justifyContent={"center"} alignItems={"center"} style={{ width: "100%", height: isMobile ? "100vh" : "70vh", backgroundPosition: "center", position: "relative", backgroundColor:"transparent", paddingBottom:"10%" }} >
            <Box style={{width: isMobile ? "95%" : "90%", height: "90%", backgroundImage: isMobile ? "url(images/puente.svg)" : "url(images/puente.svg)",backgroundSize:"cover", backgroundAttachment: isMobile ? "local" : "fixed", position: "absolute", top: 0, left: isMobile ? "2%" : "5%", zIndex: 0, borderRadius: "20px", backgroundPosition: "center"}}/>
            {/* <Box style={{width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.19)", position: "absolute", top: 0, left: 0, zIndex: 1}}/> */}
            <Stack spacing={2} style={{ width: "100%", height: isMobile ? "85%" : "70%", position:"relative", paddingTop: "1%", marginTop:"5%"}}> 
                <Box style={{width: "100%", height: "100%", position:"absolute", top: 0, left: 0, zIndex: 0,  backdropFilter: "blur(8.449999809265137px)",}}/>
                <Typography className="titleSeccion4"> Our Services</Typography>

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
                            width: isMobile ? "100%" : "60%",
                            rowGap: "3rem",
                        }}
                    >
                        {servicios.map((servicio) => (
                            <Grid 
                                item 
                                key={servicio.id}
                                xs={isMobile ? 6 : 4} // 6 = 2 columnas en móvil, 4 = 3 columnas en web
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Stack justifyContent={"center"} alignItems={"center"} spacing={1.5} style={{width: "100%", height: "100%"}}>
                                    <img src={servicio.icono} alt={servicio.titulo} style={{width: "60px"}}/>
                                    <Typography className="serviceTitle">{servicio.titulo}</Typography>
                                    
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Stack>
            
    
            
    
        </Stack>
      )
}

export default Seccion4
