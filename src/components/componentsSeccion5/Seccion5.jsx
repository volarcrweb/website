import { Box, Stack, Typography, Grid, useMediaQuery } from "@mui/material";
import "./seccion5.css";
import { useState } from "react";

// Nuevo componente AmenidadToggle
const AmenidadToggle = ({ title, title2, description, image, onClick }) => {
  
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      onClick={onClick}
    >
      <Box
        style={{
          width: "82px",
          height: "82px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
        }}
      />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Typography className="titleAmenidad">{title}</Typography>
        {title2 && <Typography className="titleAmenidad">{title2}</Typography>}
      </Stack>
      <Typography className="descripcionAmenidad">
        {description}
      </Typography>
    </Stack>
  );
};

const Seccion5 = () => {
  const [currentVideo, setCurrentVideo] = useState("/images/video-horizontal.mp4");
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleAmenityClick = (video) => {
    setCurrentVideo(null);
    setTimeout(() => {
      setCurrentVideo(video);
    }, 50);
  };

  const amenities = [
    {
      title:  "MD 902 Explorer",
      title2: "",
      description: "Up to 6 passengers + 1 Pilot",
      image: "/images/blanco.svg",
      video: "/images/video-horizontal.mp4"
    },
    {
      title:  "AS350 B2",
      title2: "",
      description: "Up to 5 passengers + 1 Pilot",
      image: "/images/azul.svg",
      video: "/images/video-vertical1.mp4"
    },
    {
      title:  "Robinson 44",
      title2: "",
      description: "Up to 3 passengers + 1 Pilot",
      image: "/images/negro.svg",
      video: "/images/video-vertical2.mp4"
    }

  ]

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
      style={{ paddingTop: isMobile ? "15%" : "5%", paddingLeft:"10%", paddingRight:"10%", paddingBottom: isMobile ? "25%" : "15%" }}
    >
        {isMobile && (
               <Stack
               direction="column"
               justifyContent="center"
               alignItems="center"
               spacing={1}
             >
               <Typography className="title-flota">
                 Our Fleet
               </Typography>
               <Typography className="title2-flota">
               Unique in Costa Rica, the most versatile and reliable helicopters for tourism, corporate, and air services in Costa Rica.
               </Typography>
             </Stack>
        )}
      {/* circulo grande */}
      <Stack
        style={{
          width: isMobile ? "350px" : "779px",
          height: isMobile ? "350px" : "779px",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Stack
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "50%",
            backgroundImage: "url(/images/circulo1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Stack
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "50%",
            backgroundImage: "url(/images/circulo2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Círculo interno con video */}
        <Stack
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "270px" : "545px",
            height: isMobile ? "270px" : "545px",
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 2,
            aspectRatio: "622.54/622.54",
          }}
        >
          <video
            key={currentVideo}
            autoPlay
            loop
            muted
            playsInline
            onError={(e) =>
              console.error("Error loading video:", e.target.error)
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src={currentVideo} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        </Stack>
      </Stack>

      <Stack style={{ width: isMobile ? "100%" : "50%"}} justifyContent="center" alignItems="center" spacing={2}>
        {!isMobile && (
               <Stack
               direction="column"
               justifyContent="center"
               alignItems="center"
               spacing={1}
             >
               <Typography className="title-flota">
                 Our Fleet
               </Typography>
               <Typography className="title2-flota">
               Unique in Costa Rica, the most versatile and reliable helicopters for tourism, corporate, and air services in Costa Rica.
               </Typography>
             </Stack>
        )}
   

        <Grid container spacing={2} justifyContent="center" style={{ rowGap: "30px", width: "100%", }}>
          {amenities.map((amenity, index) => (
            <Grid item xs={6} key={index} style={{paddingLeft: isMobile ? (index % 2 === 0 ? "0%" : "8%") : "0%", paddingRight: isMobile ? (index % 2 === 0 ? "0%" : "0%") : "0%"}}>
              <AmenidadToggle
                title={amenity.title}
                title2={amenity.title2}
                description={amenity.description}
                image={amenity.image}
                onClick={() => handleAmenityClick(amenity.video)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Seccion5;