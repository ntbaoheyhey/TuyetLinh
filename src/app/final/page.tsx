"use client";

import { useRouter } from "next/navigation";
import PageFrame from "@/components/page-frame";
import { useAppState } from "@/components/app-provider";
import messagesData from "../../../data/messages.json";
import type { MessageCard } from "@/lib/types";

const messages = messagesData as MessageCard[];

export default function FinalPage() {
  const router = useRouter();
  const { allCompleted, resetProgress } = useAppState();
  const finalCard = messages.find((m) => m.boxId === "final");

  return (
    <PageFrame title="Final Letter" backHref="/album">
      {allCompleted ? (
        <div>
          <h3>{finalCard?.title}</h3>
          {finalCard?.detail?.map((d) => <p key={d}>{d}</p>)}
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
      ) : (
        <p>Final Letter đang khóa. Hoàn thành đủ 5 boxes trước nhé.</p>
      )}
    </PageFrame>
  );
}
