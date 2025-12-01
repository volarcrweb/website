import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./HelicopterDetail.css";
import { LanguageContext } from "../LanguageProvider";
import ShareIcon from "@mui/icons-material/Share";
import Footer from "../componentsFooter/Footer";

const GalleryCard = ({ width, image }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      className="galleryCard"
      style={{
        width: width,
        height: isMobile || isTablet ? "200px" : "400px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></Stack>
  );
};

const HelicopterDetail = ({ heli }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");

  const { translation, toggleLanguage } = useContext(LanguageContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [heli?.id]);

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

  const descriptionItems = useMemo(
    () => Object.values(heli.description ?? {}),
    [heli.description]
  );
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setCurrentDescriptionIndex(0);
  }, [heli.id]);

  useEffect(() => {
    const textToType = descriptionItems[currentDescriptionIndex] ?? "";
    setTypedText("");

    if (!textToType) {
      setTypingComplete(true);
      return;
    }

    setTypingComplete(false);
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      charIndex += 1;
      setTypedText(textToType.slice(0, charIndex));

      if (charIndex >= textToType.length) {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentDescriptionIndex, descriptionItems]);

  useEffect(() => {
    if (!descriptionItems.length || !isTypingComplete) {
      return;
    }

    const holdTimeout = setTimeout(() => {
      setCurrentDescriptionIndex(
        (prev) => (prev + 1) % descriptionItems.length
      );
    }, 1500);

    return () => clearTimeout(holdTimeout);
  }, [descriptionItems, isTypingComplete]);

  return (
    <Stack style={{ width: "100%", height: "100%" }}>
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
        alignItems="center"
        style={{ width: "100%", height: isMobile ? "80vh" : "100vh" }}
      >
        <Stack spacing={35}>
          <Stack alignItems="center" style={{ width: "100%" }}>
            <img
              src="/images/logo.png"
              alt="logo"
              style={{ width: isMobile ? "25%" : "12%" }}
            />
          </Stack>
          <Stack alignItems="center" style={{ width: "100%" }}>
            <Typography className="heliname">{heli.name}</Typography>
            <Typography className="helidescription">{typedText}</Typography>
          </Stack>
        </Stack>

        <Box
          className="videobackground"
          component="video"
          src={heli.video}
          autoPlay
          loop
          muted
          playsInline
        />
        <Box
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%",
          height: isMobile ? "auto" : "55vh",
          backgroundColor: "#fff",
          paddingTop: isMobile ? "5%" : "0%",
        }}
      >
        <div className="S2Tcontainer">
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography className="S2Tprincipal">
              {heli.description2.title1}
            </Typography>

            <Typography className="S2Tdescription">
              {heli.description2.text1}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <Stack
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        {heli.id === 1 ? (
          isMobile || isTablet ? (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ width: "100%" }}
              >
                <GalleryCard width="45%" image={heli.gallery.image2} />
                <GalleryCard width="45%" image={heli.gallery.image1} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ width: "100%" }}
              >
                <GalleryCard width="45%" image={heli.gallery.image3} />
                <GalleryCard width="45%" image={heli.gallery.image4} />
              </Stack>
            </Stack>
          ) : (
            <>
              <GalleryCard width="24%" image={heli.gallery.image2} />
              <GalleryCard width="24%" image={heli.gallery.image1} />
              <GalleryCard width="24%" image={heli.gallery.image3} />
              <GalleryCard width="24%" image={heli.gallery.image4} />
            </>
          )
        ) : isMobile || isTablet ? (
          <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ width: "100%" }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ width: "100%" }}
          >
            <GalleryCard width="90%" image={heli.gallery.image1} />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ width: "100%" }}
          >
            <GalleryCard width="43%" image={heli.gallery.image2}/>
            <GalleryCard width="43%" image={heli.gallery.image3} />
          </Stack>
        </Stack>
        ) : (
          <>
            <GalleryCard width="32%" image={heli.gallery.image1} />
            <GalleryCard width="32%" image={heli.gallery.image2} />
            <GalleryCard width="32%" image={heli.gallery.image3} />
          </>
        )}
      
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%",
          height: isMobile ? "auto" : "55vh",
          backgroundColor: "#fff",
          paddingTop: isMobile ? "0%" : "0%",
        }}
      >
        <div className="S2Tcontainer">
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography className="S2Tprincipal">
              {heli.description2.title2}
            </Typography>

            <Typography className="S2Tdescription">
              {heli.description2.text2}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <Stack
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        {heli.id === 1 ? (
        isMobile || isTablet ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ width: "100%" }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <GalleryCard width="90%" image={heli.gallery.image5} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <GalleryCard width="43%" image={heli.gallery.image6} />
              <GalleryCard width="43%" image={heli.gallery.image7} />
            </Stack>
          </Stack>
        ) : (
          <>
            <GalleryCard width="32%" image={heli.gallery.image5} />
            <GalleryCard width="32%" image={heli.gallery.image6} />
            <GalleryCard width="32%" image={heli.gallery.image7} />
          </>
        )
        ) : (
          isMobile || isTablet ? (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ width: "100%" }}
              >
                <GalleryCard width="90%" image={heli.gallery.image4} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ width: "100%" }}
              >
                <GalleryCard width="43%" image={heli.gallery.image5} />
                <GalleryCard width="43%" image={heli.gallery.image6} />
              </Stack>
            </Stack>
          ) : (
            <>
              <GalleryCard width="32%" image={heli.gallery.image4} />
              <GalleryCard width="32%" image={heli.gallery.image5} />
              <GalleryCard width="32%" image={heli.gallery.image6} />
            </>
          )
        )}


        
      </Stack>


      {heli.id === 1 ? (
        <>
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        <div className="S2Tcontainer">
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography className="S2Tprincipal">
              {heli.description2.title3}
            </Typography>

            <Typography className="S2Tdescription">
              {heli.description2.text3}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <Stack
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        {isMobile || isTablet ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ width: "100%" }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <GalleryCard width="45%" image={heli.gallery.image8} />
              <GalleryCard width="45%" image={heli.gallery.image9} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <GalleryCard width="45%" image={heli.gallery.image10} />
              <GalleryCard width="45%" image={heli.gallery.image11} />
            </Stack>
          </Stack>
        ) : (
          <>
            <GalleryCard width="24%" image={heli.gallery.image8} />
            <GalleryCard width="24%" image={heli.gallery.image9} />
            <GalleryCard width="24%" image={heli.gallery.image10} />
            <GalleryCard width="24%" image={heli.gallery.image11} />
          </>
        )}
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        <div className="S2Tcontainer">
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography className="S2Tprincipal">
              {heli.description2.title4}
            </Typography>

            <Typography className="S2Tdescription">
              {heli.description2.text4}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <Stack
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >

