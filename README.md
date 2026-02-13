# Economics Blind Box Gift Website (Balanced Mode)

## Run

```bash
npm install
npm run dev
```

## New route flow

- `/` opening (Open Gift)
- `/gallery`
- `/then-now`
- `/boxes`
- `/boxes/1` ... `/boxes/5`
- `/album`
- `/final` (locked until all 5 completed)

## What was changed (minimal refactor)

- Reused existing data JSON (`playlist`, `gallery`, `boxes`, `messages`) and existing game logic for Box 1 + Box 4.
- Split old long single-page flow into App Router pages above.
- Added small global app provider (`src/components/app-provider.tsx`) to persist:
  - `completedBoxes`
  - `earnedBadges`
  - `musicIndex`
  - `soundOn`
  - `giftStarted`
- Added global audio player in layout/provider so music persists across page transitions and still starts only after clicking **Open Gift**.
- Added Box hub completion visuals + immediate badge/sticker display and Reset button when all 5 completed.
- Added route transition animation (fade + slight slide + subtle blur) and opening sparkle/glow via CSS.

## Stubbed

- Box 2, 3, 5 are still placeholders but preserve locked/available/completed behavior.
