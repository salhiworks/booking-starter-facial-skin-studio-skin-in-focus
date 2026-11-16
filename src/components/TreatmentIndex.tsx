import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationSpoken, indexOrder, minutesLabel, photoKindOf, priceLabel, splitDescription, groupOf } from '../lib/services';
import type { PhotoKind } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

interface FacialsProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

const PHOTO_FIELD = {
  signature: 'index.photoSignature',
  hydration: 'index.photoHydration',
  calm: 'index.photoCalm',
  express: 'index.photoExpress',
  massage: 'index.photoMassage',
  consult: 'index.photoConsult',
} as const satisfies Record<PhotoKind, string>;

/**
 * Facials — the treatment collection. The engine's services in their order: the first two are
 * featured large (a tall photograph, what happens, who it's good for, length, price, Book); the rest
 * follow as smaller tiles; the consultation closes the section on its own sand panel for anyone not
 * sure where to start. Names, descriptions, lengths and prices always come from the engine
 * (src/lib/services.ts); each photograph comes from the owner's six "Photo — …" fields by kind.
 */
export function TreatmentIndex({ values, ownerFields, services, business, onRetry, onBook }: FacialsProps) {
  return (
    <section className="facials" id="treatments" aria-labelledby="facials-title">
      <div className="page">
        <header className="facials__head">
          <SectionLabel>Facials &amp; treatments</SectionLabel>
          <h2 id="facials-title" className="facials__title">
            <Emphasis text={values['index.title']} />
          </h2>
          {values['index.intro'] && <p className="facials__intro">{values['index.intro']}</p>}
        </header>
        <Body values={values} ownerFields={ownerFields} services={services} business={business} onRetry={onRetry} onBook={onBook} />
      </div>
    </section>
  );
}

function Body({ values, ownerFields, services, business, onRetry, onBook }: FacialsProps) {
  if (services.status === 'loading') {
    return (
      <div className="facials__quiet" aria-busy="true">
        <p className="sr-only" role="status">
          Loading treatments…
        </p>
        {[0, 1].map((i) => (
          <span className="skeleton skeleton--feature" key={i} aria-hidden="true" />
        ))}
      </div>
    );
  }
  if (services.status === 'error') {
    if (services.error.code === 'NOT_CONFIGURED') return <p className="facials__quiet quiet-state">Treatments and prices will be listed here soon.</p>;
    return (
      <div className="facials__quiet">
        <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
          <p>{services.error.code === 'NETWORK' ? "We couldn't reach the booking system to load the treatments." : "We couldn't load the treatments just now."}</p>
        </Notice>
      </div>
    );
  }
  if (services.data.length === 0) return <p className="facials__quiet quiet-state">Treatments and prices will be listed here soon.</p>;

  const locale = business?.locale ?? 'en-US';
  const ordered = indexOrder(services.data);
  const consult = ordered.find((s) => groupOf(s) === 'consult') ?? null;
  const rest = ordered.filter((s) => s !== consult);
  const featured = rest.slice(0, 2);
  const more = rest.slice(2);
  const photoOf = (s: Service) => {
    const field = PHOTO_FIELD[photoKindOf(s)];
    return { image: values[field], sample: !ownerFields.includes(field) };
  };

  return (
    <>
      {featured.length > 0 && (
        <div className={`facials__featured facials__featured--${featured.length}`}>
          {featured.map((s, i) => (
            <Feature key={s.id} service={s} n={i + 1} locale={locale} photo={photoOf(s)} onBook={onBook} />
          ))}
        </div>
      )}
      {more.length > 0 && (
        <ul className="facials__more" role="list">
          {more.map((s, i) => (
            <Tile key={s.id} service={s} n={featured.length + i + 1} locale={locale} photo={photoOf(s)} onBook={onBook} />
          ))}
        </ul>
      )}
      {consult && <Consult service={consult} values={values} locale={locale} photo={photoOf(consult)} onBook={onBook} />}
      {values['index.footnote'] && <p className="facials__footnote">{values['index.footnote']}</p>}
    </>
  );
}