{isMobile || isTablet ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ width: "100%" }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
               <GalleryCard width="90%" image={heli.gallery.image14} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <GalleryCard width="43%" image={heli.gallery.image12} />
              <GalleryCard width="43%" image={heli.gallery.image13} />
            </Stack>
          </Stack>
        ) : (
          <>
        <GalleryCard width="32%" image={heli.gallery.image12} />
        <GalleryCard width="32%" image={heli.gallery.image13} />
        <GalleryCard width="32%" image={heli.gallery.image14} />
          </>
        )}


      
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        <div className="S2Tcontainer">
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography className="S2Tprincipal">
              {heli.description2.title6}
            </Typography>

            <Typography className="S2Tdescription">
              {heli.description2.text6}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <Stack
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        {isMobile || isTablet ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ width: "100%" }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <GalleryCard width="45%" image={heli.gallery.image15} />
              <GalleryCard width="45%" image={heli.gallery.image16} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <GalleryCard width="45%" image={heli.gallery.image17} />
              <GalleryCard width="45%" image={heli.gallery.image18} />
            </Stack>
          </Stack>
        ) : (
          <>
            <GalleryCard width="24%" image={heli.gallery.image15} />
            <GalleryCard width="24%" image={heli.gallery.image16} />
            <GalleryCard width="24%" image={heli.gallery.image17} />
            <GalleryCard width="24%" image={heli.gallery.image18} />
          </>
        )}
      </Stack>
      </>
      ) : (
        null
      )}

      



      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%", height: "55vh", backgroundColor: "#fff" }}
      >
        <div className="S2Tcontainer">
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography className="S2Tprincipal">
              {translation.heliDetail.md902Explorer.description2.title5}
              <br />
              {translation.heliDetail.md902Explorer.description2.text52}
            </Typography>
            <Typography className="S2Tdescription">
              {translation.heliDetail.md902Explorer.description2.text5}
            </Typography>
          </Stack>
        </div>
      </Stack>
      <Footer />
    </Stack>
  );
};

GalleryCard.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
};

HelicopterDetail.propTypes = {
  heli: PropTypes.shape({
    description2: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.objectOf(PropTypes.string),
    video: PropTypes.string.isRequired,
    gallery: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default HelicopterDetail;
