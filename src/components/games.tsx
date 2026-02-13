"use client";

import { useMemo, useState } from "react";

type Trend = "up" | "down";
interface ChartRound {
  points: number[];
  answer: Trend;
}

interface InflationQuestion {
  basketThen: number;
  basketNow: number;
  options: string[];
  answer: string;
}

const chartRounds: ChartRound[] = [
  { points: [40, 43, 45, 44, 47, 49, 52, 55], answer: "up" },
  { points: [62, 60, 58, 57, 56, 54, 52, 50], answer: "down" },
  { points: [45, 44, 46, 47, 48, 50, 51, 53], answer: "up" },
  { points: [70, 69, 68, 66, 65, 64, 63, 61], answer: "down" },
];

const inflationQuestions: InflationQuestion[] = [
  { basketThen: 100, basketNow: 108, options: ["6%", "8%", "10%"], answer: "8%" },
  { basketThen: 120, basketNow: 132, options: ["10%", "12%", "15%"], answer: "10%" },
  { basketThen: 80, basketNow: 88, options: ["8%", "10%", "12%"], answer: "10%" },
];

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

export function Box1Game({ onDone }: { onDone: () => void }) {
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
    if (!answered) return;
    if (roundIndex < chartRounds.length - 1) {
      setRoundIndex((prev) => prev + 1);
      setAnswered(null);
      return;
    }

    const score = answered === round.answer ? correct + 1 : correct;
    if (score >= 3) return onDone();
    if (tries < 1) {
      setTries((prev) => prev + 1);
      setRoundIndex(0);
      setCorrect(0);
      setAnswered(null);
      return;
    }
  }

  return (
    <div>
      <p>Đoán xu hướng tăng/giảm. Cần đúng 3/4. Retry nhẹ 1 lần.</p>
      <p>Round {roundIndex + 1}/4 • Correct: {correct}</p>
      <svg viewBox="0 0 320 160" className="chart">
        <path d={path} className="chart-line" />
      </svg>
      <div className="row">
        <button className="btn" onClick={() => choose("up")}>Up</button>
        <button className="btn" onClick={() => choose("down")}>Down</button>
        <button className="btn" onClick={() => setUsedHint(true)} disabled={usedHint}>Hint</button>
      </div>
      {usedHint && (
        <div className="hint-box">
          <button className="btn" onClick={() => setHintMode("logic")}>Logic hint</button>
          <button className="btn" onClick={() => setHintMode("gentle")}>Gentle hint</button>
          <p>{hintMode === "logic" ? "Nhìn 2 điểm cuối để ưu tiên hướng." : "Bạn làm ổn rồi, nhìn xu hướng tổng thể nhé."}</p>
        </div>
      )}
      <button className="btn btn-primary" onClick={next} disabled={!answered}>Tiếp tục</button>
    </div>
  );
}

export function Box4Game({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [tries, setTries] = useState(0);
  const [feedback, setFeedback] = useState("");
  const q = inflationQuestions[index % inflationQuestions.length];

  function choose(option: string) {
    if (option === q.answer) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setFeedback("Đúng rồi.");
      if (nextStreak >= 2) return onDone();
      setIndex((prev) => prev + 1);
      return;
    }
    setFeedback("Sai nhẹ, thử lại nhé.");
    setStreak(0);
    if (tries < 1) {
      setTries((prev) => prev + 1);
      setIndex((prev) => prev + 1);
    }
  }

  return (
    <div>
      <p>Giỏ hàng từ {q.basketThen} lên {q.basketNow}. Lạm phát gần đúng?</p>
      <div className="row">
        {q.options.map((opt) => (
          <button key={opt} className="btn" onClick={() => choose(opt)}>{opt}</button>
        ))}
      </div>
      <p>Streak: {streak}/2 • Retry used: {tries}/2</p>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export function StubGame({ title, onDone }: { title: string; onDone: () => void }) {
  return (
    <div>
      <p>{title} hiện là placeholder. Trạng thái hoàn thành vẫn được ghi nhận đúng flow.</p>
      <button className="btn btn-primary" onClick={onDone}>Complete stub</button>
    </div>
  );
}
