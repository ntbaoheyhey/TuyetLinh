"use client";

import { useRouter } from "next/navigation";
import PageFrame from "@/components/page-frame";
import { useAppState } from "@/components/app-provider";
import { Box1Game, Box4Game, StubGame } from "@/components/games";

export default function BoxGamePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { markCompleted } = useAppState();
  const id = Number(params.id);
  const boxId = `box${id}`;

  function done() {
    markCompleted(boxId);
    router.push("/boxes");
  }

  return (
    <PageFrame backHref="/boxes" nextHref="/boxes">
      <h2>Box {id}</h2>
      {id === 1 && <Box1Game onDone={done} />}
      {id === 4 && <Box4Game onDone={done} />}
      {id !== 1 && id !== 4 && <StubGame title={`Box ${id}`} onDone={done} />}
    </PageFrame>
  );
}
