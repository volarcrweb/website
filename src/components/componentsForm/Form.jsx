
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
  const locationOptions = [translation.filter.Aeropuerto+" Tobias Bolanos", translation.filter.Aeropuerto+" Juan Santamaría", translation.filter.Aeropuerto+" Daniel Oduber Quirós", "Los sueños", "Papagayo", "Quepos", "Limón" ,"Santa Teresa", "Nosara", "Tamarindo", "Cobano","Tango Mar","Montezuma","Jaco","Uvita", "Palma Sur","Drake","Golfito","Laurel","San Vito", "Jimenez","Fortuna", "Los Chiles", "Puerto Viejo", "Hacienda Altagracias", "Tortuguero"];
  const destinationOptions = [translation.filter.Aeropuerto+" Tobias Bolanos", translation.filter.Aeropuerto+" Juan Santamaría", translation.filter.Aeropuerto+" Daniel Oduber Quirós", "Los sueños", "Papagayo", "Quepos", "Limón" ,"Santa Teresa", "Nosara", "Tamarindo", "Cobano","Tango Mar","Montezuma","Jaco","Uvita", "Palma Sur","Drake","Golfito","Laurel","San Vito", "Jimenez","Fortuna", "Los Chiles", "Puerto Viejo", "Hacienda Altagracias", "Tortuguero"];
  
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

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmitMessage('');
    
    try {
      // Determinar la URL del API según el entorno
      const currentHostname = window.location.hostname;
      let apiUrl;
      
      // Durante desarrollo, siempre usar apivolar.com que sabemos que funciona
      if (currentHostname === 'localhost' || currentHostname === '127.0.0.1' || currentHostname === 'apivolar.com') {
        apiUrl = 'https://api.volarcr.com/enviar-correo';
      } else {
        // Para producción en volarcr.com
        apiUrl = 'https://api.volarcr.com/enviar-correo';
      }
      
      // Agregar el idioma a los datos del formulario
      const dataToSend = {
        ...formData,
        language: translation.type || 'en' // Obtener el idioma del contexto
      };
      
      // Debug temporal - verificar qué se está enviando
      console.log('Datos que se envían al API:', dataToSend);
      console.log('Campo phone específicamente:', dataToSend.phone);
      
      
      // Enviar datos al API
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors', // Explicitar CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      
      let result;
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error('Error al procesar la respuesta del servidor');
      }
      
      
      if (result.success === true || result.success === "true") {
        const successMessage = translation.type === 'es' 
          ? (translation.form?.successMessage || '¡Correo enviado exitosamente! Te contactaremos pronto.')
          : (translation.form?.successMessage || 'Email sent successfully! We will contact you soon.');
        setSubmitMessage(successMessage);
        
        // Limpiar formulario
        setFormData({
          location: location || "",
          destination: destination || "",
          people: people || "",
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        
        // Cerrar el dialog después de 3 segundos
        setTimeout(() => {
          onClose();
        }, 3000);
        
      } else {
        // Si llegamos aquí, el correo probablemente se envió pero hay un problema con la respuesta
        
        // Si hay un mensaje de error específico, usarlo
        if (result.error) {
          throw new Error(result.error);
        } else if (result.message && (result.message.includes('exitosamente') || result.message.includes('successfully'))) {
          // Si el mensaje indica éxito, tratarlo como éxito
          const successMessage = translation.type === 'es' 
            ? '¡Correo enviado exitosamente! Te contactaremos pronto.'
            : 'Email sent successfully! We will contact you soon.';
          setSubmitMessage(successMessage);
          
          // Limpiar formulario
          setFormData({
            location: location || "",
            destination: destination || "",
            people: people || "",
            name: "",
            email: "",
            phone: "",
            message: ""
          });
          
          // Cerrar el dialog después de 3 segundos
          setTimeout(() => {
            onClose();
          }, 3000);
        } else {
          throw new Error('Respuesta inesperada del servidor');
        }
      }
      
    } catch (error) {
      
      const isSpanish = translation.type === 'es';
      let errorMessage = isSpanish 
        ? (translation.form?.errorMessage || 'Error al enviar el correo. Por favor intenta nuevamente.')
        : (translation.form?.errorMessage || 'Error sending email. Please try again.');
      
      // Manejar diferentes tipos de errores
      if (error.name === 'TypeError') {
        if (error.message.includes('fetch')) {
          errorMessage = isSpanish 
            ? 'Error de conexión. Verifica que el servidor esté funcionando.'
            : 'Connection error. Please verify that the server is running.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = isSpanish 
            ? 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
            : 'Could not connect to server. Please check your internet connection.';
        }
      } else if (error.message.includes('HTTP error')) {
        const prefix = isSpanish ? 'Error del servidor:' : 'Server error:';
        errorMessage = `${prefix} ${error.message}`;
      } else if (error.message.includes('JSON')) {
        errorMessage = isSpanish 
          ? 'Error al procesar la respuesta del servidor.'
          : 'Error processing server response.';
      } else {
        // Para cualquier otro error, mostrar el mensaje específico
        errorMessage = error.message || (isSpanish ? 'Error desconocido al enviar el correo.' : 'Unknown error sending email.');
      }
      
      setSubmitMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
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

        {/* Mensaje de estado */}
        {submitMessage && (
          <Stack alignItems={"center"}>
            <Typography 
              sx={{ 
                color: submitMessage.includes('Error') ? '#d32f2f' : '#2e7d32',
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '10px',
                backgroundColor: submitMessage.includes('Error') ? '#ffebee' : '#e8f5e8',
                borderRadius: '8px',
                border: submitMessage.includes('Error') ? '1px solid #d32f2f' : '1px solid #2e7d32'
              }}
            >
              {submitMessage}
            </Typography>
          </Stack>
        )}

        {/* Botones */}
        <Stack alignItems={"center"}>
          <Button
            type="submit"
            className="button-form"
            disabled={isLoading}
            sx={{ 
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading 
              ? (translation.form?.sending || 'Enviando...') 
              : (translation.form?.btnSend || 'Enviar')
            }
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
