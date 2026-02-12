"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import boxesData from "../../data/boxes.json";
import galleryData from "../../data/gallery.json";
import messagesData from "../../data/messages.json";
import playlistData from "../../data/playlist.json";
import type { BoxItem, GalleryItem, MessageCard, Track } from "@/lib/types";

type Trend = "up" | "down";
interface ChartRound {
  id: number;
  points: number[];
  answer: Trend;
}

interface InflationQuestion {
  id: string;
  basketThen: number;
  basketNow: number;
  options: string[];
  answer: string;
}

const chartRounds: ChartRound[] = [
  { id: 1, points: [40, 43, 45, 44, 47, 49, 52, 55], answer: "up" },
  { id: 2, points: [62, 60, 58, 57, 56, 54, 52, 50], answer: "down" },
  { id: 3, points: [45, 44, 46, 47, 48, 50, 51, 53], answer: "up" },
  { id: 4, points: [70, 69, 68, 66, 65, 64, 63, 61], answer: "down" },
];

const inflationQuestions: InflationQuestion[] = [
  { id: "q1", basketThen: 100, basketNow: 108, options: ["6%", "8%", "10%"], answer: "8%" },
  { id: "q2", basketThen: 120, basketNow: 132, options: ["10%", "12%", "15%"], answer: "10%" },
  { id: "q3", basketThen: 80, basketNow: 88, options: ["8%", "10%", "12%"], answer: "10%" },
];

const boxes = boxesData as BoxItem[];
const gallery = galleryData as GalleryItem[];
const playlist = playlistData as Track[];
const messages = messagesData as MessageCard[];

const sectionAnim = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.35 },
};

function getMessage(boxId: string) {
  return messages.find((item) => item.boxId === boxId);
}

