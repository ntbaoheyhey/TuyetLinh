import PageFrame from "@/components/page-frame";
import galleryData from "../../../data/gallery.json";
import type { GalleryItem } from "@/lib/types";

const gallery = galleryData as GalleryItem[];

export default function GalleryPage() {
  return (
    <PageFrame title="Gallery" backHref="/" nextHref="/then-now">
      <div className="grid">
        {gallery.map((item) => (
          <article key={item.id} className="tile">
            <div className="thumb">{item.src}</div>
            <p>{item.caption}</p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}
