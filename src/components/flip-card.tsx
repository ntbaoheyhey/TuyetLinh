"use client";

import { useEffect, useState } from "react";

export default function FlipCard({
  thenSrc,
  nowSrc,
  caption,
  resetToken,
  onFlip,
}: {
  thenSrc: string;
  nowSrc: string;
  caption?: string;
  resetToken?: string | number;
  onFlip?: (flipped: boolean) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [resetToken]);

  function toggle() {
    const next = !flipped;
    setFlipped(next);
    onFlip?.(next);
  }

  return (
    <button className="flip-card single" onClick={toggle}>
      <div className={`flip-card-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="flip-face">
          <span className="face-tag">Then</span>
          <div className="photo-placeholder">{thenSrc}</div>
          {caption && <p className="small">{caption}</p>}
        </div>
        <div className="flip-face flip-back">
          <span className="face-tag">Now</span>
          <div className="photo-placeholder">{nowSrc}</div>
          {caption && <p className="small">{caption}</p>}
        </div>
      </div>
    </button>
  );
}
