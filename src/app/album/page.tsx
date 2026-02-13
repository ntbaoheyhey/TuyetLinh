"use client";

import PageFrame from "@/components/page-frame";
import { useAppState } from "@/components/app-provider";
import boxesData from "../../../data/boxes.json";
import type { BoxItem } from "@/lib/types";

const boxes = boxesData as BoxItem[];

export default function AlbumPage() {
  const { earnedBadges } = useAppState();
  return (
    <PageFrame title="Sticker Album" backHref="/boxes" nextHref="/final">
      <div className="grid two">
        {boxes.map((box) => (
          <div key={box.id} className="tile">
            {earnedBadges.includes(box.id) ? `🌸 ${box.title}` : "Ô sticker trống"}
          </div>
        ))}
      </div>
    </PageFrame>
  );
}
