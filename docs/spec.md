# Economics Blind Box Gift — Project Spec (v2.1 — Balanced)
**Tone:** hồng pastel (soft, cozy)  
**Motif:** hoa linh lan (lily of the valley)  
**Mode:** **Balanced** (không chọn MBTI; phù hợp chung cho INTJ/INTP/INFJ/INFP)  
**Ngày cập nhật:** 2026-02-12  

> This spec is a unified version: **one experience**, no MBTI selector.  
> Focus: clear, warm, playful vừa đủ, không “kẹo” quá, không “khô” quá.

---

## 0) Mục tiêu
Web quà tặng interactive: **ảnh + nhạc nền + blind box (4–5 hộp)**, mỗi hộp là **mini‑game kinh tế**.  
**Thắng game → nhận sticker + message card + (có thể) reveal ảnh**.  
**Đủ sticker → mở Final Letter.**

---

## 1) Trải nghiệm (Flow) & độ dài
### Flow tổng
**Start → Gallery → Xưa/Nay → Blind Box (4–5 game) → Sticker Album → Final Letter**

### Độ dài chơi
**~ 5–12 phút** (tuỳ số ảnh và số box).

### Visual tone
- Chủ đạo: **hồng pastel**
- Hoạ tiết: **hoa linh lan** (line‑art, sticker, watermark)

---

## 2) Tech stack (khuyến nghị)
| Thành phần | Khuyến nghị | Ghi chú |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Dễ routing, deploy Vercel, code sạch |
| UI | **Tailwind CSS** (tuỳ chọn: shadcn/ui) | Nhanh ra UI đẹp, đồng bộ |
| Animation | **Framer Motion** | Reveal/transition mượt, hover micro‑interactions |
| Chart | **SVG tự vẽ** | Animate line “vẽ dần” cho Box 1 |
| Audio | **HTML audio + `playlist.json`** | Nhạc chạy xuyên suốt sau Start |
| State | **localStorage** | Lưu openedBoxes, stickers, musicIndex/soundOn… |

**Lưu ý iOS/Safari:** thường chặn autoplay → Intro phải có nút **Start/Open Gift** để người nhận bấm 1 lần thì nhạc mới chạy ổn.

---

## 3) Design system — hồng pastel + hoa linh lan
### Bảng màu (gợi ý)
- **Background:** `#FCECF2`
- **Card:** `#FFFFFF` / `#FFF6FA`
- **Accent:** `#C84E7A`
- **Highlight:** `#E88FAF`
- **Line:** `#E7CAD6`

### Motif hoa linh lan
- Line‑art mờ ở background (không quá đậm)
- Icon/sticker dạng “bell” (bông nhỏ)
- Confetti dạng **cánh hoa** (chỉ bắn 1 lần khi win / final)
- Divider dạng **cành cong**

### Typography
- Dev: DejaVu Sans (dễ có sẵn)
- Deploy: Inter hoặc Nunito  
- Title: bold; body: thoáng, dễ đọc

### Cards & layout
- Card bo tròn **16–24px**, shadow mềm
- Spacing rộng
- Button dạng pill
- Icon nhẹ nhàng (sparkle/flower)

### Animation rule
- Nhẹ & êm: fade/slide **200–400ms**
- Sticker spring nhẹ
- Tránh “shake” mạnh, quá nhiều hiệu ứng giật

---

## 4) Unified “Balanced Mode” rules (thay cho MBTI preset)
### 4.1 Copywriting (text)
Mục tiêu: **rõ ràng + ấm áp + playful vừa đủ**
- Câu **ngắn**, trực tiếp; không dùng quá nhiều emoji (0–1/câu)
- “Message card” có **2 lớp**:
  - **Title (headline)**: 1 dòng ngắn, cute vừa đủ
  - **Detail (expand)**: 1–3 dòng sâu hơn (optional) + 1 fun‑fact nhỏ (optional)

### 4.2 Game tuning (độ khó)
- Win condition **vừa phải**, không quá “hardcore”
- Cho **Try again** (1–2 lần) không phạt nặng
- Có **Hint** 1 lần / box (tuỳ box)
  - Hint dạng **logic** (1 câu ngắn) + hint dạng **gentle** (1 câu động viên). Người chơi tự chọn.

### 4.3 UI micro-style
- Pastel + lily giữ nhất quán
- Sparkle/confetti hạn chế (để “đúng lúc” mới đã)
- Tooltip/hint có nhưng không spam

---

