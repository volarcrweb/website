import { Menu, MenuItem } from '@mui/material';
import { aircraft } from '../componentsSeccion5/aircraft';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../LanguageProvider';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import './navbar.css';

export default function Navbar() {
  const { translation, toggleLanguage } = useContext(LanguageContext);
  const { pathname } = useLocation();
  const homePrefix = pathname === '/' ? '' : '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fleetAnchor, setFleetAnchor] = useState(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const close = () => {
    setMobileOpen(false);
    setFleetAnchor(null);
  };
  return (
    <header
      className={`volar-navbar${scrolled ? ' is-scrolled' : ''}${mobileOpen ? ' is-open' : ''}`}
    >
      <div className="navbar-inner">
        <a
          className="navbar-logo"
          href={`${homePrefix}#inicio`}
          aria-label="Volar Air Charter — Inicio"
          onClick={close}
        >
          <img src="/images/logo.png" alt="Volar Air Charter" />
        </a>
        <nav className="navbar-links" id="main-navigation" aria-label="Navegación principal">
          <a href={`${homePrefix}#destinos`} onClick={close}>
            Destinos <KeyboardArrowDownRoundedIcon />
          </a>
          <a href={`${homePrefix}#servicios`} onClick={close}>
            Vuelos charter <KeyboardArrowDownRoundedIcon />
          </a>
          <a href={`${homePrefix}#experiencias`} onClick={close}>
            Experiencias <KeyboardArrowDownRoundedIcon />
          </a>
          <button
            className="navbar-fleet-toggle"
            onClick={(event) => setFleetAnchor(event.currentTarget)}
            aria-haspopup="menu"
            aria-expanded={Boolean(fleetAnchor)}
            aria-controls={fleetAnchor ? 'fleet-submenu' : undefined}
          >
            Flota <KeyboardArrowDownRoundedIcon />
          </button>
          <a href={`${homePrefix}#contacto`} onClick={close}>
            Contacto
          </a>
        </nav>
        <Menu
          id="fleet-submenu"
          anchorEl={fleetAnchor}
          open={Boolean(fleetAnchor)}
          onClose={() => setFleetAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          disableScrollLock
          MenuListProps={{ 'aria-label': 'Flota de helicópteros' }}
          PaperProps={{
            sx: { mt: 1, minWidth: 210, borderRadius: 2, boxShadow: '0 8px 30px #123e4826' },
          }}
        >
          {aircraft.map((helicopter) => (
            <MenuItem
              key={helicopter.id}
              component={Link}
              to={helicopter.href}
              onClick={close}
              sx={{
                fontFamily: "'Montserrat-Regular', sans-serif",
                fontSize: 13,
                color: '#134a4b',
                py: 1.5,
              }}
            >
              {helicopter.name}
            </MenuItem>
          ))}
        </Menu>
        <div className="navbar-actions">
          <button
            className="navbar-language"
            onClick={toggleLanguage}
            aria-label="Cambiar idioma / Change language"
          >
            <img src={translation.buttonText} alt="" />
            <KeyboardArrowDownRoundedIcon />
          </button>
          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
