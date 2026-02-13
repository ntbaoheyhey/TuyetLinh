# Economics Blind Box Gift Website

## Run

```bash
npm install
npm run dev
```

## Routes

- `/` Start
- `/gallery`
- `/then-now`
- `/boxes`
- `/boxes/1` ... `/boxes/5`
- `/final`
- `/feedback`
- `/outro`

`/album` now redirects to `/boxes`.

## Notes

- Music is global and starts only after clicking **Open Gift**.
- Progress persists in localStorage (`completedBoxes`, `earnedBadges`, `musicIndex`, `soundOn`, `giftStarted`).
- Reset appears after all 5 boxes are complete.
