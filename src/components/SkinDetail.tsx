import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

const FRAMES = [
  { image: 'detail.photo1', caption: 'detail.caption1', sizes: '(min-width: 1024px) 46vw, 100vw' },
  { image: 'detail.photo2', caption: 'detail.caption2', sizes: '(min-width: 1024px) 44vw, 100vw' },
  { image: 'detail.photo3', caption: 'detail.caption3', sizes: '(min-width: 1024px) 22vw, 50vw' },
] as const;

/**
 * Skin in detail — the image-led moment on espresso: one large close-up of real skin, a wide frame
 * of window light, a small cleanse, and a few words. Asymmetric on purpose; every frame captioned.
 */
export function SkinDetail({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  return (
    <section className="detail" id="skin" aria-labelledby="detail-title">
      <div className="page detail__grid">
        <header className="detail__head">
          <SectionLabel tone="dark">Skin in detail</SectionLabel>
          <h2 id="detail-title" className="detail__title">
            <Emphasis text={values['detail.title']} />
          </h2>
          {values['detail.text'] && <p className="detail__text">{values['detail.text']}</p>}
        </header>
        {FRAMES.map((f, i) => {
          const image = values[f.image];
          if (!image) return null;
          return (
            <figure key={f.image} className={`detail__frame detail__frame--${i + 1}`} data-reveal="">
              <Photo image={image} sizes={f.sizes} />
              {!ownerFields.includes(f.image) && <span className="photo-label">Sample photo</span>}
              {values[f.caption] && (
                <figcaption className="detail__caption">
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span> {values[f.caption]}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
