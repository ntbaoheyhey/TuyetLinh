export type StepKey = "start" | "gallery" | "xuanay" | "blindBoxes" | "stickers" | "final";

export interface Track {
  id: string;
  title: string;
  file: string;
  artist: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
}

export interface BoxItem {
  id: string;
  title: string;
  icon: string;
  type: "game" | "stub";
  description: string;
}

export interface MessageCard {
  boxId: string;
  title: string;
  detail: string;
  funFact?: string;
}
