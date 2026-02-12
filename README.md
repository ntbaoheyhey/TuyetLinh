# Economics Blind Box Gift Website (Balanced Mode)

Next.js App Router demo theo spec `docs/spec.md`, triển khai một trải nghiệm thống nhất (không MBTI selector, không personality tách riêng).

## Setup / Run / Build

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

```bash
npm run build
npm run start
```

## Project structure

- `src/app/`
  - `layout.tsx`: metadata + root layout
  - `page.tsx`: entry page
  - `globals.css`: Tailwind base
- `src/components/demo-shell.tsx`: toàn bộ flow UI + mini-games + localStorage/audio logic
- `src/lib/types.ts`: shared TypeScript types
- `data/`
  - `playlist.json`: danh sách nhạc cho `<audio>`
  - `gallery.json`: dữ liệu ảnh polaroid
  - `boxes.json`: metadata blind boxes
  - `messages.json`: message card layered `{ boxId, title, detail, funFact? }`
- `public/`
  - `music/`
  - `photos/polaroids/`
  - `photos/pairs/`
  - `photos/rewards/`

## Implemented

- ✅ Unified Balanced mode copywriting (clear + warm + playful vừa đủ, emoji tối giản).
- ✅ Full flow: `Start → Gallery → Xưa/Nay → Blind Boxes → Sticker Album → Final Letter`.
- ✅ Tailwind CSS UI + Framer Motion transitions / micro-interactions.
- ✅ Audio via HTML `<audio>` + `data/playlist.json`.
  - chỉ phát sau click **Open Gift** (để tránh autoplay restrictions).
- ✅ localStorage persistence:
  - `openedBoxes: string[]`
  - `stickers: number`
  - `musicIndex?: number`
  - `soundOn?: boolean`
  - không dùng và có cleanup `mbtiPreset`
- ✅ Box 1 fully implemented:
  - SVG line chart 8 điểm, animated draw
  - đoán Up/Down
  - thắng khi đúng 3/4
  - 1 hint/box với 2 kiểu: logic + gentle
  - retry nhẹ 1 lần
- ✅ Box 4 fully implemented:
  - MCQ inflation basket
  - thắng khi đúng 2 câu liên tiếp
  - retry nhẹ
- ✅ Box 2, Box 3 (và box 5 optional) đang là stub UI nhưng có state `locked/available/completed` đầy đủ.
- ✅ Sticker Album + unlock Final Letter theo số sticker.

## Stubbed / not yet production

- Ảnh thật và file nhạc thật chưa có (đang là sample paths).
- Box 2, Box 3, Box 5 gameplay kinh tế thực tế chưa triển khai.
- Lightbox gallery / before-after slider nâng cao chưa thêm.

## Assumptions

- Demo tập trung Phase 1–2 theo spec, giữ Box 5 là optional.
- Unlock theo thứ tự box (box trước mở thì box sau available).