function calcPath(points: number[], width: number, height: number) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = width / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - ((p - min) / (max - min || 1)) * (height - 12) - 6;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function DemoShell() {
  const [started, setStarted] = useState(false);
  const [openedBoxes, setOpenedBoxes] = useState<string[]>([]);
  const [stickers, setStickers] = useState(0);
  const [musicIndex, setMusicIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [activeBox, setActiveBox] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const rawOpened = localStorage.getItem("openedBoxes");
    const rawStickers = localStorage.getItem("stickers");
    const rawMusic = localStorage.getItem("musicIndex");
    const rawSoundOn = localStorage.getItem("soundOn");

    if (rawOpened) setOpenedBoxes(JSON.parse(rawOpened));
    if (rawStickers) setStickers(Number(rawStickers));
    if (rawMusic) setMusicIndex(Number(rawMusic));
    if (rawSoundOn) setSoundOn(rawSoundOn === "true");

    localStorage.removeItem("mbtiPreset");
  }, []);

  useEffect(() => {
    localStorage.setItem("openedBoxes", JSON.stringify(openedBoxes));
  }, [openedBoxes]);

  useEffect(() => {
    localStorage.setItem("stickers", String(stickers));
  }, [stickers]);

  useEffect(() => {
    localStorage.setItem("musicIndex", String(musicIndex));
  }, [musicIndex]);

  useEffect(() => {
    localStorage.setItem("soundOn", String(soundOn));
    if (!audioRef.current) return;
    audioRef.current.volume = soundOn ? 0.55 : 0;
  }, [soundOn]);

  const totalBoxes = boxes.length;
  const canOpenFinal = stickers >= totalBoxes;

  function completeBox(boxId: string) {
    if (openedBoxes.includes(boxId)) return;
    setOpenedBoxes((prev) => [...prev, boxId]);
    setStickers((prev) => prev + 1);
    setExpandedCard(boxId);
  }

  function openGift() {
    setStarted(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => null);
    }, 0);
  }

  function nextTrack() {
    const next = (musicIndex + 1) % playlist.length;
    setMusicIndex(next);
    if (started) {
      setTimeout(() => audioRef.current?.play().catch(() => null), 30);
    }
  }

  return (
    <main className="min-h-screen bg-rose-50/70 pb-20 text-rose-900">
      <audio ref={audioRef} src={playlist[musicIndex]?.file} loop />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
        <motion.section {...sectionAnim} className="rounded-3xl border border-rose-200 bg-white/80 p-7 shadow-sm">
          <p className="text-sm font-semibold tracking-wide text-rose-500">Economics Blind Box Gift • Balanced Mode</p>
          <h1 className="mt-2 text-3xl font-bold text-rose-700">Một website quà tặng nhỏ, rõ ràng và ấm áp</h1>
          <p className="mt-3 max-w-2xl text-rose-800">
            Flow: Start → Gallery → Xưa/Nay → Blind Boxes → Sticker Album → Final Letter.
            Chỉ có một trải nghiệm unified, không chọn MBTI.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={openGift}
              className="rounded-full bg-rose-600 px-5 py-2.5 font-semibold text-white transition hover:bg-rose-700"
            >
              Open Gift
            </button>
            <span className="text-sm text-rose-600">Nhạc bắt đầu sau khi bạn bấm nút này.</span>
          </div>
        </motion.section>

        {started && (
          <>
            <motion.section {...sectionAnim} className="rounded-3xl border border-rose-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-rose-700">Music Player</h2>
                  <p className="text-sm text-rose-600">
                    {playlist[musicIndex]?.title} • {playlist[musicIndex]?.artist}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => (audioRef.current?.paused ? audioRef.current?.play() : audioRef.current?.pause())} className="rounded-full border border-rose-300 px-4 py-2 text-sm">
                    Play / Pause
                  </button>
                  <button onClick={nextTrack} className="rounded-full border border-rose-300 px-4 py-2 text-sm">
                    Next
                  </button>
                  <button onClick={() => setSoundOn((prev) => !prev)} className="rounded-full border border-rose-300 px-4 py-2 text-sm">
                    {soundOn ? "Sound On" : "Muted"}
                  </button>
                </div>
              </div>
            </motion.section>

            <motion.section {...sectionAnim} className="rounded-3xl border border-rose-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-rose-700">Gallery</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {gallery.map((item) => (
                  <motion.article whileHover={{ y: -4, rotate: -1 }} key={item.id} className="rounded-2xl border border-rose-200 bg-rose-50 p-3">
                    <div className="mb-3 flex h-36 items-center justify-center rounded-xl border border-dashed border-rose-300 bg-white text-xs text-rose-500">
                      {item.src}
                    </div>
                    <p className="text-sm">{item.caption}</p>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.section {...sectionAnim} className="rounded-3xl border border-rose-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-rose-700">Xưa / Nay</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-xs uppercase text-rose-500">Then</p>
                  <div className="mt-2 flex h-32 items-center justify-center rounded-lg border border-dashed border-rose-300 bg-white text-xs text-rose-500">
                    /photos/pairs/001_then.jpg
                  </div>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-xs uppercase text-rose-500">Now</p>
                  <div className="mt-2 flex h-32 items-center justify-center rounded-lg border border-dashed border-rose-300 bg-white text-xs text-rose-500">
                    /photos/pairs/001_now.jpg
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section {...sectionAnim} className="rounded-3xl border border-rose-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-rose-700">Blind Boxes</h2>
                <p className="text-sm text-rose-600">Progress: {openedBoxes.length}/{totalBoxes} • Stickers: {stickers}</p>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {boxes.map((box, index) => {
                  const completed = openedBoxes.includes(box.id);
                  const available = index === 0 || openedBoxes.includes(boxes[index - 1].id);
                  return (
                    <article key={box.id} className={`rounded-2xl border p-4 ${completed ? "border-emerald-300 bg-emerald-50" : available ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-slate-100 text-slate-500"}`}>
                      <h3 className="font-semibold">{box.icon} {box.title}</h3>
                      <p className="mt-1 text-sm">{box.game}</p>
                      <p className="text-xs">{box.unlockRule}</p>
                      <div className="mt-3 flex gap-2">
                        <button
                          disabled={!available}
                          onClick={() => setActiveBox(box.id)}
                          className="rounded-full border border-rose-300 px-4 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {completed ? "Xem lại" : "Mở box"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </motion.section>

            <AnimatePresence>
              {activeBox === "box1" && (
                <Box1Game onClose={() => setActiveBox(null)} onComplete={() => completeBox("box1")} completed={openedBoxes.includes("box1")} />
              )}
              {activeBox === "box2" && (
                <StubBox boxId="box2" title="Supply-Demand Snap" onClose={() => setActiveBox(null)} onComplete={() => completeBox("box2")} completed={openedBoxes.includes("box2")} />
              )}
              {activeBox === "box3" && (
                <StubBox boxId="box3" title="Budget Challenge" onClose={() => setActiveBox(null)} onComplete={() => completeBox("box3")} completed={openedBoxes.includes("box3")} />
              )}
              {activeBox === "box4" && (
                <Box4Game onClose={() => setActiveBox(null)} onComplete={() => completeBox("box4")} completed={openedBoxes.includes("box4")} />
              )}
              {activeBox === "box5" && (
                <StubBox boxId="box5" title="Auction & Strategy (Optional)" onClose={() => setActiveBox(null)} onComplete={() => completeBox("box5")} completed={openedBoxes.includes("box5")} />
              )}
            </AnimatePresence>

            <motion.section {...sectionAnim} className="rounded-3xl border border-rose-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-rose-700">Sticker Album</h2>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {boxes.map((box) => {
                  const done = openedBoxes.includes(box.id);
                  return (
                    <div key={box.id} className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-rose-300 bg-rose-50 text-center text-sm">
                      {done ? `🌸 ${box.title}` : "Ô sticker trống"}
                    </div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section {...sectionAnim} className="rounded-3xl border border-rose-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-rose-700">Message Cards</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {openedBoxes.map((boxId) => {
                  const card = getMessage(boxId);
                  if (!card) return null;
                  const expanded = expandedCard === boxId;
                  return (
                    <article key={boxId} className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                      <h3 className="font-semibold">{card.title}</h3>
                      <button className="mt-2 text-sm text-rose-700 underline" onClick={() => setExpandedCard(expanded ? null : boxId)}>
                        {expanded ? "Thu gọn" : "Mở chi tiết"}
                      </button>
                      {expanded && (
                        <div className="mt-2 space-y-1 text-sm text-rose-800">
                          {card.detail?.map((line) => <p key={line}>{line}</p>)}
                          {card.funFact && <p className="text-xs text-rose-600">Fun fact: {card.funFact}</p>}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </motion.section>

            <motion.section {...sectionAnim} className={`rounded-3xl border p-6 ${canOpenFinal ? "border-rose-400 bg-rose-100" : "border-rose-200 bg-white"}`}>
              <h2 className="text-xl font-semibold text-rose-700">Final Letter</h2>
              {canOpenFinal ? (
                <div className="mt-3 space-y-2 text-rose-900">
                  <p>{getMessage("final")?.title}</p>
                  {getMessage("final")?.detail?.map((line) => <p key={line}>{line}</p>)}
                </div>
              ) : (
                <p className="mt-2 text-sm text-rose-700">Mở đủ sticker để mở thư cuối nhé.</p>
              )}
            </motion.section>
          </>
        )}
      </div>
    </main>
  );
}

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-4"
    >
      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-2xl rounded-3xl border border-rose-200 bg-white p-6 shadow-xl">
        {children}
      </motion.div>
    </motion.div>
  );
}

function Box1Game({ onClose, onComplete, completed }: { onClose: () => void; onComplete: () => void; completed: boolean }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState<Trend | null>(null);
  const [tries, setTries] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [hintMode, setHintMode] = useState<"logic" | "gentle">("logic");

  const round = chartRounds[roundIndex];
  const path = useMemo(() => calcPath(round.points, 320, 160), [round.points]);

  function choose(value: Trend) {
    if (answered) return;
    setAnswered(value);
    if (value === round.answer) setCorrect((prev) => prev + 1);
  }

  function next() {
    if (roundIndex < chartRounds.length - 1) {
      setRoundIndex((prev) => prev + 1);
      setAnswered(null);
      return;
    }

    const score = answered === round.answer ? correct + 1 : correct;
    if (score >= 3 && !completed) onComplete();
    if (score < 3 && tries < 1) {
      setTries((prev) => prev + 1);
      setRoundIndex(0);
      setCorrect(0);
      setAnswered(null);
      return;
    }
    onClose();
  }

  return (
    <Modal>
      <h3 className="text-xl font-semibold text-rose-700">Box 1 • Bull or Bear?</h3>
      <p className="mt-1 text-sm text-rose-600">Đoán xu hướng tăng hay giảm. Mục tiêu đúng 3/4. Có 1 lần retry nhẹ.</p>
      <p className="mt-2 text-sm">Round {roundIndex + 1}/4 • Đúng: {correct}</p>
      <svg viewBox="0 0 320 160" className="mt-3 w-full rounded-xl border border-rose-200 bg-rose-50 p-2">
        <motion.path d={path} fill="none" stroke="#e11d48" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
      </svg>
      <div className="mt-4 flex gap-2">
        <button onClick={() => choose("up")} className="rounded-full border border-rose-300 px-4 py-2">Up</button>
        <button onClick={() => choose("down")} className="rounded-full border border-rose-300 px-4 py-2">Down</button>
        <button
          onClick={() => setUsedHint(true)}
          disabled={usedHint}
          className="rounded-full border border-rose-300 px-4 py-2 disabled:opacity-50"
        >
          Hint
        </button>
      </div>
      {usedHint && (
        <div className="mt-2 rounded-xl bg-rose-50 p-3 text-sm">
          <div className="mb-2 flex gap-2">
            <button onClick={() => setHintMode("logic")} className="rounded-full border border-rose-300 px-3 py-1 text-xs">Logic hint</button>
            <button onClick={() => setHintMode("gentle")} className="rounded-full border border-rose-300 px-3 py-1 text-xs">Gentle hint</button>
          </div>
          {hintMode === "logic" ? "Nhìn 2 điểm cuối: nếu đỉnh cuối thấp dần thì ưu tiên Down." : "Bạn đang làm tốt rồi, cứ nhìn xu hướng tổng thể thay vì một điểm lẻ."}
        </div>
      )}
      {answered && (
        <p className="mt-3 text-sm">
          {answered === round.answer ? "Chuẩn rồi." : `Chưa đúng, đáp án là ${round.answer.toUpperCase()}.`}
        </p>
      )}
      <div className="mt-4 flex gap-2">
        <button onClick={next} disabled={!answered} className="rounded-full bg-rose-600 px-4 py-2 text-white disabled:opacity-50">Tiếp tục</button>
        <button onClick={onClose} className="rounded-full border border-rose-300 px-4 py-2">Đóng</button>
      </div>
    </Modal>
  );
}

function Box4Game({ onClose, onComplete, completed }: { onClose: () => void; onComplete: () => void; completed: boolean }) {
  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [tries, setTries] = useState(0);
  const [feedback, setFeedback] = useState("");

  const q = inflationQuestions[index % inflationQuestions.length];

  function choose(option: string) {
    if (option === q.answer) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setFeedback("Đúng rồi, giữ nhịp này nhé.");
      if (nextStreak >= 2) {
        if (!completed) onComplete();
        setFeedback("Bạn đã đạt 2 câu đúng liên tiếp. Box hoàn thành.");
        return;
      }
      setIndex((prev) => prev + 1);
      return;
    }

    setFeedback("Sai nhẹ một chút, thử lại nhé.");
    setStreak(0);
    if (tries < 1) {
      setTries((prev) => prev + 1);
      setIndex((prev) => prev + 1);
    } else {
      setFeedback("Đã dùng hết retry của box này. Bạn có thể đóng và mở lại để chơi tiếp.");
    }
  }

  return (
    <Modal>
      <h3 className="text-xl font-semibold text-rose-700">Box 4 • Inflation Basket</h3>
      <p className="mt-1 text-sm text-rose-600">Mục tiêu: đúng 2 câu liên tiếp. Có retry nhẹ.</p>
      <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm">Giỏ hàng từ {q.basketThen} lên {q.basketNow}. Tỷ lệ lạm phát gần đúng là?</p>
        <div className="mt-3 flex gap-2">
          {q.options.map((option) => (
            <button key={option} onClick={() => choose(option)} className="rounded-full border border-rose-300 px-4 py-1.5 text-sm">
              {option}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm">Streak: {streak}/2 • Retry used: {tries}/2</p>
      {feedback && <p className="mt-2 text-sm text-rose-700">{feedback}</p>}
      <div className="mt-4">
        <button onClick={onClose} className="rounded-full border border-rose-300 px-4 py-2">Đóng</button>
      </div>
    </Modal>
  );
}

function StubBox({ boxId, title, onClose, onComplete, completed }: { boxId: string; title: string; onClose: () => void; onComplete: () => void; completed: boolean }) {
  const msg = getMessage(boxId);
  return (
    <Modal>
      <h3 className="text-xl font-semibold text-rose-700">{title}</h3>
      <p className="mt-2 text-sm text-rose-700">Box này đang ở chế độ placeholder UI. Lock/available/completed vẫn hoạt động đúng flow.</p>
      {msg && <p className="mt-2 text-sm">{msg.title}</p>}
      <div className="mt-4 flex gap-2">
        <button onClick={onComplete} disabled={completed} className="rounded-full bg-rose-600 px-4 py-2 text-white disabled:opacity-50">
          {completed ? "Đã hoàn thành" : "Complete stub"}
        </button>
        <button onClick={onClose} className="rounded-full border border-rose-300 px-4 py-2">Đóng</button>
      </div>
    </Modal>
  );
}
