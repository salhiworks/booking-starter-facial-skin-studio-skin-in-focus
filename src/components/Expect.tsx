import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

const PHOTOS = ['expect.photo1', 'expect.photo2', 'expect.photo3', 'expect.photo4'] as const;

/** A step's minutes as a whole number, or null when the owner left it empty or wrote words. */
function minutesOf(text: string): number | null {
  const n = Number.parseInt(text, 10);
  return Number.isFinite(n) && n > 0 && n < 600 ? n : null;
}

/**
 * Your visit — an hour in four moments, each a photograph with a number, a title and one or two
 * lines. A staggered row on desktop; on phones a row that scrolls sideways, one moment at a time.
 * Content only: it describes a typical facial and books nothing.
 */
export function Expect({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const steps = values['expect.steps'].slice(0, 4);
  return (
    <section className="moments" id="your-visit" aria-labelledby="moments-title">
      <div className="page">
        <header className="moments__head">
          <SectionLabel>Your visit</SectionLabel>
          <h2 id="moments-title" className="moments__title">
            <Emphasis text={values['expect.title']} />
          </h2>
          {values['expect.intro'] && <p className="moments__intro">{values['expect.intro']}</p>}
        </header>
      </div>
      {steps.length > 0 && (
        <ol className="moments__row" role="list" tabIndex={0} aria-label="The moments of a facial">
          {steps.map((s, i) => {
            const image = values[PHOTOS[i]];
            const min = minutesOf(s.minutes);
            return (
              <li className="moment" key={`${i}-${s.title}`}>
                {image && (
                  <figure className="moment__photo" data-reveal="">
                    <Photo image={image} sizes="(min-width: 1024px) 22vw, 76vw" />
                    {!ownerFields.includes(PHOTOS[i]) && <span className="photo-label photo-label--small">Sample photo</span>}
                  </figure>
                )}
                <p className="moment__n">
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {min && <span className="moment__min">{min} min</span>}
                </p>
                <h3 className="moment__title">{s.title}</h3>
                {s.text && <p className="moment__text">{s.text}</p>}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
