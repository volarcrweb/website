import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import "./seccion3.css"
import { NavLink } from "react-router-dom"

const CardTour = ({ title, url, image }) => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <Stack className="cardTour" alignItems={"center"} justifyContent={"flex-end"} style={{ width: "100%", height: isMobile ? "150px" : "100%", borderRadius: "20px 20px 0px 0px", padding: "0px", backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          
            <Stack alignItems={"flex-start"} justifyContent={"center"} style={{ width: "100%", height: isMobile ? "50px" : "90px", position:"relative"}}>
                <Box style={{position:"absolute", top: "0", left: "0", width: "100%", height: "100%", backdropFilter: "blur(8.449999809265137px)", zIndex: "1"}}/>
                <Typography className="cardTitle">{title}</Typography>
                <NavLink to={url} className="cardButton">
                More info
                    <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "8" : "10"} height={isMobile ? "16" : "20"} viewBox="0 0 14 20" fill="none">
                    <path d="M2.5 18L11 10L2.5 2.5" stroke="white" strokeWidth={isMobile ? "3" : "4"} strokeLinecap="round"/>
                    </svg>
                </NavLink>
            </Stack>
        </Stack>
    )
}


const Seccion3 = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');

const tours = [
    {
        id: 1,
        title: "Coast Tour",
        url: "#",
        image: "/images/playa2.svg",
    },
    {
        id: 2,
        title: "Volcán Poás",
        url: "#",
        image: "/images/poas.svg",
    },
    
    {
        id: 3,
        title: "Rincon de la Vieja",
        url: "#",
        image: "/images/rincon.svg",
    },
    
    {
        id: 4,
        title: "City Tour",
        url: "#",
        image: "/images/city.svg",
    },
    
    
]

  return (
<Stack direction={"column"} style={{width: "100%", height: isMobile ? "auto" : "70vh", backgroundImage: "url('/images/agua.svg')", backgroundSize: "cover", backgroundPosition: "center", marginTop: "-9%", padding: isMobile ? "18% 0% 8% 0%" : "13% 0% 5% 0%"}}>
<Stack spacing={isMobile ? 3 : 6} style={{padding: "0% 5%"}}>
    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
<Typography variant="h1" className="destinationsTitle">
    Popular Tours
</Typography>

<NavLink to={"#"} className="btnSeeAll">
    Ver todos
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 14 20" fill="none">
                    <path d="M2.5 18L11 10L2.5 2.5" stroke="#134A4B" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
</NavLink>
</Stack>
<Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 3 : 6} justifyContent={"center"} alignItems={"center"} style={{ width: "100%", height: isMobile ? "auto" : "55vh"}}>
    <Stack style={{ width: isMobile ? "80%" : "35%", height: "100%"}}>
        {tours.slice(0, 1).map((tour) => (
            <CardTour key={tour.id} title={tour.title} url={tour.url} image={tour.image} />
        ))}
    </Stack>
    


<Stack spacing={isMobile ? 3 : 6} style={{ width: isMobile ? "80%" : "35%", height: "100%"}}>
    <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 3 : 6} style={{ width: "100%", height: "50%"}}>
    {tours.slice(1, 3).map((tour) => (
        <CardTour key={tour.id} title={tour.title} url={tour.url} image={tour.image} />
    ))}

    </Stack>

<Stack style={{ width: "100%", height: "50%"}}>
{tours.slice(3, 4).map((tour) => (
        <CardTour key={tour.id} title={tour.title} url={tour.url} image={tour.image} />
    ))}
    </Stack>

</Stack>

</Stack>

</Stack>


</Stack>
  )
}

export default Seccion3
