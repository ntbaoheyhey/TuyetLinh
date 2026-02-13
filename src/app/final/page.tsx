"use client";

import Link from "next/link";
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
    <PageFrame backHref="/boxes">
      <h2>Final Letter</h2>
      {allCompleted ? (
        <div className="stack">
          <h3>{finalCard?.title}</h3>
          {finalCard?.detail?.map((d) => <p key={d}>{d}</p>)}
          <div className="row">
            <Link className="btn btn-primary" href="/feedback">Send feedback</Link>
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
        </div>
      ) : (
        <p>Final Letter is locked. Please complete all 5 boxes first.</p>
      )}
    </PageFrame>
  );
}
