import PageFrame from "@/components/page-frame";

export default function ThenNowPage() {
  return (
    <PageFrame title="Xưa / Nay" backHref="/gallery" nextHref="/boxes">
      <div className="grid two">
        <div className="tile"><p>Then</p><div className="thumb">/photos/pairs/001_then.jpg</div></div>
        <div className="tile"><p>Now</p><div className="thumb">/photos/pairs/001_now.jpg</div></div>
      </div>
    </PageFrame>
  );
}
