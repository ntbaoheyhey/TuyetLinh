import PageFrame from "@/components/page-frame";
import galleryData from "../../../data/gallery.json";
import type { GalleryMonth } from "@/lib/types";

const gallery = galleryData as GalleryMonth[];

export default function GalleryPage() {
  return (
    <PageFrame backHref="/" nextHref="/then-now">
      <div className="month-list">
        {gallery.map((month) => (
          <section key={month.month} className="month-section">
            <h2>{month.title}</h2>
            <div className="portfolio-grid">
              {month.items.map((item, idx) => (
                <article key={`${month.month}-${idx}`} className="portfolio-item">
                  <div className="photo-placeholder large">{item.src}</div>
                  {item.caption && <p className="small">{item.caption}</p>}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageFrame>
  );
}
