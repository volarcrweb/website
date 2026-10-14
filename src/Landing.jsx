import { SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, useMediaQuery } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import Navbar from './components/componentsNavbar/Navbar';
import Seccion1 from './components/componentsSeccion1/Seccion1';
import './styles/fonts-import.css';
import Seccion5 from './components/componentsSeccion5/Seccion5';
import Footer from './components/componentsFooter/Footer';
import Destinations from './components/componentsDestinations/Destinations';
import Servicios from './components/componentsServicios/Servicios';
import { useEffect } from 'react';

const Landing = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    const section = document.getElementById(window.location.hash.slice(1));
    if (section) {
      section.scrollIntoView({ behavior: 'auto' });
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const actions = [
    {
      icon: <img src="/images/email.svg" style={{ width: isMobile ? '50%' : '60%' }} alt="WA" />,
      name: 'Email',
      url: 'mailto:reservations@volarcr.com',
    },
    {
      icon: <img src="/images/WANegro.svg" style={{ width: isMobile ? '50%' : '60%' }} alt="WA" />,
      name: 'Whatsapp',
      url: 'https://api.whatsapp.com/send?phone=50685959741',
    },
  ];
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      style={{ overflowX: isMobile ? 'hidden' : 'visible' }}
    >
      <Navbar />
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', bottom: isMobile ? '5%' : '16%', right: isMobile ? '8%' : '2%' }}
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
      <Seccion1 />
      <section id="servicios" style={{ width: '100%', zIndex: -1 }}>
        <Servicios />
      </section>
      <section id="experiencias" style={{ width: '100%' }}>
        <Destinations />
      </section>
      <section id="flota" style={{ width: '100%' }}>
        <Seccion5 />
      </section>
      <section id="contacto" style={{ width: '100%' }}>
        <Footer />
      </section>
    </Stack>
  );
};

export default Landing;
