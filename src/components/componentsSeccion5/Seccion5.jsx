import { aircraft } from './aircraft';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { LanguageContext } from '../LanguageProvider';
import './seccion5.css';

export default function Seccion5() {
  const { translation } = useContext(LanguageContext);
  const english = translation.type !== 'es';
  return (
    <section className="fleet-section" aria-labelledby="fleet-title">
      <div className="fleet-backdrop" aria-hidden="true" />
      <div className="fleet-inner">
        <header className="fleet-heading">
          <div>
            <p className="fleet-eyebrow">
              {english ? 'OUR FLEET' : 'NUESTRA FLOTA'}
              <span />
            </p>
            <h2 id="fleet-title">
              {english ? (
                <>
                  Modern aircraft
                  <br />
                  for extraordinary experiences.
                </>
              ) : (
                <>
                  Aeronaves modernas
                  <br />
                  para experiencias extraordinarias.
                </>
              )}
            </h2>
          </div>
          <p className="fleet-description">{translation.seccion5.subtitulo}</p>
        </header>
        <div className="fleet-grid">
          {aircraft.map((helicopter) => {
            const specifications = translation.heliDetail[helicopter.id].dialog;
            return (
              <article className="fleet-card" key={helicopter.id}>
                <Link
                  className="fleet-photo-link"
                  to={helicopter.href}
                  aria-label={helicopter.name}
                >
                  <img
                    className="fleet-photo"
                    src={helicopter.image}
                    alt={helicopter.name}
                    style={{ objectPosition: helicopter.position }}
                    loading="lazy"
                  />
                </Link>
                <div className="fleet-card-content">
                  <h3>{helicopter.name}</h3>
                  <dl className="fleet-specifications">
                    <div className="fleet-specification">
                      <PeopleAltRoundedIcon aria-hidden="true" />
                      <div>
                        <dt>{english ? 'Capacity' : 'Capacidad'}</dt>
                        <dd>{specifications.capacity}</dd>
                      </div>
                    </div>
                    <div className="fleet-specification">
                      <SettingsOutlinedIcon aria-hidden="true" />
                      <div>
                        <dt>Motor</dt>
                        <dd>{specifications.motor}</dd>
                      </div>
                    </div>
                  </dl>
                  <Link
                    className="fleet-more"
                    to={helicopter.href}
                    aria-label={`${english ? 'See more' : 'Ver más'}: ${helicopter.name}`}
                  >
                    {english ? 'See more' : 'Ver más'}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
