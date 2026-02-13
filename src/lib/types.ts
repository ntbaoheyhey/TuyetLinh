export interface Track {
  id: string;
  title: string;
  file: string;
  artist: string;
}

export type NotePlacement = "top" | "bottom" | "left" | "right";

export interface GalleryPosterItem {
  src: string;
  note?: string;
  notePlacement?: NotePlacement;
}

export interface GalleryMonth {
  month: number;
  title: string;
  layout: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L";
  items: GalleryPosterItem[];
}

export interface ThenNowPair {
  id: string;
  thenSrc: string;
  nowSrc: string;
  title?: string;
}

export interface BoxItem {
  id: string;
  title: string;
  icon: string;
  game: string;
  unlockRule: string;
}

export interface MessageCard {
  boxId: string;
  title: string;
  detail?: string[];
  funFact?: string;
}
