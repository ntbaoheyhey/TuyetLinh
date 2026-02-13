"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PageFrame from "@/components/page-frame";
import { useAppState } from "@/components/app-provider";
import boxesData from "../../../data/boxes.json";
import type { BoxItem } from "@/lib/types";

const boxes = boxesData as BoxItem[];

export default function BoxesHubPage() {
  const router = useRouter();
  const { completedBoxes, earnedBadges, allCompleted, resetProgress } = useAppState();

  return (
    <PageFrame backHref="/then-now" nextHref="/final">
      <h2>Blind Box Hub</h2>
      <div className="grid two">
        {boxes.map((box, index) => {
          const done = completedBoxes.includes(box.id);
          const unlocked = index === 0 || completedBoxes.includes(boxes[index - 1].id);
          return (
            <article key={box.id} className={`tile ${done ? "done" : ""} ${!unlocked ? "locked" : ""}`}>
              <h3>{box.icon} {box.title}</h3>
              <p>{box.game}</p>
              <p className="small">{box.unlockRule}</p>
              <div className="row">
                <Link className="btn" href={unlocked ? `/boxes/${index + 1}` : "#"}>Open</Link>
                {done && <span className="badge">✓ Completed</span>}
              </div>
            </article>
          );
        })}
      </div>

      <div className="sticker-panel">
        <h3>Sticker Panel</h3>
        <div className="sticker-grid">
          {boxes.map((box) => (
            <div key={box.id} className="sticker-slot">
              {earnedBadges.includes(box.id) ? `🌸 ${box.title}` : "Empty sticker slot"}
            </div>
          ))}
        </div>
      </div>

      {allCompleted && (
        <button
          className="btn"
          onClick={() => {
            resetProgress();
            router.push("/boxes");
          }}
        >
          Reset Progress
        </button>
      )}
    </PageFrame>
  );
}
