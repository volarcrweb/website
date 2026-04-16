import { useContext, useState } from "react";
import {
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./galeria.css";
import { LanguageContext } from "../LanguageProvider";
import { NavLink } from "react-router-dom";

const Galeria = () => {
  const { translation } = useContext(LanguageContext);
  const [alignment, setAlignment] = useState(1);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleChange = (event, newAlignment) => {
    // Solo permitir cambios si hay una nueva selección (no deseleccionar)
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const amenidades = [
    {
      id: 1,
      nombre: "Manuel Antonio",
      imagen: "/images/galeria/manuelA.svg",
      detalle: [
        {
          id: 1,
          nombre: "60 min",
          imagen: "/images/clock.svg",
          url: "/manuel-antonio",
        },
      ],
    },
    {
      id: 2,
      nombre: translation.type === "es" ? "Volcán Poás" : "Poas Volcano",
      imagen: "/images/poasNew.svg",
      detalle: [
        {
          id: 1,
          nombre: "45 min",
          imagen: "/images/clock.svg",
          url: "/poas",
        },
      ],
    },
    {
      id: 3,
      nombre: "Tárcoles / Carara",
      imagen: "/images/tarcolesG.svg",
      detalle: [
        {
          id: 1,
          nombre: "60 min",
          imagen: "/images/clock.svg",
          url: "/tarcoles-carara",
        },
      ],
    },
    {
      id: 4,
      nombre: "Mini City Tour",
      imagen: "/images/cityG.svg",
      detalle: [
        {
          id: 1,
          nombre: "15 min",
          imagen: "/images/clock.svg",
          url: "/mini-city-tour",
        },
      ],
    },
    {
      id: 5,
      nombre: "City Tour",
      imagen: "/images/cartagoG.svg",
      detalle: [
        {
          id: 1,
          nombre: "30 min",
          imagen: "/images/clock.svg",
          url: "/city-tour",
        },
      ],
    },
  ];

  return (
    <Stack spacing={0} style={{ width: "100%", height: isMobile ? "90vh" : "115vh" }}>
      {/* <Stack style={{width: "100%", height: "25%", backgroundColor:"#F2F4F8"}}>
  <div className="movingtext-container">
    <Typography className="movingtext">
      {translation.seccion4.extraordinario} &nbsp;&nbsp;&nbsp; {translation.seccion4.extraordinario} &nbsp;&nbsp;&nbsp;{translation.seccion4.extraordinario} &nbsp;&nbsp;&nbsp;{translation.seccion4.extraordinario} &nbsp;&nbsp;&nbsp;{translation.seccion4.extraordinario} &nbsp;&nbsp;&nbsp;{translation.seccion4.extraordinario} &nbsp;&nbsp;&nbsp;{translation.seccion4.extraordinario} &nbsp;&nbsp;&nbsp;
    </Typography>
  </div>
</Stack> */}

      <Stack
        justifyContent={"flex-start"}
        alignItems={"flex-end"}
        style={{
          width: "100%",
          height: "50%",
          backgroundImage: "url(/images/fondoNEW.svg)",
          backgroundSize: "cover",
          backgroundPosition: "top",
          paddingTop: isMobile ? "1rem" : "3rem",
        }}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          spacing={isMobile ? 1 : 2}
          style={{ width: isMobile ? "100%" : "50%" }}
        >
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            spacing={isMobile ? 0 : -2}
          >
            <Typography className="tituloAmenidades">
              {translation.seccion4.titulo}
            </Typography>
            <Typography className="subtituloAmenidades">
              {translation.seccion4.subtitulo}
            </Typography>
          </Stack>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Amenidades"
          >
            <Stack
              direction={"row"}
              spacing={2}
              flexWrap={"wrap"}
              justifyContent={"center"}
              style={{ rowGap: isMobile ? "0.5rem" : "0" }}
            >
              {amenidades.map((amenidad) => (
                <ToggleButton
                  key={amenidad.id}
                  value={amenidad.id}
                  className="toggleButton"
                >
                  {amenidad.nombre}
                </ToggleButton>
              ))}
            </Stack>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      <Stack
        justifyContent={"center"}
        alignItems={"flex-end"}
        style={{
          width: "99%",
          height: "60%",
          overflow: "visible",
          position: "relative",
        }}
      >
        {/* Carrusel Container */}
        <Stack
          style={{
            position: "relative",
            width: "78%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            alignItems: "flex-start",
          }}
        >
          {amenidades.map((amenidad, index) => {
            // Determinar si es la imagen activa
            const isActive = amenidad.id === alignment;

            // En móvil, solo mostrar la imagen activa
            if (isMobile && !isActive) {
              return null;
            }

            // Implementar carrusel circular
            const totalImages = amenidades.length;
            const activeIndex = alignment - 1; // alignment 1->index 0, 2->index 1, etc.

            // Calcular posición relativa circular
            let relativePosition = index - activeIndex;

            // Ajustar para que sea circular
            if (relativePosition < -Math.floor(totalImages / 2)) {
              relativePosition += totalImages;
            } else if (relativePosition > Math.floor(totalImages / 2)) {
              relativePosition -= totalImages;
            }

            // Posicionar 2 a cada lado del centro
            const clampedPosition = Math.max(-2, Math.min(2, relativePosition));
            const translateX =
              clampedPosition === 0
                ? 0
                : clampedPosition === -1
                ? -430
                : clampedPosition === 1
                ? 430
                : clampedPosition === -2
                ? -720
                : 720;

            // Calcular translateX basado en la posición final
            //  const translateX = finalPosition * 410;

            // Calculate positioning and scaling
            let scale = 1;
            let zIndex = 1;
            let opacity = 1;
            let width = "15rem";
            let height = "15rem";
            let marginTop = "0px";
            let borderRadius = "50%";
            //  let border = "2px solid gray";

            // Solo la imagen activa tiene estilo especial
            if (isActive) {
              scale = isMobile ? 1 : 2.5;
              zIndex = 3;
              width = "15rem";
              height = "15rem";
              marginTop = "-3.5rem";
              //  border = "2px solid red";
              //  borderRadius = "0.5rem";
            } else {
              // Las demás imágenes mantienen estilo normal
              zIndex = 5;
              //  border = `2px solid ${['blue', 'magenta', 'green', 'yellow'][index % 4]}`;
            }

            return (
              <Stack
                key={amenidad.id}
                style={{
                  position: "absolute",
                  left: "50%",
                  width: width,
                  height: height,
                  backgroundImage: `url(${amenidad.imagen})`,
                  backgroundSize: isActive ? "auto" : "auto",
                  backgroundPosition: "center",
                  borderRadius: borderRadius,
                  transform: `translateX(calc(${translateX}px - 50%)) scale(${scale})`,
                  transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: zIndex,
                  opacity: opacity,
                  cursor: isActive ? "default" : "pointer",
                  marginTop: marginTop,
                  // border: border,
                  boxShadow: isActive
                    ? "none"
                    : "0 2px 4px 0 rgba(0, 0, 0, 0.25)",
                }}
                justifyContent="flex-end"
                alignItems="flex-start"
                onClick={() => !isActive && setAlignment(amenidad.id)}
              ></Stack>
            );
          })}
        </Stack>

        <Stack style={{ width: isMobile ? "100%" : "50%", height: "100%" }}>
          {/* Mostrar detalles de la amenidad activa */}
          {(() => {
            // Encontrar la amenidad activa
            const amenidadActiva = amenidades.find(
              (amenidad) => amenidad.id === alignment
            );

            if (!amenidadActiva) return null;

            const detallePrincipal = amenidadActiva.detalle?.[0];
            const detailUrl = detallePrincipal?.url ?? "/";

            return (
              <Stack
                direction={"row"}
                justifyContent={isMobile ? "center" : "flex-start"}
                alignItems={"center"}
                spacing={isMobile ? 3 : 6}
                style={{
                  paddingTop: isMobile ? "2rem" : "3rem",
                  paddingLeft: isMobile ? "0" : "13em",
                }}
              >
                <Stack direction={"row"} spacing={isMobile ? 3 : 5}>
                  <NavLink
                    to={detailUrl}
                    className="btnmas"
                    style={{ pointerEvents: detallePrincipal ? "auto" : "none" }}
                  >
                    {translation.tourDetail.txtMoreInformation}
                  </NavLink>
                </Stack>

                <Divider
                  orientation="vertical"
                  flexItem
                  style={{
                    height: "100%",
                    borderColor: "#2D2D2D",
                    borderWidth: isMobile ? "0.05rem" : "0.1575rem",
                  }}
                />

                <Stack>
                  {(() => {
                    const palabras = amenidadActiva.nombre.split(" ");
                    const primeraPalabra = palabras[0];
                    const segundaPalabra = palabras.slice(1).join(" ");

                    return (
                      <>
                        <Typography className="tituloDetalle">
                          {primeraPalabra}
                        </Typography>
                        {segundaPalabra && (
                          <Typography
                            className="tituloDetalle"
                            style={{ paddingLeft: "1rem" }}
                          >
                            {segundaPalabra}
                          </Typography>
                        )}
                      </>
                    );
                  })()}
                </Stack>
              </Stack>
            );
          })()}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Galeria;
