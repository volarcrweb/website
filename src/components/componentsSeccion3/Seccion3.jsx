import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import "./seccion3.css"
import { NavLink } from "react-router-dom"
import { useState } from "react";

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
    const [activeFilter, setActiveFilter] = useState('sanjose');

const tours = [
    {
        id: 1,
        title: "Coast Tour",
        url: "#",
        image: "/images/playa2.svg",
        category: "liberia",
    },
    {
        id: 2,
        title: "Poás Volcano",
        url: "#",
        image: "/images/poas.svg",
        category: "sanjose",
    },
    
    {
        id: 3,
        title: "Rincon de la Vieja",
        url: "#",
        image: "/images/rincon.svg",
        category: "liberia",
    },
    
    {
        id: 4,
        title: "City Tour",
        url: "#",
        image: "/images/cartago.svg",
        category: "sanjose",
    },
    {
        id: 5,
        title: "Mini City Tour",
        url: "#",
        image: "/images/city.svg",
        category: "sanjose",
    },
    {
        id: 6,
        title: "Roca Bruja",
        url: "#",
        image: "/images/roca.svg",
        category: "liberia",
    },
    {
        id: 7,
        title: "Bahia Papagayo",
        url: "#",
        image: "/images/papagayo.svg",
        category: "liberia",
    },
    {
        id: 8,
        title: "Tárcoles / Carara",
        url: "#",
        image: "/images/tarcoles.svg",
        category: "sanjose",
    },
    {
        id: 9,
        title: "Manuel Antonio",
        url: "#",
        image: "/images/manuelAntonio.svg",
        category: "otros",
    },
    {
        id: 10,
        title: "Fortuna",
        url: "#",
        image: "/images/fortuna.svg",
        category: "otros",
    },
    {
        id: 12,
        title: "Rincón de la Vieja y Tenorio",
        url: "#",
        image: "/images/tenorio.svg",
        category: "otros",
    },
    {
        id: 11,
        title: "Uvita",
        url: "#",
        image: "/images/uvita.svg",
        category: "otros",
    },
  
   
    
    
]

const categories = [
    {
        id: 1,
        name: "San José",
        icon: "/images/sanjose.svg",
        type: "sanjose",
    },
    {
        id: 2,
        name: "Liberia",
        icon: "/images/liberia.svg",
        type: "liberia",
    },
    {
        id: 3,
        name: "Otros",
        icon: "/images/liberia.svg",
        type: "otros",
    }
]

const getToursByCategory = (category) => {
    return tours.filter((tour) => tour.category === category);
}

// const getDotsCountByType = (category) => {
//     return tours.filter((tour) => tour.category === category).length;
// }

const handleFilterClick = (type) => {
    setActiveFilter(activeFilter === type ? null : type);
    console.log(activeFilter);
  };

  return (
<Stack direction={"column"} style={{width: "100%", height: isMobile ? "auto" : "70vh", backgroundImage: "url('/images/agua.svg')", backgroundSize: "cover", backgroundPosition: "center", marginTop: "-9%", padding: isMobile ? "18% 0% 8% 0%" : "13% 0% 5% 0%"}}>
<Stack spacing={isMobile ? 3 : 6} style={{padding: "0% 5%"}}>
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
{/* <Typography variant="h1" className="destinationsTitle">
    Popular Tours
</Typography> */}
 {/* Encabezado */}
 <Stack
          direction={"column"}
          justifyContent={ "flex-start"}
          alignItems={"center"}
          spacing={isMobile ? 1 : 2}
          style={{
            backgroundColor: isMobile ? "transparent" : "transparent",
            borderRadius: "34px",
            width: isMobile ? "80%" : "50%",
            padding: isMobile ? "1% 1%" : "0.3% 0.5%",
            zIndex: "0",
            boxShadow: isMobile ? "none" : "none",
            backdropFilter: isMobile ? "none" : "blur(1.5px)",
      
          }}
        >

         
          <Stack
            direction="row"
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              width: isMobile ? "120%" : "80%",
              borderRadius: "34px",
              backgroundColor: isMobile ? "#89898980" : "#89898980",
              padding: isMobile ? "1.5% 2.5%" : "1% 1.5%",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent={"center"}
              alignItems={"center"}
              style={{
                backgroundColor: "#134a4bad",
                padding: isMobile ? "0.5% 2%" : "0.5% 2%",
                borderRadius: "34px",
                width: isMobile ? "100%" : "100%",
                boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.25) inset",
              }}
            >
              <Typography className="filter-title">Popular Tours</Typography>
            </Stack>
          </Stack>

         

         
            <Stack
              direction="row"
              spacing={1}
              justifyContent={"center"}
              alignItems={"center"}
              style={{
                backgroundColor: "#89898980",
                borderRadius: "34px",
                width: isMobile ? "80%" : "40%",
                height: "40px",
              }}
            >
             {categories.map((category) => (
                <Stack
                  key={category.id}
                  direction={"row"}
                  spacing={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: isMobile ? "2% 3.5%" : "2% 5%",
                    borderRadius: "66px",
                    cursor: "pointer",
                    opacity: activeFilter === category.type ? 1 : 0.5,
                  }}
                  onClick={() => handleFilterClick(category.type)}
                >
                 
                    <Typography
                        className="filter-number"
                        style={{
                        color:
                        activeFilter === category.type ? "#FFFFFF" : "inherit",
                        }}
                    >
                    {category.name}
                    </Typography>
                </Stack>
              ))}
            </Stack>
      
        </Stack>

{/* <NavLink to={"#"} className="btnSeeAll">
   See all
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 14 20" fill="none">
                    <path d="M2.5 18L11 10L2.5 2.5" stroke="#134A4B" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
</NavLink> */}
</Stack>
<Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 3 : 6} justifyContent={"center"} alignItems={"center"} style={{ width: "100%", height: isMobile ? "auto" : "55vh"}}>
    <Stack style={{ width: isMobile ? "80%" : "35%", height: "100%"}}>
        {getToursByCategory(activeFilter).slice(0, 1).map((tour) => (
            <CardTour key={tour.id} title={tour.title} url={tour.url} image={tour.image} />
        ))}
    </Stack>
    


<Stack spacing={isMobile ? 3 : 6} style={{ width: isMobile ? "80%" : "35%", height: "100%"}}>
    <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 3 : 6} style={{ width: "100%", height: "50%"}}>
    {getToursByCategory(activeFilter).slice(1, 3).map((tour) => (
        <CardTour key={tour.id} title={tour.title} url={tour.url} image={tour.image} />
    ))}

    </Stack>

<Stack style={{ width: "100%", height: "50%"}}>
{getToursByCategory(activeFilter).slice(3, 4).map((tour) => (
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
