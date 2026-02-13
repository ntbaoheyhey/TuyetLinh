"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageFrame from "@/components/page-frame";
import FlipCard from "@/components/flip-card";
import pairsData from "../../../data/pairs.json";
import type { ThenNowPair } from "@/lib/types";

const pairs = pairsData as ThenNowPair[];

export default function ThenNowPage() {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState<Record<number, boolean>>({});
  const current = pairs[index];
  const canNextPair = !!seen[index];
  const isLast = index === pairs.length - 1;

  const indicator = useMemo(() => `Pair ${index + 1} / ${pairs.length}`, [index]);

  return (
    <PageFrame backHref="/gallery">
      <h2>Then / Now</h2>
      <p className="small">Tap the card to flip. Flip once to unlock next.</p>

      <div className="pair-stage" key={current.id}>
        <FlipCard
          thenSrc={current.thenSrc}
          nowSrc={current.nowSrc}
          caption={current.title}
          resetToken={current.id}
          onFlip={(flipped) => {
            if (flipped) setSeen((prev) => ({ ...prev, [index]: true }));
          }}
        />
      </div>

      <div className="row pair-controls">
        <span className="small">{indicator}</span>
        <button className="btn icon-btn" aria-label="Previous pair" onClick={() => setIndex((v) => Math.max(0, v - 1))} disabled={index === 0}>
          ←
        </button>
        {!isLast && (
          <button className="btn icon-btn" aria-label="Next pair" onClick={() => setIndex((v) => Math.min(pairs.length - 1, v + 1))} disabled={!canNextPair}>
            →
          </button>
        )}
        {isLast && (
          <Link className={`btn btn-primary ${canNextPair ? "" : "is-disabled"}`} href={canNextPair ? "/boxes" : "#"}>
            Continue to Boxes
          </Link>
        )}
      </div>
    </PageFrame>
  );
}
