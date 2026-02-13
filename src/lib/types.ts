export interface Track {
  id: string;
  title: string;
  file: string;
  artist: string;
}

export interface GalleryMonthItem {
  src: string;
  caption?: string;
}

export interface GalleryMonth {
  month: number;
  title: string;
  items: GalleryMonthItem[];
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
