"use client";

import { useState } from "react";

export default function FlipCard({
  thenSrc,
  nowSrc,
  title,
}: {
  thenSrc: string;
  nowSrc: string;
  title?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button className="flip-card" onClick={() => setFlipped((v) => !v)}>
      <div className={`flip-card-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="flip-face">
          <span className="face-tag">Then</span>
          <div className="photo-placeholder">{thenSrc}</div>
          {title && <p className="small">{title}</p>}
        </div>
        <div className="flip-face flip-back">
          <span className="face-tag">Now</span>
          <div className="photo-placeholder">{nowSrc}</div>
          {title && <p className="small">{title}</p>}
        </div>
      </div>
    </button>
  );
}
