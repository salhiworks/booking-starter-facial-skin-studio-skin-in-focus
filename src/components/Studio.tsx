import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * The studio — an editorial spread: the room, wide, and a moment of a facial in it, upright and set lower,
 * a short confident paragraph and three facts set as statements across the page.
 */
export function Studio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const room = values['studio.photo'];
  const detail = values['studio.detail'];
  const facts = values['studio.facts'];
  return (
    <section className="studio" id="studio" aria-labelledby="studio-title">
      <div className="page studio__grid">
        <header className="studio__head">
          <SectionLabel>The studio</SectionLabel>
          <h2 id="studio-title" className="studio__title">
            <Emphasis text={values['studio.title']} />
          </h2>
        </header>
        {values['studio.text'] && <p className="studio__text">{values['studio.text']}</p>}
        {room && (
          <figure className="studio__room" data-reveal="">
            <Photo image={room} sizes="(min-width: 1024px) 62vw, 100vw" />
            {!ownerFields.includes('studio.photo') && <span className="photo-label">Sample photo</span>}
            {values['studio.caption'] && <figcaption className="caption">{values['studio.caption']}</figcaption>}
          </figure>
        )}
        {detail && (
          <figure className="studio__detail" data-reveal="">
            <Photo image={detail} sizes="(min-width: 1024px) 24vw, 60vw" />
            {!ownerFields.includes('studio.detail') && <span className="photo-label">Sample photo</span>}
          </figure>
        )}
        {facts.length > 0 && (
          <dl className="facts">
            {facts.map((f, i) => (
              <div className="facts__item" key={`${i}-${f.label}`}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
