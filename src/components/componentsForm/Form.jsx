
import { Stack, Button, Typography, Box, useMediaQuery } from "@mui/material";
import { useState, useContext } from "react";
import { LanguageContext } from "../LanguageProvider";
import PropTypes from 'prop-types';
import CountryCode from "./CountryCode";
import "./form.css";

const Form = ({ location, destination, people, onClose }) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
  const { translation } = useContext(LanguageContext);
  
  // Opciones para los selects (mismas que en Seccion1)
  const locationOptions = [
    translation.filter?.Aeropuerto + " Tobias Bolanos" || "Aeropuerto Tobias Bolanos", 
    translation.filter?.Aeropuerto + " Juan Santamaría" || "Aeropuerto Juan Santamaría", 
    translation.filter?.Aeropuerto + " Daniel Oduber Quirós" || "Aeropuerto Daniel Oduber Quirós", 
    "Papagayo", "Santa Teresa", "Nosara", "Tamarindo", "Cobano", "Tango Mar", "Montezuma", 
    "Jaco", "Uvita", "Palma Sur", "Drake", "Golfito", "Laurel", "San Vito", "Jimenez", 
    "Fortuna", "Los Chiles", "Puerto Viejo"
  ];
  
  const destinationOptions = [
    translation.filter?.Aeropuerto + " Tobias Bolanos" || "Aeropuerto Tobias Bolanos", 
    translation.filter?.Aeropuerto + " Juan Santamaría" || "Aeropuerto Juan Santamaría", 
    translation.filter?.Aeropuerto + " Daniel Oduber Quirós" || "Aeropuerto Daniel Oduber Quirós", 
    "Papagayo", "Santa Teresa", "Nosara", "Tamarindo", "Cobano", "Tango Mar", "Montezuma", 
    "Jaco", "Uvita", "Palma Sur", "Drake", "Golfito", "Laurel", "San Vito", "Jimenez", 
    "Fortuna", "Los Chiles", "Puerto Viejo"
  ];
  
  const peopleOptions = [
    "1 " + (translation.filter?.person || "persona"), 
    "2 " + (translation.filter?.people || "personas"), 
    "3 " + (translation.filter?.people || "personas"), 
    "4 " + (translation.filter?.people || "personas"), 
    "5 " + (translation.filter?.people || "personas"), 
    "6 " + (translation.filter?.people || "personas"),
    "7 " + (translation.filter?.people || "personas")
  ];

  const [formData, setFormData] = useState({
    location: location || "",
    destination: destination || "",
    people: people || "",
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (field) => (event) => {
    const value = typeof event === 'string' ? event : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Estilos para los inputs y selects
  const inputStyle = {
    boxSizing: 'border-box'
  };


  const handleFocus = (e) => {
    e.target.style.borderColor = '#134A4B';
    e.target.style.borderWidth = '2px';
    // Actualizar el label
    const label = e.target.parentNode.querySelector('label');
    if (label) {
      label.style.top = '-8px';
      label.style.fontSize = '12px';
      label.style.color = '#134A4B';
    }
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#c4c4c4';
    e.target.style.borderWidth = '1px';
    // Actualizar el label si no hay valor
    const label = e.target.parentNode.querySelector('label');
    if (label && !e.target.value) {
      label.style.top = '16.5px';
      label.style.fontSize = '16px';
      label.style.color = '#666';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Crear mensaje para WhatsApp
    const message = `¡Hola! Me gustaría solicitar información sobre un vuelo:

📍 Origen: ${formData.location || 'No especificado'}
🎯 Destino: ${formData.destination || 'No especificado'}  
👥 Pasajeros: ${formData.people || 'No especificado'}

📝 Información de contacto:
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}

💬 Mensaje adicional:
${formData.message || 'Sin mensaje adicional'}

¡Gracias!`;

    // Abrir WhatsApp con el mensaje
    const whatsappUrl = `https://api.whatsapp.com/send?phone=50685959741&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Cerrar el dialog
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {/* Título */}
        <Stack justifyContent={"center"} alignItems={"center"}>
            <img src="/images/logo.png" alt="logo" style={{width: isMobile ? "25%" : "15%"}} />
            <Stack justifyContent={"center"} alignItems={"center"} spacing={isMobile || isTablet ? 1 : 0}>
                <Typography className="titleForm1">
                    {translation.form?.titleForm1 || 'La aventura empieza aquí'}
                </Typography>
                <Typography className="titleForm2">
                {translation.form?.titleForm2 || 'Nos adaptamos a tus necesidades'}
                </Typography>
            </Stack>
            <Typography className="titleForm3">
            {translation.form?.titleForm3 || 'Llená el formulario para recibir más información'}
            </Typography>
        </Stack>

{/* Información del vuelo */}
        <Stack spacing={1}>
          <Typography className="titleSectionForm">
            {translation.form?.flightInfo || 'Información del Vuelo'}
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} style={{width: "100%"}}>
            <Box sx={{ position: 'relative', width: "50%" }}>
              <select
                id="location-select"
                value={formData.location}
                onChange={handleChange('location')}
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="selectInput"
              >
                <option value="" disabled>
                  {translation.seccion1?.from || 'Origen'}
                </option>
                {locationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
        
            </Box>
            
            <Box sx={{ position: 'relative', width: "50%" }}>
              <select
                id="destination-select"
                value={formData.destination}
                onChange={handleChange('destination')}
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="selectInput"
              >
                <option value="" disabled>
                  {translation.seccion1?.to || 'Destino'}
                </option>
                {destinationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
        
            </Box>
            </Stack>
         
            
            <Box sx={{ position: 'relative' }}>
              <select
                id="people-select"
                value={formData.people}
                onChange={handleChange('people')}
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="selectInput"
              >
                <option value="" disabled>
                  {translation.seccion1?.people || 'Pasajeros'}
                </option>
                {peopleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
        
            </Box>
          </Stack>
        </Stack>

        {/* Información de contacto */}
        <Stack spacing={1}>
          <Typography className="titleSectionForm">
            {translation.form?.contactInfo || 'Información de Contacto'}
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ position: 'relative' }}>
              <input
                type="text"
                id="name-input"
                className="contactoInput"
                value={formData.name}
                onChange={handleChange('name')}
                required
                placeholder={translation.form?.name || 'Nombre completo'}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
           
            </Box>
            <CountryCode
                  value={formData.phone}
                  onChange={(phone) => handleChange('phone')(phone)}
                  />
            <Box sx={{ position: 'relative' }}>
              <input
                type="email"
                id="email-input"
                className="contactoInput"
                value={formData.email}
                onChange={handleChange('email')}
                required
                placeholder={translation.form?.email || 'Correo electrónico'}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
           
            </Box>
        
            <Box sx={{ position: 'relative' }}>
              <textarea
                id="message-input"
                value={formData.message}
                onChange={handleChange('message')}
                rows={4}
                placeholder={translation.form?.message || 'Cuéntanos más detalles sobre tu viaje...'}
                className="textareaInput"
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '100px'
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
             
            </Box>
          </Stack>
        </Stack>

        {/* Botones */}
        <Stack alignItems={"center"}>
          <Button
            type="submit"
            className="button-form"
          >
            {translation.form?.btnSend || 'Enviar'}
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="9"
                      viewBox="0 0 7 9"
                      fill="none"
                    >
                      <rect
                        x="0.46167"
                        y="3.82581"
                        width="6.20564"
                        height="4.74927"
                        rx="0.878292"
                        fill="white"
                      />
                      <path
                        d="M5.28098 3.35144C5.28098 4.41984 4.48063 5.22608 3.56469 5.22608C2.64874 5.22608 1.84839 4.41984 1.84839 3.35144C1.84839 2.28305 2.64874 1.47681 3.56469 1.47681C4.48063 1.47681 5.28098 2.28305 5.28098 3.35144Z"
                        stroke="white"
                      />
                    </svg>
                    <Typography className="bottom-form">
                    {translation.form?.confidencial || 'Su información es 100% confidencial'}
                    </Typography>
                  </Stack>
      </Stack>
    </Box>
  );
}

Form.propTypes = {
  location: PropTypes.string,
  destination: PropTypes.string,
  people: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default Form
