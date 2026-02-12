"use client";

import { useEffect, useMemo, useState } from "react";
import boxes from "../../data/boxes.json";
import gallery from "../../data/gallery.json";
import messages from "../../data/messages.json";
import playlist from "../../data/playlist.json";
import type { BoxItem, GalleryItem, MessageCard, StepKey, Track } from "@/lib/types";

const steps: { key: StepKey; label: string }[] = [
  { key: "start", label: "Start" },
  { key: "gallery", label: "Gallery" },
  { key: "xuanay", label: "Xưa/Nay" },
  { key: "blindBoxes", label: "Blind Boxes" },
  { key: "stickers", label: "Sticker Album" },
  { key: "final", label: "Final Letter" }
];

const bullBearRounds = [
  { id: 1, points: "5,80 35,60 65,62 95,45 125,48 155,31 185,18", answer: "up", logicHint: "Nhìn điểm đầu và điểm cuối: điểm cuối cao hơn đáng kể.", gentleHint: "Cứ bình tĩnh nhìn tổng thể đường đi thay vì từng đoạn nhỏ." },
  { id: 2, points: "5,22 35,28 65,38 95,36 125,50 155,61 185,74", answer: "down", logicHint: "Giá chốt cuối thấp hơn đầu, dù giữa chừng có hồi nhẹ.", gentleHint: "Thử nhìn xu hướng chung từ trái sang phải nhé." },
  { id: 3, points: "5,78 35,58 65,55 95,40 125,37 155,25 185,12", answer: "up", logicHint: "Pha giảm mạnh bị đảo chiều cuối chart, điểm chốt vẫn trên điểm đầu.", gentleHint: "Có đoạn “bật lên” ở cuối, đừng bỏ qua." },
  { id: 4, points: "5,20 35,22 65,35 95,33 125,45 155,48 185,64", answer: "up", logicHint: "Các đáy sau cao hơn đáy trước, đỉnh cuối tăng rõ rệt.", gentleHint: "Đây là kiểu “đi lên mềm” hơn là tăng sốc." }
] as const;

const inflationQuestions = [
  {
    id: "q1",
    question: "Nếu giá đa số mặt hàng thiết yếu cùng tăng trong thời gian dài, đó là?",
    choices: ["Giảm phát", "Lạm phát", "Ổn định giá"],
    answer: 1
  },
  {
    id: "q2",
    question: "Để kiềm chế lạm phát cao, ngân hàng trung ương thường làm gì trước?",
    choices: ["Giảm lãi suất", "Tăng lãi suất", "In thêm tiền"],
    answer: 1
  },
  {
    id: "q3",
    question: "Rổ CPI dùng để...",
    choices: ["Đo mức giá trung bình của nhóm hàng đại diện", "Định giá cổ phiếu", "Đo tỷ lệ thất nghiệp"],
    answer: 0
  }
];

