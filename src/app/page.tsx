"use client";

import { useRouter } from "next/navigation";
import PageFrame from "@/components/page-frame";
import { useAppState } from "@/components/app-provider";

export default function OpeningPage() {
  const router = useRouter();
  const { openGift, started } = useAppState();

  return (
    <PageFrame title="Economics Blind Box Gift" nextHref={started ? "/gallery" : undefined} backHref="/">
      <div className="opening">
        <p className="sparkle">✧</p>
        <p>Một hành trình nhỏ: rõ ràng, ấm áp, vui vừa đủ.</p>
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
