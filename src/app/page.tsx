"use client";

import { useRouter } from "next/navigation";
import PageFrame from "@/components/page-frame";
import { useAppState } from "@/components/app-provider";

export default function OpeningPage() {
  const router = useRouter();
  const { openGift, started } = useAppState();

  return (
    <PageFrame nextHref={started ? "/gallery" : undefined} backHref="/">
      <div className="opening">
        <p className="sparkle">✧</p>
        <h1>Economics Blind Box Gift</h1>
        <p>A warm and playful journey in one balanced flow.</p>
        <button
          className="btn btn-primary glow"
          onClick={() => {
            openGift();
            router.push("/gallery");
          }}
        >
          Open Gift
        </button>
      </div>
    </PageFrame>
  );
}
