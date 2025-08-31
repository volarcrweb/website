import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, useMediaQuery } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import Seccion1 from './components/componentsSeccion1/Seccion1'
import "./styles/fonts-import.css"
// import Seccion2 from './components/componentsSeccion2/Seccion2'
// import Seccion3 from './components/componentsSeccion3/Seccion3'
import Seccion5 from './components/componentsSeccion5/Seccion5'
// import Seccion4 from './components/componentsSeccion4/Seccion4'
import Footer from './components/componentsFooter/Footer';
import Galeria from './components/componentsGaleria/Galeria';
import Servicios from './components/componentsServicios/Servicios'
import Tours from './components/componentsTours/Tours';
// import Seccion6 from './components/componentsSeccion6/Seccion6'
import { useContext } from 'react';
import { LanguageContext } from './components/LanguageProvider';

const Landing = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { translation, toggleLanguage } = useContext(LanguageContext);

  const actions = [
    { icon: <img src="/images/email.svg" style={{width: isMobile ? "50%" : "60%"}} alt='WA'/>, name: 'Email', url: "mailto:reservations@volarcr.com" },
    { icon: <img src="/images/WANegro.svg" style={{width: isMobile ? "50%" : "60%"}} alt='WA'/>, name: 'Whatsapp', url: "https://api.whatsapp.com/send?phone=50685959741" },
  ];
  return (
<Stack justifyContent={"center"} alignItems={"center"} style={{overflowX:isMobile ? "hidden" : "visible"}}>
<SpeedDial
        ariaLabel="Language toggle"
        sx={{ position: 'fixed', top: isMobile ? "3%" : "2%", right: isMobile ? "3%" : "2%", zIndex: 1000 }}
        FabProps={{ 
          sx: { 
            bgcolor: '#F2F4F8', 
            color: '#134A4B', 
            boxShadow: 'none',
            width: isMobile ? 44 : 64,
            height: isMobile ? 28 : 40,
            borderRadius: 2, // Esto lo hace cuadrado con bordes redondeados
            '&:hover': { 
              bgcolor: '#C3C5C8',
            } 
          } 
        }}
        icon={<img src={translation.buttonText} style={{width:"40%"}} alt="Language"/>}
        onClick={toggleLanguage}
        open={false}
      />

<SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', bottom: isMobile ? "5%" : "16%", right: isMobile ? "8%" : "2%" }}
        FabProps={{ sx: { bgcolor: '#134A4B', color: '#fff', '&:hover': { bgcolor: '#0f3a3b' } } }}
        icon={<SpeedDialIcon openIcon={<ShareIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => window.open(action.url, '_blank')}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    <Seccion1/>
    <Servicios/>
    <Tours/>
    {/* <Seccion2/> */}
    <Galeria/>
    {/* <Seccion3/> */}
    <Seccion5/>
    {/* <Seccion4/> */}
    {/* <Seccion6/> */}
    <Footer/>
</Stack>
  )
}

export default Landing