export default function DemoShell() {
  const [currentStep, setCurrentStep] = useState(0);
  const [openedBoxes, setOpenedBoxes] = useState<string[]>([]);
  const [stickers, setStickers] = useState(0);
  const [musicIndex, setMusicIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);

  const [box1Round, setBox1Round] = useState(0);
  const [box1Correct, setBox1Correct] = useState(0);
  const [box1Result, setBox1Result] = useState<string>("");
  const [box1HintUsed, setBox1HintUsed] = useState(false);
  const [hintStyle, setHintStyle] = useState<"logic" | "gentle">("logic");

  const [box4QuestionIndex, setBox4QuestionIndex] = useState(0);
  const [box4Streak, setBox4Streak] = useState(0);
  const [box4Result, setBox4Result] = useState<string>("");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const boxList = boxes as BoxItem[];
  const cardMessages = messages as MessageCard[];
  const totalBoxes = boxList.length;
  const canEnterFinal = stickers >= totalBoxes;

  useEffect(() => {
    const legacyMbti = localStorage.getItem("mbtiPreset");
    if (legacyMbti) localStorage.removeItem("mbtiPreset");

    const savedBoxes = localStorage.getItem("openedBoxes");
    if (savedBoxes) {
      try {
        const parsed = JSON.parse(savedBoxes);
        if (Array.isArray(parsed)) setOpenedBoxes(parsed.filter((item) => typeof item === "string"));
      } catch {
        localStorage.removeItem("openedBoxes");
      }
    }

    const savedStickers = Number(localStorage.getItem("stickers") || 0);
    setStickers(Number.isFinite(savedStickers) ? savedStickers : 0);

    const savedMusicIndex = Number(localStorage.getItem("musicIndex") || 0);
    setMusicIndex(Number.isFinite(savedMusicIndex) ? savedMusicIndex : 0);

    const savedSoundOn = localStorage.getItem("soundOn");
    if (savedSoundOn === "true" || savedSoundOn === "false") setSoundOn(savedSoundOn === "true");
  }, []);

  useEffect(() => localStorage.setItem("openedBoxes", JSON.stringify(openedBoxes)), [openedBoxes]);
  useEffect(() => localStorage.setItem("stickers", String(stickers)), [stickers]);
  useEffect(() => localStorage.setItem("musicIndex", String(musicIndex)), [musicIndex]);
  useEffect(() => localStorage.setItem("soundOn", String(soundOn)), [soundOn]);

  const currentRound = bullBearRounds[box1Round];
  const box1Done = openedBoxes.includes("box1");
  const box4Done = openedBoxes.includes("box4");

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const completeBox = (boxId: string) => {
    if (openedBoxes.includes(boxId)) return;
    setOpenedBoxes((prev) => [...prev, boxId]);
    setStickers((prev) => prev + 1);
  };

  const handleBullBear = (guess: "up" | "down") => {
    if (!currentRound || box1Done) return;
    const isCorrect = guess === currentRound.answer;
    const nextCorrect = box1Correct + (isCorrect ? 1 : 0);
    setBox1Correct(nextCorrect);
    setBox1Result(isCorrect ? "✅ Chính xác!" : "❌ Chưa đúng.");

    if (box1Round === 3) {
      if (nextCorrect >= 3) {
        setBox1Result(`🎉 Thắng ${nextCorrect}/4. Box 1 đã hoàn thành.`);
        completeBox("box1");
      } else {
        setBox1Result(`Bạn đạt ${nextCorrect}/4. Cần 3/4 để mở box, thử lại nhé.`);
      }
      return;
    }
    setBox1Round((prev) => prev + 1);
  };

  const resetBox1 = () => {
    setBox1Round(0);
    setBox1Correct(0);
    setBox1Result("");
    setBox1HintUsed(false);
  };

  const currentQuestion = inflationQuestions[box4QuestionIndex % inflationQuestions.length];

  const handleInflationAnswer = (choiceIndex: number) => {
    if (box4Done) return;
    const correct = choiceIndex === currentQuestion.answer;
    if (correct) {
      const next = box4Streak + 1;
      setBox4Streak(next);
      setBox4Result("✅ Đúng rồi!");
      if (next >= 2) {
        setBox4Result("🎉 Đủ 2 câu đúng liên tiếp. Box 4 hoàn thành!");
        completeBox("box4");
        return;
      }
    } else {
      setBox4Streak(0);
      setBox4Result("❌ Sai rồi, streak về 0. Bạn thử lại nhé.");
    }
    setBox4QuestionIndex((prev) => prev + 1);
  };

  const orderedProgress = useMemo(() => ({
    blindBoxesAccessible: currentStep >= 3,
    stickerAccessible: currentStep >= 4
  }), [currentStep]);

  return (
    <main className="page">
      <header className="hero card">
        <p className="label">Economics Blind Box — Balanced v2.1 (Option A)</p>
        <h1>Economics Blind Box Gift Website</h1>
        <p>Trải nghiệm unified flow: Start → Gallery → Xưa/Nay → Blind Boxes → Sticker Album → Final Letter.</p>
        <div className="flow-nav">
          {steps.map((step, idx) => (
            <button key={step.key} className={idx === currentStep ? "chip active" : "chip"} onClick={() => setCurrentStep(idx)}>
              {idx + 1}. {step.label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button onClick={prevStep} disabled={currentStep === 0}>Back</button>
          <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</button>
        </div>
      </header>

      {currentStep >= 0 && (
        <section className="card">
          <h2>Start</h2>
          <p>Nhấn Next để đi theo flow. Theme pastel + lily giữ xuyên suốt, không chia preset MBTI.</p>
          <h3>Music Player (sample data)</h3>
          <ul>
            {(playlist as Track[]).map((track, idx) => (
              <li key={track.id}>
                <button onClick={() => setMusicIndex(idx)}>{musicIndex === idx ? "▶" : "▷"}</button> {track.title} — {track.artist}
              </li>
            ))}
          </ul>
          <button onClick={() => setSoundOn((prev) => !prev)}>Sound: {soundOn ? "On" : "Off"}</button>
        </section>
      )}

      {currentStep >= 1 && (
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
      )}

      {currentStep >= 2 && (
        <section className="card">
          <h2>Xưa vs Nay</h2>
          <div className="pair-row">
            <div className="tile"><strong>Then</strong><p>/photos/pairs/001_then.jpg</p></div>
            <div className="tile"><strong>Now</strong><p>/photos/pairs/001_now.jpg</p></div>
          </div>
        </section>
      )}

      {orderedProgress.blindBoxesAccessible && (
        <section className="card">
          <h2>Blind Boxes</h2>
          <p>Trạng thái: locked / available / completed. Hoàn thành mỗi box nhận 1 sticker.</p>

          <div className="grid">
            {boxList.map((box, idx) => {
              const previousDone = idx === 0 || openedBoxes.includes(boxList[idx - 1].id);
              const completed = openedBoxes.includes(box.id);
              const state = completed ? "completed" : previousDone ? "available" : "locked";

              return (
                <article key={box.id} className={`tile ${completed ? "done" : ""}`}>
                  <h3>{box.icon} {box.title}</h3>
                  <p>{box.description}</p>
                  <small>State: {state}</small>

                  {box.id === "box1" && state !== "locked" && (
                    <div className="game-panel">
                      <p>Round {Math.min(box1Round + 1, 4)}/4 · Correct: {box1Correct}</p>
                      <svg viewBox="0 0 190 90" className="chart">
                        <polyline points={currentRound.points} className="chart-line" />
                      </svg>
                      <div className="action-row">
                        <button onClick={() => handleBullBear("up")}>Up ↑</button>
                        <button onClick={() => handleBullBear("down")}>Down ↓</button>
                        <button
                          disabled={box1HintUsed}
                          onClick={() => {
                            setBox1HintUsed(true);
                            setHintStyle((prev) => (prev === "logic" ? "gentle" : "logic"));
                          }}
                        >
                          {box1HintUsed ? "Hint used" : "Use 1 hint"}
                        </button>
                        <button onClick={resetBox1}>Reset Box 1</button>
                      </div>
                      {box1HintUsed && (
                        <p className="hint">💡 {hintStyle === "logic" ? currentRound.logicHint : currentRound.gentleHint}</p>
                      )}
                      <p>{box1Result}</p>
                    </div>
                  )}

                  {box.id === "box2" && state !== "locked" && !completed && (
                    <button onClick={() => completeBox("box2")}>Complete stub (demo)</button>
                  )}

                  {box.id === "box3" && state !== "locked" && !completed && (
                    <button onClick={() => completeBox("box3")}>Complete stub (demo)</button>
                  )}

                  {box.id === "box4" && state !== "locked" && (
                    <div className="game-panel">
                      <p>Streak: {box4Streak}/2</p>
                      <p>{currentQuestion.question}</p>
                      <div className="stack">
                        {currentQuestion.choices.map((choice, choiceIdx) => (
                          <button key={choice} onClick={() => handleInflationAnswer(choiceIdx)}>{choice}</button>
                        ))}
                      </div>
                      <p>{box4Result}</p>
                    </div>
                  )}

                  {completed && <p>✅ Box đã mở.</p>}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {orderedProgress.stickerAccessible && (
        <section className="card">
          <h2>Sticker Album</h2>
          <p>{stickers}/{totalBoxes} stickers đã thu thập.</p>
          <div className="sticker-row">
            {boxList.map((box) => (
              <span key={box.id} className={openedBoxes.includes(box.id) ? "sticker on" : "sticker"}>{box.icon}</span>
            ))}
          </div>
        </section>
      )}

      {currentStep >= 5 && (
        <section className={canEnterFinal ? "card final unlock" : "card final"}>
          <h2>Final Letter</h2>
          {canEnterFinal ? <p>🎉 Bạn đã unlock Final Letter. (Nội dung thật sẽ được thay sau)</p> : <p>Cần đủ stickers để mở Final Letter.</p>}
        </section>
      )}

      <section className="card">
        <h2>Balanced Message Cards</h2>
        <div className="stack">
          {cardMessages.map((card) => {
            const expanded = expandedCards[card.boxId] ?? false;
            return (
              <article key={card.boxId} className="message-card">
                <p className="msg-label">{card.boxId.toUpperCase()}</p>
                <h3>{card.title}</h3>
                <button onClick={() => setExpandedCards((prev) => ({ ...prev, [card.boxId]: !expanded }))}>
                  {expanded ? "Collapse" : "Expand details"}
                </button>
                {expanded && (
                  <>
                    <p>{card.detail}</p>
                    {card.funFact && <p className="fun-fact">🌼 {card.funFact}</p>}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
