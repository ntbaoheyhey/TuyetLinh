"use client";

import type { GalleryMonth } from "@/lib/types";

export default function MonthPoster({ month, delayBase = 0 }: { month: GalleryMonth; delayBase?: number }) {
  const items = month.items.slice(0, 7);

  return (
    <section className="month-section reveal" style={{ transitionDelay: `${delayBase}ms` }}>
      <h2>{month.title}</h2>
      <div className={`poster-grid layout-${month.layout}`}>
        {items.map((item, idx) => {
          const notePlacement = item.notePlacement ?? "bottom";
          return (
            <article key={`${month.month}-${idx}`} className="poster-tile reveal" style={{ transitionDelay: `${delayBase + idx * 50}ms` }}>
              <div className="photo-placeholder poster-photo">{item.src}</div>
              {item.note && <span className={`tile-note note-${notePlacement}`}>{item.note}</span>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
