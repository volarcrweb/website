import { useContext } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageProvider';
import { destinations } from './destinationsData';
import './destinations.css';

export default function Destinations() {
  const { translation } = useContext(LanguageContext);
  const language = translation.type === 'es' ? 'es' : 'en';
  const english = language === 'en';
  const featured = destinations.find((destination) => destination.featured) || destinations[0];

  const others = destinations.filter((destination) => destination.id !== featured.id);
  const photoStyle = (destination) => ({
    backgroundImage: `url(${destination.image})`,
    backgroundPosition: destination.imagePosition,
    backgroundSize: destination.strip ? '500% auto' : 'cover',
  });
  const metadata = (destination) => (
    <div className="destination-meta">
      <span>
        <AccessTimeRoundedIcon />
        {destination.duration[language]}
      </span>
      <i aria-hidden="true" />
      <span>
        <PeopleAltRoundedIcon />
        {destination.passengers}
      </span>
    </div>
  );
  return (
    <section className="destinations-section" id="destinos" aria-labelledby="destinations-title">
      <div className="destinations-layout">
        <div className="destinations-intro">
          <p className="destinations-eyebrow">
            {english ? 'TOP DESTINATIONS' : 'DESTINOS DESTACADOS'}
            <span />
          </p>
          <h2 id="destinations-title">
            {english ? (
              <>
                Discover Costa Rica
                <br />
                from the air.
              </>
            ) : (
              <>
                Descubre Costa Rica
                <br />
                desde el aire.
              </>
            )}
          </h2>
          <p className="destinations-description">
            {english
              ? 'Explore our most popular helicopter tours and experience the natural wonders that make Costa Rica a world-class destination.'
              : 'Explora nuestros tours en helicóptero más populares y vive las maravillas naturales que hacen de Costa Rica un destino de clase mundial.'}
          </p>
          <div
            className="destinations-map"
            aria-label={
              english ? 'Destination map of Costa Rica' : 'Mapa de destinos de Costa Rica'
            }
          >
            <img src="/images/mapa.svg" alt="" />
            {destinations.map((destination) => (
              <Link
                to={'#'}
                key={destination.id}
                style={{ left: `${destination.map.x}%`, top: `${destination.map.y}%` }}
                aria-label={destination[language].name}
              >
                <PlaceRoundedIcon />
                <span>
                  {destination[language].name
                    .replace(' & Volcanoes', '')
                    .replace(' y volcanes', '')}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <article className="destination-featured" style={photoStyle(featured)}>
          <div className="destination-featured-content">
            <h3>{featured[language].name}</h3>
            {metadata(featured)}
            <p>{featured[language].description}</p>
            <Link to={featured.href}>
              {english ? 'View more' : 'Ver más'}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
        <div className="destinations-list">
          {others.map((destination) => (
            <article className="destination-row" key={destination.id}>
              <Link
                to={destination.href}
                className="destination-thumbnail"
                style={photoStyle(destination)}
                aria-label={destination[language].name}
              />
              <div className="destination-row-content">
                <h3>{destination[language].name}</h3>
                {metadata(destination)}
                <p>{destination[language].description}</p>
              </div>
              <Link
                to={destination.href}
                className="destination-arrow"
                aria-label={`${english ? 'View more' : 'Ver más'}: ${destination[language].name}`}
              >
                →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
