import Link from "next/link";
import PageFrame from "@/components/page-frame";

export default function OutroPage() {
  return (
    <PageFrame backHref="/feedback">
      <div className="stack">
        <h2>Thank you</h2>
        <p>Thanks for being part of this little gift experience.</p>
        <div className="row">
          <Link className="btn" href="/boxes">Back to Boxes</Link>
          <Link className="btn" href="/gallery">View Gallery</Link>
        </div>
      </div>
    </PageFrame>
  );
}
