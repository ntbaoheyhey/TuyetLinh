"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const steps = ["/", "/gallery", "/then-now", "/boxes", "/final", "/feedback", "/outro"];

export default function PageFrame({
  children,
  nextHref,
  backHref,
}: {
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
      <header className="compact-header">
        <span className="sr-only">Progress {(index + 1)} of {steps.length}</span>
        <div className="progress-track compact" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
        </div>
      </header>

      <section className="content-panel">{children}</section>

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
