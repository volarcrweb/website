import { Button, Menu, MenuItem, useMediaQuery, Dialog, DialogContent } from '@mui/material';
import './seccion1.css';
import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../LanguageProvider';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import Form from '../componentsForm/Form';

const Seccion1 = () => {
  const { translation } = useContext(LanguageContext);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [location, setLocation] = useState('');
  const [dateOption, setDateOption] = useState('');
  const [people, setPeople] = useState('');

  const [anchorLocation, setAnchorLocation] = useState(null);
  const [anchorDate, setAnchorDate] = useState(null);
  const [anchorPeople, setAnchorPeople] = useState(null);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [isPeopleMenuOpen, setIsPeopleMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const locationOptions = [
    translation.filter.Aeropuerto + ' Tobias Bolanos',
    translation.filter.Aeropuerto + ' Juan Santamaría',
    translation.filter.Aeropuerto + ' Daniel Oduber Quirós',
    'Los sueños',
    'Papagayo',
    'Quepos',
    'Limón',
    'Santa Teresa',
    'Nosara',
    'Tamarindo',
    'Cobano',
    'Tango Mar',
    'Montezuma',
    'Jaco',
    'Uvita',
    'Palma Sur',
    'Drake',
    'Golfito',
    'Laurel',
    'San Vito',
    'Jimenez',
    'Fortuna',
    'Los Chiles',
    'Puerto Viejo',
    'Hacienda Altagracias',
    'Tortuguero',
  ];
  const dateOptions = locationOptions;
  const peopleOptions = [
    '1 ' + translation.filter.person,
    '2 ' + translation.filter.people,
    '3 ' + translation.filter.people,
    '4 ' + translation.filter.people,
    '5 ' + translation.filter.people,
    '6 ' + translation.filter.people,
    '7 ' + translation.filter.people,
  ];

  const handleOpenLocation = (event) => {
    setAnchorLocation(event.currentTarget);
    setIsLocationMenuOpen(true);
  };
  const handleOpenDate = (event) => {
    setAnchorDate(event.currentTarget);
    setIsDateMenuOpen(true);
  };
  const handleOpenPeople = (event) => {
    setAnchorPeople(event.currentTarget);
    setIsPeopleMenuOpen(true);
  };

  const handleCloseLocation = () => setIsLocationMenuOpen(false);
  const handleCloseDate = () => setIsDateMenuOpen(false);
  const handleClosePeople = () => setIsPeopleMenuOpen(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  // Función para cerrar todos los menús
  const closeAllMenus = () => {
    setIsLocationMenuOpen(false);
    setIsDateMenuOpen(false);
    setIsPeopleMenuOpen(false);
  };

  // Effect para cerrar menús al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      // Solo cerrar si algún menú está abierto
      if (isLocationMenuOpen || isDateMenuOpen || isPeopleMenuOpen) {
        // Cerrar inmediatamente
        closeAllMenus();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLocationMenuOpen, isDateMenuOpen, isPeopleMenuOpen]);
  const isEnglish = translation.seccion1.from === 'From';
  return (
    <section className="volar-hero" id="inicio">
      <video
        className="videobackground"
        src="/images/videohome.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="hero-eyebrow">
          {isEnglish ? 'PRIVATE HELICOPTER CHARTER' : 'VUELOS PRIVADOS EN HELICÓPTERO'}
        </p>
        <h1 className="hero-title">
          {isEnglish ? (
            <>
              Charter flights
              <br />
              in Costa Rica
            </>
          ) : (
            <>
              Vuelos privados <br />
              en helicóptero
              <br />
              en Costa Rica
            </>
          )}
        </h1>
        <p className="hero-description">
          {isEnglish
            ? 'Private flights tailored around your time, destination and experience.'
            : 'Vuelos privados a la medida de tu tiempo, destino y experiencia.'}
        </p>
        <button className="hero-plan" onClick={handleOpenDialog}>
          {isEnglish ? 'Plan your flight' : 'Planea tu vuelo'}
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="hero-quote" id="cotizacion">
        <button
          className="quote-field"
          onClick={handleOpenLocation}
          aria-haspopup="menu"
          aria-expanded={isLocationMenuOpen}
        >
          <PlaceRoundedIcon />
          <span>
            <strong>{translation.seccion1.from}</strong>
            <small>{location || translation.seccion1.yourOrigin}</small>
          </span>
        </button>
        <button
          className="quote-field"
          onClick={handleOpenDate}
          aria-haspopup="menu"
          aria-expanded={isDateMenuOpen}
        >
          <PlaceRoundedIcon />
          <span>
            <strong>{translation.seccion1.to}</strong>
            <small>{dateOption || translation.seccion1.yourDestination}</small>
          </span>
        </button>
        <button
          className="quote-field"
          onClick={handleOpenPeople}
          aria-haspopup="menu"
          aria-expanded={isPeopleMenuOpen}
        >
          <PeopleOutlineRoundedIcon />
          <span>
            <strong>{translation.seccion1.people}</strong>
            <small>{people || translation.seccion1.howManyPeople}</small>
          </span>
        </button>
        <Button className="hero-request" onClick={handleOpenDialog}>
          {translation.seccion1.request}
          <span aria-hidden="true">→</span>
        </Button>
      </div>
      {/* Menús desplegables */}
      <Menu
        anchorEl={anchorLocation}
        open={isLocationMenuOpen}
        onClose={handleCloseLocation}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        disableScrollLock={true}
        disableAutoFocusItem={true}
        disableRestoreFocus={true}
        MenuListProps={{
          disablePadding: false,
          style: { position: 'relative' },
        }}
        PaperProps={{
          style: {
            maxHeight: 48 * 5.5, // Altura aproximada para 5.5 items (48px por item)
            width: 'auto',
            zIndex: 1300, // Asegurar que aparezca por encima de otras secciones
          },
        }}
      >
        {locationOptions.map((opt) => (
          <MenuItem
            key={opt}
            onClick={() => {
              setLocation(opt);
              handleCloseLocation();
            }}
          >
            {opt}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorDate}
        open={isDateMenuOpen}
        onClose={handleCloseDate}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        disableScrollLock={true}
        disableAutoFocusItem={true}
        disableRestoreFocus={true}
        MenuListProps={{
          disablePadding: false,
          style: { position: 'relative' },
        }}
        PaperProps={{
          style: {
            maxHeight: 48 * 5.5, // Altura aproximada para 5.5 items (48px por item)
            width: 'auto',
            zIndex: 1300, // Asegurar que aparezca por encima de otras secciones
          },
        }}
      >
        {dateOptions.map((opt) => (
          <MenuItem
            key={opt}
            onClick={() => {
              setDateOption(opt);
              handleCloseDate();
            }}
          >
            {opt}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorPeople}
        open={isPeopleMenuOpen}
        onClose={handleClosePeople}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        disableScrollLock={true}
        disableAutoFocusItem={true}
        disableRestoreFocus={true}
        MenuListProps={{
          disablePadding: false,
          style: { position: 'relative' },
        }}
        PaperProps={{
          style: {
            maxHeight: 48 * 5.5, // Altura aproximada para 5.5 items (48px por item)
            width: 'auto',
            zIndex: 1300, // Asegurar que aparezca por encima de otras secciones
          },
        }}
      >
        {peopleOptions.map((opt) => (
          <MenuItem
            key={opt}
            onClick={() => {
              setPeople(opt);
              handleClosePeople();
            }}
          >
            {opt}
          </MenuItem>
        ))}
      </Menu>

      {/* Dialog para el formulario */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: '1.25rem',
            backgroundColor: '#298c8d6b',
            minHeight: 'auto',
            backdropFilter: 'blur(10px)',
            width: isMobile || isTablet ? '90%' : '35%',
            maxWidth: isMobile || isTablet ? '90%' : '35%',
            height: isMobile || isTablet ? 'auto' : 'auto',
            maxHeight: isMobile || isTablet ? '100%' : '100%',
          },
        }}
      >
        <DialogContent sx={{ padding: isMobile || isTablet ? '4% 5%' : '2% 5%' }}>
          <Form
            location={location}
            destination={dateOption}
            people={people}
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Seccion1;
