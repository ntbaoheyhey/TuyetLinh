"use client";

import { useEffect } from "react";
import PageFrame from "@/components/page-frame";
import MonthPoster from "@/components/month-poster";
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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageFrame backHref="/" nextHref="/then-now">
      <div className="month-list">
        {gallery.map((month, idx) => (
          <MonthPoster key={month.month} month={month} delayBase={idx * 30} />
        ))}
      </div>
    </PageFrame>
  );
}
