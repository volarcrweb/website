import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import "./seccion6.css"
import { useState } from "react";


const Seccion6 = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [selectedDot, setSelectedDot] = useState(null);

    const data = [
        {
            id: 1,
            title: "Papagayo",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "33%",
            top: isMobile ? "65%" : "19%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 2,
            title: "Santa Teresa",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "39%",
            top: isMobile ? "65%" : "47%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 3,
            title: "Nosara",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "35%",
            top: isMobile ? "65%" : "38%",
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 4,
            title: "Tamarindo",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "31%",
            top: isMobile ? "65%" : "28%",
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 5,
            title: "Cobano",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "39%",
            top: isMobile ? "65%" : "41%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 6,
            title: "Tango Mar",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "42%",
            top: isMobile ? "65%" : "43%",  
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 7,
            title: "Montezuma",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "40.5%",
            top: isMobile ? "65%" : "45%",  
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 8,
            title: "Jaco",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "45%",
            top: isMobile ? "65%" : "47%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 9,
            title: "Uvita",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "55%",
            top: isMobile ? "65%" : "60%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 10,
            title: "Palma Sur",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "58%",
            top: isMobile ? "65%" : "65%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 11,
            title: "Drake",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "56.5%",
            top: isMobile ? "65%" : "77%",
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 12,
            title: "Golfito",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "59%",
            top: isMobile ? "65%" : "71%",
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 13,
            title: "Laurel",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "63.5%",
            top: isMobile ? "65%" : "81%",
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 14,
            title: "San Vito",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "63.5%",
            top: isMobile ? "65%" : "70%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 15,
            title: "Hacienda Alta Gracia",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "56%",
            top: isMobile ? "65%" : "50%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 16,
            title: "Fortuna",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "46%",
            top: isMobile ? "65%" : "25%", 
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 17,
            title: "Los Chiles",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "45%",
            top: isMobile ? "65%" : "8%",
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        },
        {
            id: 18,
            title: "Puerto Viejo",
            image: "/images/amenidades/gimnasio.png",
            left: isMobile ? "62%" : "65%",
            top: isMobile ? "65%" : "43%",
            cardTop: isMobile ? "50%" : "50%",
            cardLeft: isMobile ? "50%" : "65%",
            status: "active"
        }
    ]
  return (
<Stack direction={"column"} justifyContent={"center"} alignItems={"center"} style={{width:"100%", height:"80vh", position:"relative", overflow:"hidden", backgroundImage: "url('/images/seccionMapa.svg')", backgroundSize: "inherit", backgroundPosition: "center", paddingTop:"3%", paddingBottom:"2%"}}>
<Box style={{width:"100%", height:"100%", backgroundImage: "url('/images/hojas.svg')", backgroundSize: "inherit", backgroundPosition: "center", position:"absolute", top:0, left:0, zIndex:0}}/>



<Stack direction={"column"} justifyContent={"center"} alignItems={"center"} style={{width:"100%", height:"100%", position:"relative"}}>
<img src="/images/mapa25.svg" alt="seccion6" style={{width:"40%", height:"auto"}}/>

{data.map((item) => (
            item.status === "active" && (
            <Stack 
              key={item.id} 
              onClick={() => setSelectedDot(item)}
              className='icono'
              style={{
                position: "absolute", 
                top: item.top, 
                left: item.left, 
                borderRadius: "50%", 
                backgroundColor:"#F2F4F8", 
                width: isMobile ? "25px" : "25px", 
                height: isMobile ? "25px" : "25px", 
                display:"flex", 
                justifyContent:"center", 
                alignItems:"center",
                cursor: "pointer",
                transition: "transform 0.2s",
                zIndex: 1,
              }}
            >
              <img src="/images/plusicon.svg" style={{width: isMobile ? "15px" : "12px", height: isMobile ? "12px" : "12px"}}/>
            </Stack>
            )
          ))}
</Stack>


   
 

</Stack>
  )
}

export default Seccion6
