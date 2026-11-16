import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { SectionLabel } from './SectionLabel';

/** Approach — a light, typographic section: one statement, four short principles, the doctor note in small print. */
export function Approach({ values }: { values: SiteValues }) {
  const points = values['approach.points'];
  return (
    <section className="approach" id="approach" aria-labelledby="approach-title">
      <div className="page approach__grid">
        <header className="approach__head">
          <SectionLabel>Approach</SectionLabel>
          <h2 id="approach-title" className="approach__title">
            <Emphasis text={values['approach.title']} />
          </h2>
        </header>
        {points.length > 0 && (
          <ol className="principles" role="list">
            {points.map((p, i) => (
              <li key={`${i}-${p.title}`} className="principles__item">
                <span className="principles__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="principles__title">{p.title}</h3>
                {p.text && <p className="principles__text">{p.text}</p>}
              </li>
            ))}
          </ol>
        )}
        {values['approach.note'] && <p className="approach__note">{values['approach.note']}</p>}
      </div>
    </section>
  );
}
