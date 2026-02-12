# Economics Blind Box Demo (Balanced v2.1 - Option A)

Demo website theo flow thống nhất (không MBTI):

`Start → Gallery → Xưa/Nay → Blind Boxes → Sticker Album → Final Letter`

## 1) Setup & Run

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`.

## 2) Build

```bash
npm run build
npm run start
```

## 3) Cấu trúc chính

- `src/app/`
  - `layout.tsx`: layout + metadata
  - `page.tsx`: render demo shell
  - `globals.css`: theme pastel + lily style + animation
- `src/components/demo-shell.tsx`: toàn bộ flow và state
- `src/lib/types.ts`: kiểu dữ liệu dùng chung
- `data/`
  - `playlist.json`: sample music list
  - `gallery.json`: sample polaroid list
  - `boxes.json`: box config (box1,2,3,4)
  - `messages.json`: balanced message cards `{ boxId, title, detail, funFact? }`
- `public/music`, `public/photos/polaroids`, `public/photos/pairs`, `public/photos/rewards`: nơi đặt assets thật

## 4) Trạng thái triển khai

### Implemented
- Unified Balanced experience (không selector MBTI, không personality MBTI).
- LocalStorage keys:
  - `openedBoxes: string[]`
  - `stickers: number`
  - `musicIndex?: number`
  - `soundOn?: boolean`
- Migration nhẹ: nếu key legacy `mbtiPreset` tồn tại thì tự cleanup.
- End-to-end flow điều hướng được theo thứ tự spec.
- Box 1 (Bull or Bear?) đầy đủ:
  - line chart SVG có animated draw
  - chọn Up/Down
  - điều kiện thắng đúng 3/4
  - 1 hint/box với 2 style hint (logic / gentle)
- Box 4 (Inflation Basket) đầy đủ:
  - câu hỏi MCQ
  - đúng 2 câu liên tiếp để thắng, cho phép retry
- Box 2 & Box 3 đang là stub nhưng đã có state locked/available/completed và hook vào unlock flow.
- Message cards dạng layered: title + expand/collapse detail + funFact optional.

### Stubbed / TODO
- Audio playback thực tế (hiện đang demo danh sách track + trạng thái sound/index).
- Gallery ảnh thật, cặp ảnh xưa-nay thật.
- Mini-game chi tiết cho Box 2 và Box 3.
- Nội dung Final Letter thật + reward image reveal.

## 5) Assumptions

- JSON sample dùng để chạy demo không phụ thuộc assets thật.
- Unlock mẫu theo tuần tự box trong `data/boxes.json`.
- Box 5 là optional nên chưa bật trong bản này.
