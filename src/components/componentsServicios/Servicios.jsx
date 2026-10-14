import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageProvider';
import { services } from './services';
import './servicios.css';

const iconPaths = {
  helicopter: (
    <>
      <path d="M3 7h25M16 4v7M5 20H2v-6M2 17h10M12 13h9a6 6 0 0 1 6 6v3H12a4 4 0 0 1-4-4v-1M19 13v9M19 17h7M10 26h18M13 22v4M24 22v4" />
      <path d="M13 13v-2h6v2" />
    </>
  ),
  flight: (
    <path d="m3 15 10 3 4 10 3-1-1-10 9-9c3-4-1-7-4-4l-9 9-10-1-2 3Z M8 20l-4 4 4-1 1 4 4-4" />
  ),
  binoculars: (
    <>
      <circle cx="9" cy="22" r="7" />
      <circle cx="25" cy="22" r="7" />
      <path d="M4 17 8 7h5l3 11M30 17 26 7h-5l-3 11M13 10h8M16 4v6M12 4h8" />
    </>
  ),
  camera: (
    <>
      <path d="M4 10h6l2-4h9l2 4h6v17H4Z" />
      <circle cx="16.5" cy="18" r="6" />
      <path d="M25 13h1" />
    </>
  ),
  flag: (
    <>
      <path d="M7 30V5M7 7c9-7 12 7 23 0l-3 7 3 4c-11 7-15-6-23 0M3 30h8" />
    </>
  ),
};

export default function Servicios() {
  const { translation } = useContext(LanguageContext);
  const language = translation.seccion1.from === 'From' ? 'en' : 'es';
  const english = language === 'en';
  return (
    <section className="services-section" aria-labelledby="services-title">
      <div className="services-backdrop" aria-hidden="true" />
      <div className="services-inner">
        <header className="services-heading">
          <p className="services-eyebrow">
            {english ? 'OUR SERVICES' : 'NUESTROS SERVICIOS'}
            <span />
          </p>
          <h2 id="services-title">
            {english ? (
              <>
                Explore Costa Rica
                <br />
                from above
              </>
            ) : (
              <>
                Explora Costa Rica
                <br />
                desde el cielo
              </>
            )}
          </h2>
          <p className="services-intro">
            {english
              ? 'We offer private helicopter flights designed around your time, interests and the unique beauty of Costa Rica. Whether it’s a quick transfer or a custom experience, we take care of every detail so you can simply enjoy the view.'
              : 'Ofrecemos vuelos privados en helicóptero diseñados alrededor de tu tiempo, tus intereses y la belleza única de Costa Rica. Ya sea un traslado rápido o una experiencia a medida, cuidamos cada detalle para que solo disfrutes la vista.'}
          </p>
        </header>
        <div className="services-grid">
          {services.map((service, index) => {
            const content = service[language];
            const title = content.title.replaceAll('|', ' ');
            const label = (
              <>
                {english ? 'View more' : 'Ver más'}
                <span aria-hidden="true">→</span>
              </>
            );
            return (
              <article className="service-card" key={service.id}>
                <div className="service-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 34 34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {iconPaths[service.icon]}
                  </svg>
                </div>
                <h3>
                  {content.title.split('|').map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h3>
                <p>{content.description}</p>
                <div
                  className="service-photo service-photo-reference"
                  role="img"
                  aria-label={title}
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundPosition: `${index * 25}% center`,
                  }}
                />
                {service.href.startsWith('/') ? (
                  <Link
                    className="service-link"
                    to={service.href}
                    aria-label={`${english ? 'View more' : 'Ver más'}: ${title}`}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    className="service-link"
                    href={service.href}
                    aria-label={`${english ? 'View more' : 'Ver más'}: ${title}`}
                  >
                    {label}
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
