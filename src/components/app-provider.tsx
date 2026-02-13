"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import playlistData from "../../data/playlist.json";
import boxesData from "../../data/boxes.json";
import type { ProgressState, Track } from "@/lib/types";

const playlist = playlistData as Track[];
const totalBoxes = boxesData.length;

interface AppContextValue {
  completedBoxes: string[];
  earnedBadges: string[];
  stickersCount: number;
  allCompleted: boolean;
  markCompleted: (boxId: string) => void;
  resetProgress: () => void;
  started: boolean;
  openGift: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used inside AppProvider");
  return ctx;
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [completedBoxes, setCompletedBoxes] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const completedRaw = localStorage.getItem("completedBoxes");
    const badgesRaw = localStorage.getItem("earnedBadges");
    const musicRaw = localStorage.getItem("musicIndex");
    const soundRaw = localStorage.getItem("soundOn");
    const startedRaw = localStorage.getItem("giftStarted");

    if (completedRaw) setCompletedBoxes(JSON.parse(completedRaw));
    if (badgesRaw) setEarnedBadges(JSON.parse(badgesRaw));
    if (musicRaw) setMusicIndex(Number(musicRaw));
    if (soundRaw) setSoundOn(soundRaw === "true");
    if (startedRaw) setStarted(startedRaw === "true");

    localStorage.removeItem("mbtiPreset");
    localStorage.removeItem("openedBoxes");
    localStorage.removeItem("stickers");
  }, []);

  useEffect(() => {
    localStorage.setItem("completedBoxes", JSON.stringify(completedBoxes));
  }, [completedBoxes]);

  useEffect(() => {
    localStorage.setItem("earnedBadges", JSON.stringify(earnedBadges));
  }, [earnedBadges]);

  useEffect(() => {
    localStorage.setItem("musicIndex", String(musicIndex));
  }, [musicIndex]);

  useEffect(() => {
    localStorage.setItem("soundOn", String(soundOn));
    if (audioRef.current) audioRef.current.volume = soundOn ? 0.55 : 0;
  }, [soundOn]);

  useEffect(() => {
    localStorage.setItem("giftStarted", String(started));
  }, [started]);

  function markCompleted(boxId: string) {
    setCompletedBoxes((prev) => (prev.includes(boxId) ? prev : [...prev, boxId]));
    setEarnedBadges((prev) => (prev.includes(boxId) ? prev : [...prev, boxId]));
  }

  function resetProgress() {
    setCompletedBoxes([]);
    setEarnedBadges([]);
    localStorage.removeItem("completedBoxes");
    localStorage.removeItem("earnedBadges");
  }

  function openGift() {
    setStarted(true);
    setTimeout(() => audioRef.current?.play().catch(() => null), 0);
  }

  function togglePlay() {
    if (!audioRef.current || !started) return;
    if (audioRef.current.paused) audioRef.current.play().catch(() => null);
    else audioRef.current.pause();
  }

  function nextTrack() {
    const next = (musicIndex + 1) % playlist.length;
    setMusicIndex(next);
    if (started) setTimeout(() => audioRef.current?.play().catch(() => null), 50);
  }

  const value = useMemo(
    () => ({
      completedBoxes,
      earnedBadges,
      stickersCount: earnedBadges.length,
      allCompleted: completedBoxes.length >= totalBoxes,
      markCompleted,
      resetProgress,
      started,
      openGift,
    }),
    [completedBoxes, earnedBadges, started],
  );

  return (
    <AppContext.Provider value={value}>
      <audio ref={audioRef} src={playlist[musicIndex]?.file} loop />
      {started && (
        <div className="music-bar">
          <span>{playlist[musicIndex]?.title}</span>
          <button onClick={togglePlay}>Play/Pause</button>
          <button onClick={nextTrack}>Next</button>
          <button onClick={() => setSoundOn((v) => !v)}>{soundOn ? "Sound On" : "Muted"}</button>
        </div>
      )}
      <div key={pathname} className="page-transition">
        {children}
      </div>
    </AppContext.Provider>
  );
}
