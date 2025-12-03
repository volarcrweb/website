import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Typography,
  Grid,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "./seccion5.css";
import { useContext, useState } from "react";
import { LanguageContext } from "../LanguageProvider";
import { NavLink } from "react-router-dom";

// Nuevo componente AmenidadToggle
const AmenidadToggle = ({ title, title2, description, image, onClick }) => {
  const labelParts = [title, title2, description].filter(Boolean).join(" - ");
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      onClick={onClick}
      style={{ cursor: "pointer" }}
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
        role="img"
        aria-label={labelParts}
        title={labelParts}
      />
    </Stack>
  );
};

const AmenidadToggle2 = ({ title, title2, description, onClick }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Typography className="titleAmenidad">{title}</Typography>
        {title2 && <Typography className="titleAmenidad">{title2}</Typography>}
      </Stack>
      <Typography className="descripcionAmenidad">{description}</Typography>
    </Stack>
  );
};

const Seccion5 = () => {
  const [currentVideo, setCurrentVideo] = useState(
    "/images/videonuevoMD.mp4"
  );
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { translation } = useContext(LanguageContext);
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const handleAmenityClick = (video) => {
    setCurrentVideo(null);
    setTimeout(() => {
      setCurrentVideo(video);
    }, 50);
  };

  const handleAmenityDialogOpen = (amenity) => {
    setSelectedAmenity(amenity);
  };

  const handleAmenityDialogClose = () => {
    setSelectedAmenity(null);
  };

  const amenities = [
    {
      title: "MD 902 Explorer",
      title2: translation.seccion5.twinEngine,
      description: translation.seccion5.upTo6Passengers,
      image: "/images/blanco.svg",
      video: "/images/videonuevoMD.mp4",
      url: "/MD902Explorer",
      dialog: {
        capacity: translation.heliDetail.md902Explorer.dialog.capacity,
        motor: translation.heliDetail.md902Explorer.dialog.motor,
        rotorPrincipal: translation.heliDetail.md902Explorer.dialog.rotorPrincipal,
        categoria: translation.heliDetail.md902Explorer.dialog.categoria,
        carga: translation.heliDetail.md902Explorer.dialog.carga,
      }
    },
    {
      title: "AS350 B2",
      title2: translation.seccion5.singleEngine,
      description: translation.seccion5.upTo5Passengers,
      image: "/images/azul.svg",
      video: "/images/video-vertical1.mp4",
      url: "/AS350B2",
      dialog: {
        capacity: translation.heliDetail.as350b2.dialog.capacity,
        motor: translation.heliDetail.as350b2.dialog.motor,
        rotorPrincipal: translation.heliDetail.as350b2.dialog.rotorPrincipal,
        categoria: translation.heliDetail.as350b2.dialog.categoria,
        carga: translation.heliDetail.as350b2.dialog.carga,
      }
    },
    {
      title: "Robinson 44",
      title2: translation.seccion5.singleEngine,
      description: translation.seccion5.upTo3Passengers,
      image: "/images/negro.svg",
      video: "/images/video-vertical2.mp4",
      url: "/Robinson44",
      dialog: {
        capacity: translation.heliDetail.robinson44.dialog.capacity,
        motor: translation.heliDetail.robinson44.dialog.motor,
        rotorPrincipal: translation.heliDetail.robinson44.dialog.rotorPrincipal,
        categoria: translation.heliDetail.robinson44.dialog.categoria,
        carga: translation.heliDetail.robinson44.dialog.carga,
      }
    },
  ];

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
      style={{
        paddingTop: isMobile ? "15%" : "5%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: isMobile ? "25%" : "8%",
      }}
    >
      {isMobile && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography className="title-flota">
            {translation.seccion5.titulo}
          </Typography>
          <Typography className="title2-flota">
            {translation.seccion5.subtitulo}
          </Typography>
        </Stack>
      )}
      {/* circulo grande */}
      <Stack
        style={{
          width: isMobile ? "305px" : "708px",
          height: isMobile ? "305px" : "708px",
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
            // backgroundImage: "url(/images/circulo1.png)",
            backgroundColor: "#134A4B",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
          }}
        />
        <Stack
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "50%",
            // backgroundImage: "url(/images/circulo2.png)",
            backgroundColor: "#134A4B",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
          }}
        />

        {/* Círculo interno con video */}
        <Stack
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "300px" : "700px",
            height: isMobile ? "300px" : "700px",
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

      <Stack
        style={{ width: isMobile ? "100%" : "50%" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {!isMobile && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography className="title-flota">
              {translation.seccion5.titulo}
            </Typography>
            <Typography className="title2-flota">
              {translation.seccion5.subtitulo}
            </Typography>
          </Stack>
        )}

        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ rowGap: "30px", width: "100%" }}
        >
          {amenities.map((amenity, index) => (
            <Grid
              item
              xs={6}
              key={index}
              style={{
                paddingLeft: isMobile ? (index % 2 === 0 ? "0%" : "8%") : "0%",
                paddingRight: isMobile ? (index % 2 === 0 ? "0%" : "0%") : "0%",
              }}
            >
              <Stack justifyContent="center" alignItems="center" spacing={1}>
                <AmenidadToggle
                  title={amenity.title}
                  title2={amenity.title2}
                  description={amenity.description}
                  image={amenity.image}
                  onClick={() => handleAmenityClick(amenity.video)}
                />
                <AmenidadToggle2
                  title={amenity.title}
                  title2={amenity.title2}
                  description={amenity.description}
                  onClick={() => handleAmenityDialogOpen(amenity)}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={Boolean(selectedAmenity)}
          onClose={handleAmenityDialogClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "1.25rem",
              backgroundColor: "#298c8d6b",
              minHeight: "auto",
              backdropFilter: "blur(10px)",
              height: "20rem",
              maxHeight: "100%",
            },
          }}
        >
          {selectedAmenity && (
            <>
              <DialogTitle className="titleDIalog">
                {selectedAmenity.title}
              </DialogTitle>
              <DialogContent dividers >
                <Stack justifyContent={"center"} style={{height: "100%"}}>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  justifyContent={"space-around"}
                  alignItems={"flex-start"}
                  spacing={isMobile ? 2 : 0}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography className="subtitleDIalog">
                       {translation.type === "es" ? "Capacidad:" : "Capacity:"}
                      </Typography>
                      <Typography className="valueDIalog">{selectedAmenity.dialog.capacity}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography className="subtitleDIalog">Motor:</Typography>
                      <Typography className="valueDIalog">{selectedAmenity.dialog.motor}</Typography>
                    </Stack>
                    
                  </Stack>

                  <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography className="subtitleDIalog">
                       {translation.type === "es" ? "Rotor Principal:" : "Main Rotor:"}
                      </Typography>
                      <Typography className="valueDIalog">{selectedAmenity.dialog.rotorPrincipal}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography className="subtitleDIalog">
                       {translation.type === "es" ? "Categoría:" : "Category:"}
                      </Typography>
                      <Typography className="valueDIalog">{selectedAmenity.dialog.categoria}</Typography>
                    </Stack>
                    
                  </Stack>
                </Stack>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ width: "100%" }}
                >
                  <NavLink
                  to={selectedAmenity.url}
                    className="btnseemore"
                    // onClick={handleAmenityDialogClose}
                  >
                    {translation.type === "es" ? "Ver más" : "See more"}
                  </NavLink>
                </Stack>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Stack>
    </Stack>
  );
};

AmenidadToggle.propTypes = {
  title: PropTypes.string,
  title2: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  url: PropTypes.string,
  onClick: PropTypes.func,
};

AmenidadToggle2.propTypes = {
  title: PropTypes.string,
  title2: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

export default Seccion5;
