import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { kinds, priceLabel } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** imagesizes must match the preloads in index.html. */
const HERO_SIZES = '(min-width: 1024px) min(56vw, 50rem), 100vw';
/** Phones get the upright crop of the same moment — the site's own default only. */
const SMALL = { key: '/photos/hero-campaign-phone-800.webp', media: '(max-width: 599px)', sizes: '100vw' };

interface HeroProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * The first screen — a campaign spread inside the page's own centred shell (the same max width and
 * gutters as every section), so on wide monitors words and photograph stay one composition instead of
 * drifting to opposite edges. Desktop: ~44 / 56 columns with a fluid gap; the photograph a near-square
 * crop (head to jar), never taller than the screen allows; the text group centred against it. Phones: an upright crop first, then
 * the headline on a bone panel that overlaps its lower edge.
 */
export function Hero({ values, ownerFields, services, business, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const own = ownerFields.includes('hero.photo');
  const kicker = values['hero.kicker'].trim();
  const place = values['hero.place'].trim();
  return (
    <section className={`hero${photo ? '' : ' hero--no-photo'}`} id="top" aria-labelledby="hero-title">
      <div className="hero__shell">
        <div className="hero__copy">
          <div className="hero__group">
            {(kicker || place) && (
              <p className="hero__kicker">
                {kicker && <span>{kicker}</span>}
                {place && <span className="hero__place">{place}</span>}
              </p>
            )}
            <h1 id="hero-title" className="hero__title">
              <Emphasis text={values['hero.title']} />
            </h1>
            <div className="hero__aside">
              {values['hero.lede'] && <p className="hero__lede">{values['hero.lede']}</p>}
              <div className="hero__actions">
                <a className="btn btn--accent btn--large" href="#book" onClick={bookLink(onBook)}>
                  {values['hero.cta']}
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <FromPrice services={services} business={business} />
              </div>
            </div>
          </div>
        </div>
        {photo && (
          <figure className="hero__photo">
            <Photo image={photo} sizes={HERO_SIZES} priority small={own ? undefined : SMALL} className="frame--hero" />
            {!own && <figcaption className="photo-label">Sample photo</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}

/** "Facials from $85 · paid at the studio" — the lowest facial price, live from the engine. */
function FromPrice({ services, business }: { services: Resource<Service[]>; business: Business | null }) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const facials = kinds(services.data).find((k) => k.id === 'facials')?.services ?? services.data;
  const priced = facials.filter((s) => s.priceCents !== null && s.priceCents > 0).sort((a, b) => (a.priceCents ?? 0) - (b.priceCents ?? 0));
  if (priced.length === 0) return null;
  return (
    <a className="hero__from" href="#treatments">
      <span>{facials === services.data ? 'Treatments' : 'Facials'} from</span> <strong>{priceLabel(priced[0], business?.locale ?? 'en-US')}</strong>
      <span className="hero__from-note"> · paid at the studio</span>
    </a>
  );
}
