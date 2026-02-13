import PageFrame from "@/components/page-frame";
import FlipCard from "@/components/flip-card";
import pairsData from "../../../data/pairs.json";
import type { ThenNowPair } from "@/lib/types";

const pairs = pairsData as ThenNowPair[];

export default function ThenNowPage() {
  return (
    <PageFrame backHref="/gallery" nextHref="/boxes">
      <h2>Then / Now</h2>
      <div className="flip-grid">
        {pairs.map((pair) => (
          <FlipCard key={pair.id} thenSrc={pair.thenSrc} nowSrc={pair.nowSrc} title={pair.title} />
        ))}
      </div>
    </PageFrame>
  );
}
