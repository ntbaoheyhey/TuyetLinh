"use client";

import { useMemo, useState } from "react";
import playlist from "../../data/playlist.json";
import gallery from "../../data/gallery.json";
import boxes from "../../data/boxes.json";
import mbtiData from "../../data/mbti.json";
import type { BoxItem, GalleryItem, MbtiPreset, Track } from "@/lib/types";

const presets = ["INTJ", "INTP", "INFJ", "INFP"] as const;

export default function DemoShell() {
  const [selectedPreset, setSelectedPreset] = useState<MbtiPreset>("INFJ");
  const [openedBoxes, setOpenedBoxes] = useState<string[]>([]);
  const [stickers, setStickers] = useState(0);

  const profile = useMemo(() => mbtiData[selectedPreset], [selectedPreset]);

  const onOpenBox = (boxId: string) => {
    if (openedBoxes.includes(boxId)) return;
    setOpenedBoxes((prev) => [...prev, boxId]);
    setStickers((prev) => prev + 1);
  };

  const canOpenFinal = stickers >= boxes.length;

  return (
    <main className="page">
      <header className="hero card">
        <p className="label">Economics Blind Box Gift — Demo Skeleton</p>
        <h1>Economics Blind Box Gift Website</h1>
        <p>
          Khung sườn theo spec: Intro → Gallery → Xưa/Nay → Blind Box → Sticker Album → Final Letter.
          Dữ liệu hiện là mock để bạn thay sau.
        </p>
        <div className="preset-row">
          {presets.map((preset) => (
            <button
              key={preset}
              className={preset === selectedPreset ? "chip active" : "chip"}
              onClick={() => setSelectedPreset(preset)}
            >
              {preset}
            </button>
          ))}
        </div>
        <small>
          Tone preset: {profile.tone} {profile.emoji} · Difficulty: {profile.difficulty}
        </small>
      </header>

      <section className="card">
        <h2>Music Player (placeholder)</h2>
        <ul>
          {(playlist as Track[]).map((track, index) => (
            <li key={track.id}>
              #{index + 1} — {track.title} ({track.artist})
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Gallery / Polaroid</h2>
        <div className="grid">
          {(gallery as GalleryItem[]).map((item) => (
            <article key={item.id} className="tile">
              <div className="thumb">{item.src}</div>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Xưa vs Nay (placeholder)</h2>
        <p>Bạn có thể thay section này bằng before/after slider hoặc flip-card theo ảnh thật.</p>
      </section>

      <section className="card">
        <h2>Blind Box Shelf (4-5 box mini-games)</h2>
        <div className="grid">
          {(boxes as BoxItem[]).map((box) => {
            const opened = openedBoxes.includes(box.id);
            return (
              <article key={box.id} className={opened ? "tile done" : "tile"}>
                <h3>
                  {box.icon} {box.title}
                </h3>
                <p>{box.game}</p>
                <small>Điều kiện: {box.unlockRule}</small>
                <button onClick={() => onOpenBox(box.id)} disabled={opened}>
                  {opened ? "Đã mở" : "Mở box demo"}
                </button>
              </article>
            );
          })}
        </div>
        <p className="progress">Tiến độ: {openedBoxes.length}/{boxes.length} box · Stickers: {stickers}</p>
      </section>

      <section className="card">
        <h2>Sticker Album</h2>
        <p>Hiện có {stickers} sticker. Khi đủ sticker sẽ mở Final Letter.</p>
      </section>

      <section className={canOpenFinal ? "card final unlock" : "card final"}>
        <h2>Final Letter</h2>
        {canOpenFinal ? (
          <p>🎉 Bạn đã mở full demo. Phần này để thay message thật + ảnh highlight.</p>
        ) : (
          <p>Chưa mở. Cần đủ sticker để unlock.</p>
        )}
      </section>
    </main>
  );
}