interface CardProps {
  service: Service;
  n: number;
  locale: string;
  photo: { image: SiteValues['index.photoSignature']; sample: boolean };
  onBook: StartBooking;
}

/** "60 min · $145", with the length spoken in full for screen readers. */
function Meta({ s, locale }: { s: Service; locale: string }) {
  return (
    <p className="meta">
      <span aria-hidden="true">{minutesLabel(s.durationMinutes)}</span>
      <span className="sr-only">{durationSpoken(s.durationMinutes)},</span>
      <span className="meta__dot" aria-hidden="true">
        ·
      </span>
      <span className="meta__price">{priceLabel(s, locale)}</span>
    </p>
  );
}

function Feature({ service: s, n, locale, photo, onBook }: CardProps) {
  const { lead, goodFor } = splitDescription(s.description);
  return (
    <article className="feature" id={`entry-${s.id}`} aria-labelledby={`name-${s.id}`}>
      {photo.image && (
        <figure className="feature__photo" data-reveal="">
          <Photo image={photo.image} sizes="(min-width: 1024px) 44vw, 100vw" />
          {photo.sample && <figcaption className="photo-label">Sample photo</figcaption>}
        </figure>
      )}
      <div className="feature__body">
        <p className="feature__n" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </p>
        <h3 className="feature__name" id={`name-${s.id}`}>
          {s.name}
        </h3>
        {lead && <p className="feature__desc">{lead}</p>}
        {goodFor && (
          <p className="good-for">
            <span className="good-for__label">Good for</span> {goodFor}
          </p>
        )}
        <div className="feature__foot">
          <Meta s={s} locale={locale} />
          <a className="btn btn--accent" href="#book" onClick={bookLink(onBook, s.id)} aria-label={`Book ${s.name}`}>
            Book
          </a>
        </div>
      </div>
    </article>
  );
}

function Tile({ service: s, n, locale, photo, onBook }: CardProps) {
  const { lead, goodFor } = splitDescription(s.description);
  return (
    <li className="tile" id={`entry-${s.id}`}>
      {photo.image && (
        <figure className="tile__photo" data-reveal="">
          <Photo image={photo.image} sizes="(min-width: 1024px) 26vw, (min-width: 600px) 40vw, 6rem" />
          {photo.sample && (
            <figcaption className="photo-label photo-label--small">
              Sample<span className="photo-label__more"> photo</span>
            </figcaption>
          )}
        </figure>
      )}
      <div className="tile__body">
        <p className="tile__n" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </p>
        <h3 className="tile__name">{s.name}</h3>
        {lead && <p className="tile__desc">{lead}</p>}
        {goodFor && (
          <p className="good-for good-for--small">
            <span className="good-for__label">Good for</span> {goodFor}
          </p>
        )}
        <div className="tile__foot">
          <Meta s={s} locale={locale} />
          <a className="book-link" href="#book" onClick={bookLink(onBook, s.id)} aria-label={`Book ${s.name}`}>
            Book <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </li>
  );
}

function Consult({ service: s, values, locale, photo, onBook }: Omit<CardProps, 'n'> & { values: SiteValues }) {
  return (
    <aside className="consult" id={`entry-${s.id}`} aria-labelledby="consult-title">
      {photo.image && (
        <figure className="consult__photo" data-reveal="">
          <Photo image={photo.image} sizes="(min-width: 1024px) 30vw, 100vw" />
          {photo.sample && <figcaption className="photo-label">Sample photo</figcaption>}
        </figure>
      )}
      <div className="consult__body">
        <h3 className="consult__title" id="consult-title">
          {values['index.consultTitle'] || s.name}
        </h3>
        {values['index.consultText'] && <p className="consult__text">{values['index.consultText']}</p>}
        <div className="consult__foot">
          <div>
            <p className="consult__name">{s.name}</p>
            <Meta s={s} locale={locale} />
          </div>
          <a className="btn btn--ink" href="#book" onClick={bookLink(onBook, s.id)} aria-label={`Book ${s.name}`}>
            Book a consultation
          </a>
        </div>
      </div>
    </aside>
  );
}

