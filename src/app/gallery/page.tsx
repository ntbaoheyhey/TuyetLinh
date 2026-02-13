"use client";

import { useEffect } from "react";
import PageFrame from "@/components/page-frame";
import galleryData from "../../../data/gallery.json";
import type { GalleryMonth } from "@/lib/types";

const gallery = galleryData as GalleryMonth[];

export default function GalleryPage() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -5% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageFrame backHref="/" nextHref="/then-now">
      <div className="month-list">
        {gallery.map((month) => (
          <section key={month.month} className="month-section reveal">
            <h2>{month.title}</h2>
            <div className="portfolio-grid">
              {month.items.map((item, idx) => (
                <article key={`${month.month}-${idx}`} className="portfolio-item reveal" style={{ transitionDelay: `${idx * 45}ms` }}>
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
