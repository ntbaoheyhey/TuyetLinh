"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const steps = ["/", "/gallery", "/then-now", "/boxes", "/album", "/final"];

export default function PageFrame({
  title,
  children,
  nextHref,
  backHref,
}: {
  title: string;
  children: React.ReactNode;
  nextHref?: string;
  backHref?: string;
}) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const stepPath = pathname.startsWith("/boxes/") ? "/boxes" : pathname;
  const index = Math.max(steps.indexOf(stepPath), 0);

  return (
    <main className="shell">
      <header className="card">
        <h1>{title}</h1>
        <div className="progress-row">
          <span>Step {index + 1}/{steps.length}</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </header>
      <section className="card">{children}</section>
      <footer className="nav-row">
        {backHref ? (
          <Link className="btn" href={backHref}>
            Back
          </Link>
        ) : (
          <button className="btn" onClick={() => router.back()}>
            Back
          </button>
        )}
        {nextHref && (
          <Link className="btn btn-primary" href={nextHref}>
            Next
          </Link>
        )}
      </footer>
    </main>
  );
}
