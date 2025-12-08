import { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  SpeedDial,
  Stack,
  Typography,
  useMediaQuery,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { LanguageContext } from "../LanguageProvider";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import "./TourDetail.css";
import Footer from "../componentsFooter/Footer";
import { useNavigate } from "react-router-dom";

const TourDetail = ({ tour }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");
  const navigate = useNavigate();
  const { translation, toggleLanguage } = useContext(LanguageContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const actions = [
    {
      icon: (
        <img
          src="/images/email.svg"
          style={{ width: isMobile ? "50%" : "60%" }}
          alt="WA"
        />
      ),
      name: "Email",
      url: "mailto:reservations@volarcr.com",
    },
    {
      icon: (
        <img
          src="/images/WANegro.svg"
          style={{ width: isMobile ? "50%" : "60%" }}
          alt="WA"
        />
      ),
      name: "Whatsapp",
      url: "https://api.whatsapp.com/send?phone=50685959741",
    },
  ];

  const galleryImages = useMemo(() => {
    if (!tour?.gallery) return [];
    return Object.values(tour.gallery).filter(Boolean);
  }, [tour?.gallery]);

  const highlights = useMemo(() => {
    if (!tour?.highlight) return [];
    return Object.values(tour.highlight).filter(Boolean);
  }, [tour?.highlight]);

  const duration = useMemo(() => {
    if (!tour?.duration) return [];
    return Object.values(tour.duration).filter(Boolean);
  }, [tour?.duration]);

  const departure = useMemo(() => {
    if (!tour?.departure) return [];
    return Object.values(tour.departure).filter(Boolean);
  }, [tour?.departure]);

  const [activeImage, setActiveImage] = useState(galleryImages[0] || "");
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const watchVideoButtonRef = useRef(null);

  const handleOpenVideoDialog = () => {
    watchVideoButtonRef.current?.blur();
    setIsVideoDialogOpen(true);
  };

  const handleCloseVideoDialog = () => {
    setIsVideoDialogOpen(false);
  };

  useEffect(() => {
    setActiveImage(galleryImages[0] || "");
  }, [galleryImages]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={10}
      style={{ width: "100%", backgroundColor: "#fff" }}
    >
      <Stack spacing={2} style={{ width: "100%" }}>
        <Stack
          style={{
            width: "100%",
            height: "55vh",
            backgroundImage: `url(${activeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <SpeedDial
            ariaLabel="Language toggle"
            sx={{
              position: "fixed",
              top: isMobile ? "3%" : "2%",
              right: isMobile ? "3%" : "2%",
              zIndex: 1000,
            }}
            FabProps={{
              sx: {
                bgcolor: "#F2F4F8",
                color: "#134A4B",
                boxShadow: "none",
                width: isMobile ? 44 : 64,
                height: isMobile ? 28 : 40,
                borderRadius: 2, // Esto lo hace cuadrado con bordes redondeados
                "&:hover": {
                  bgcolor: "#C3C5C8",
                },
              },
            }}
            icon={
              <img
                src={translation.buttonText}
                style={{ width: "40%" }}
                alt="Language"
              />
            }
            onClick={toggleLanguage}
            open={false}
          />

          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{
              position: "fixed",
              bottom: isMobile ? "5%" : "16%",
              right: isMobile ? "8%" : "2%",
            }}
            FabProps={{
              sx: {
                bgcolor: "#134A4B",
                color: "#fff",
                "&:hover": { bgcolor: "#0f3a3b" },
              },
            }}
            icon={<SpeedDialIcon openIcon={<ShareIcon />} />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                onClick={() => window.open(action.url, "_blank")}
                slotProps={{
                  tooltip: {
                    title: action.name,
                  },
                }}
              />
            ))}
          </SpeedDial>
          <Stack
            alignItems="flex-start"
            style={{ width: "100%", padding: "1% 1.5%" }}
          >
            <img
              src="/images/logo.png"
              alt="logo"
              style={{ width: isMobile ? "25%" : isTablet ? "15%" : "5%" }}
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={isMobile ? 2 : 4}
          alignItems={isMobile || isTablet ? "center" : "flex-start"}
          justifyContent={isMobile || isTablet ? "center" : "flex-start"}
          style={{
            width: "100%",
            height: isMobile ? "8vh" : "10vh",
            padding: isMobile || isTablet ? "0.5rem 0 0.5rem 0" : "0.5rem 2rem",
          }}
        >
          {galleryImages.map((image, index) => (
            <Box
              key={`${image}-${index}`}
              onClick={() => setActiveImage(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ")
                  setActiveImage(image);
              }}
              style={{
                width: isMobile ? "20vw" : (isTablet ? "15vw" : "5vw"),
                height: "100%",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Stack
        direction={isMobile || isTablet ? "column" : "row"}
        alignItems={isMobile || isTablet ? "center" : "flex-start"}
        justifyContent="center"
        spacing={isMobile || isTablet ? 4 : 8}
        style={{ width: "100%" }}
      >
        <Stack style={{ width: isMobile || isTablet ? "90%" : "25%" }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <img src="/images/star.svg" alt="star" />
            <Typography className="titleHighlight">
              {translation.tourDetail.txtHighlight}:
            </Typography>
          </Stack>
          <ul>
            {highlights.map((item, index) => (
              <li
                key={`highlight-${index}`}
                className="textHighlight"
                style={{ marginBottom: "0.75rem" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Stack>

        <Divider
          orientation={isMobile || isTablet ? "horizontal" : "vertical"}
          flexItem
          sx={{ borderColor: "#2D2D2D", opacity: 0.5 }}
        />

        <Stack style={{ width: isMobile || isTablet ? "90%" : "25%" }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <img src="/images/clockB.svg" alt="star" />
            <Typography className="titleHighlight">
              {translation.tourDetail.txtDuration}:
            </Typography>
          </Stack>
          <ul>
            {duration.map((item, index) => (
              <li
                key={`duration-${index}`}
                className="textHighlight"
                style={{ marginBottom: "0.75rem" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Stack>

        <Divider
          orientation={isMobile || isTablet ? "horizontal" : "vertical"}
          flexItem
          sx={{ borderColor: "#2D2D2D", opacity: 0.5 }}
        />

        <Stack style={{ width: isMobile || isTablet ? "90%" : "25%" }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <img src="/images/location.svg" alt="star" />
            <Typography className="titleHighlight">
              {translation.tourDetail.txtDeparture}:
            </Typography>
          </Stack>
          <ul>
            {departure.map((item, index) => (
              <li
                key={`departure-${index}`}
                className="textHighlight"
                style={{ marginBottom: "0.75rem" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Stack>
      </Stack>

      <Stack spacing={isMobile ? 4 : 8} style={{ width: "90%" }}>
        <Typography className="titleTour">{tour.name}</Typography>

        <Stack spacing={2}>
          <Typography className="descriptionTour">
            {tour.description.text1}
          </Typography>
          <Typography className="descriptionTour">
            {tour.description.text2}
          </Typography>
        </Stack>

        <Button
          ref={watchVideoButtonRef}
          className="buttonTour"
          onClick={handleOpenVideoDialog}
          disabled={!tour?.video}
        >
          {translation.tourDetail.txtWatchVideo}
        </Button>

        <Button
          className="buttonback"
          onClick={() => navigate("/")}
        >

<svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26" fill="none">
  <path d="M2 13L28 13M2 13L13.1429 2M2 13L13.1429 24" stroke="#2D2D2D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
          {translation.tourDetail.txtBack}
        </Button>
      </Stack>
      <Dialog
        open={isVideoDialogOpen}
        onClose={handleCloseVideoDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            height: isMobile ? "30vh" : "65vh",
            overflow: "hidden",
          },
        }}
      >
        <Stack direction="row" justifyContent="flex-end">
          <IconButton
            aria-label="close video dialog"
            onClick={handleCloseVideoDialog}
            autoFocus
          >
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </Stack>
        <DialogContent sx={{ height: "100%", p: 0, overflow: "hidden" }}>
          {tour?.video && (
            <Box
              component="video"
              controls
              autoPlay
              style={{ width: "100%", height: "100%" }}
            >
              <source src={tour.video} type="video/mp4" />
              Your browser does not support the video tag.
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </Stack>
  );
};

export default TourDetail;

TourDetail.propTypes = {
  tour: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.shape({
      text1: PropTypes.string,
      text2: PropTypes.string,
    }),
    gallery: PropTypes.shape({
      image1: PropTypes.string,
      image2: PropTypes.string,
      image3: PropTypes.string,
      image4: PropTypes.string,
    }),
    highlight: PropTypes.objectOf(PropTypes.string),
    duration: PropTypes.objectOf(PropTypes.string),
    departure: PropTypes.objectOf(PropTypes.string),
    video: PropTypes.string,
  }).isRequired,
};