## 5) Các phần của website (giữ khung, đổi tone/hoạ tiết)
| Phần UI / Thành phần | Nội dung | Hiệu ứng (pink + lily) |
|---|---|---|
| **Intro/Start** | Title + nút Open Gift (không chọn MBTI) | Fade in; sparkle nhỏ; lily watermark; Start → bật nhạc |
| **Music Player** | Play/Pause, Next, Volume, tên bài | Icon pulse; fade chuyển bài; theme hồng |
| **Gallery – Polaroid wall** | Grid ảnh + caption + lightbox | Tilt nhẹ; hover zoom; shadow mềm; caption “viết tay” |
| **Xưa vs Nay** | Before/After slider hoặc flip‑card | Reveal khi scroll; kéo mượt; viền hồng pastel |
| **Blind Box Shelf** | 4–5 box (locked/available/completed) + progress | Box wiggle nhẹ; “xé seal” bằng drag; confetti cánh hoa (win) |
| **Mini-games** | Mỗi box 1 game kinh tế | Đúng: tick + glow; Sai: shake nhẹ; Win: sticker pop-in + message card |
| **Sticker Album** | Ô sticker trống → đầy; đủ sticker mở Final | Sticker spring; sparkle; lily icon |
| **Final Letter** | Lời nhắn cuối + ảnh highlight (optional) | Typewriter nhẹ 1–2 dòng; confetti 1 lần; nền hoa linh lan |

---

## 6) Blind Boxes — mini-games kinh tế (4–5 hộp)
| Box | Tên game | Gameplay cụ thể | Điều kiện thắng (Balanced) | Reward |
|---:|---|---|---|---|
| 1 | **Bull or Bear? (đoán chart)** | Line-chart 7–10 điểm (SVG). Chọn **Tăng/Giảm** | Đúng **3/4**. Có **Hint 1 lần** | Sticker + message card + reveal ảnh |
| 2 | **Supply-Demand Snap** | Kéo đường S/D theo mô tả (2 tình huống) | Đúng **2/2** (có thể cho retry 1 lần) | Sticker + message card |
| 3 | **Budget Challenge** | Phân bổ **100 coin** vào **4 hũ**; có constraint | Thoả constraint trong **30–60s** (cho retry) | Sticker + message card + ảnh moment |
| 4 | **Inflation Basket** | Giỏ hàng 4 món, MCQ % lạm phát (A/B/C) | Đúng **2 câu liên tiếp** (retry được) | Sticker + message card |
| 5 (opt) | **Auction & Strategy** | Chọn bid; bot random; điểm = value − price | Thắng 1–2 vòng | Sticker + rare photo reveal |

---

## 7) Assets & dữ liệu cần chuẩn bị (folders + JSON)
### Folders (gợi ý)
- `public/music/` — MP3 nhạc nền  
  - `track01.mp3`, `track02.mp3`, …
- `public/photos/polaroids/` — ảnh gallery  
  - `p01.jpg`, `p02.jpg`, …
- `public/photos/pairs/` — cặp xưa‑nay  
  - `001_then.jpg` + `001_now.jpg`, …
- `public/photos/rewards/` — ảnh reward theo box  
  - `box1_reward.jpg`, …

### Data files (gợi ý)
- `data/playlist.json` — danh sách nhạc `{ title, file }`
- `data/gallery.json` — ảnh + caption `{ src, caption }`
- `data/boxes.json` — metadata box `{ id, title, icon, game }`
- `data/messages.json` — lời chúc theo box + final (khuyến nghị 2 lớp)
  - Ví dụ: `{ boxId, title, detail, funFact? }`

---

## 8) State & logic unlock (localStorage)
| State | Ý nghĩa | Ví dụ |
|---|---|---|
| `openedBoxes` | Danh sách box đã hoàn thành | `["box1","box3"]` |
| `stickers` | Số sticker đã nhận | `3` |
| `musicIndex` (opt) | Nhớ bài đang phát | `0..n-1` |
| `soundOn` (opt) | Bật/tắt nhạc | `true/false` |

**Quy tắc unlock:** Win box → `stickers += 1` + add `openedBoxes`.  
Nếu `stickers == totalBoxes` → mở **Final Letter**.

---

## 9) Checklist triển khai theo phase
### Phase 1 — Khung chạy + đẹp tối thiểu
- Intro + Start (unlock audio)
- Music player
- Gallery + lightbox
- Xưa/Nay 1–3 cặp
- Theme hồng + lily background

### Phase 2 — Blind box + 2 game
- Box shelf + trạng thái
- Box 1 (chart)
- Box 4 (inflation)
- Sticker album + unlock logic

### Phase 3 — Hoàn thiện 4–5 game + Final
- Box 2 (supply-demand drag)
- Box 3 (budget)
- Box 5 (auction — optional)
- Final letter + ảnh highlight
- Polish animation