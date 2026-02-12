export type MbtiPreset = "INTJ" | "INTP" | "INFJ" | "INFP";

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
  game: string;
  unlockRule: string;
}
