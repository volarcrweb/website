import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import "./seccion4.css"


const Seccion4 = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <Stack justifyContent={"center"} alignItems={"center"} style={{ width: "100%", height: "80vh", backgroundPosition: "center", position: "relative", backgroundColor:"transparent" }} >
            <Box style={{width: "90%", height: "100%", backgroundImage: isMobile ? "url(images/puente.svg)" : "url(images/puente.svg)",backgroundSize:"cover", backgroundAttachment: isMobile ? "local" : "fixed", position: "absolute", top: 0, left: "5%", zIndex: 0, borderRadius: "20px",}}/>
            {/* <Box style={{width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.19)", position: "absolute", top: 0, left: 0, zIndex: 1}}/> */}
            <Stack style={{ width: "100%", height: "60%", position:"relative", paddingTop: "2%"}}> 
                <Box style={{width: "100%", height: "100%", position:"absolute", top: 0, left: 0, zIndex: 0,  backdropFilter: "blur(8.449999809265137px)",}}/>
                <Typography className="titleSeccion4"> Algunos de<br/>Nuestros Destinos</Typography>

                




            </Stack>
            
    
            
    
        </Stack>
      )
}

export default Seccion4
