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
    <PageFrame title="Blind Boxes Hub" backHref="/then-now" nextHref="/album">
      <div className="grid two">
        {boxes.map((box, index) => {
          const done = completedBoxes.includes(box.id);
          const prevDone = index === 0 || completedBoxes.includes(boxes[index - 1].id);
          return (
            <article key={box.id} className={`tile ${done ? "done" : ""} ${!prevDone ? "locked" : ""}`}>
              <h3>{box.icon} {box.title}</h3>
              <p>{box.game}</p>
              <p className="small">{box.unlockRule}</p>
              <div className="row">
                <Link className="btn" href={prevDone ? `/boxes/${index + 1}` : "#"}>Open</Link>
                {done && <span className="badge">✓ Completed</span>}
              </div>
              {earnedBadges.includes(box.id) && <p className="small">Sticker earned: {box.id.toUpperCase()}</p>}
            </article>
          );
        })}
      </div>
      {allCompleted && (
        <div className="row">
          <button
            className="btn"
            onClick={() => {
              resetProgress();
              router.push("/boxes");
            }}
          >
            Reset Progress
          </button>
        </div>
      )}
    </PageFrame>
  );
}
