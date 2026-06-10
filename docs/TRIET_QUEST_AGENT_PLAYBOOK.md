# Triet Quest Agent Playbook

## Muc tieu san pham

Bien cay tu duy thanh mot cuon sach song ve dong chay triet hoc. Moi chuong phai co nhan vat 2.5D sourced tu asset lich su, boi canh rieng, loi ke, doi thoai, luan diem, anh huong, voice va chuyen dong lat trang muot.

## Doi ngu thuc hien

### Agent 1: Story Lead

- Chiu trach nhiem truc noi dung lich su va mach truyen.
- Duy tri data trong `src/data/philosophyTimeline.ts`.
- Moi nhan vat can co: `sceneTitle`, `storyOpening`, `storyBeat`, `dialogue`, `thesis`, `context`, `influence`, `reflection`, `quote`, `voiceScript`, `visualMood`.
- Tieu chi xong viec: doc tung trang thay ro cau hoi lich su cua nhan vat, khong chi la tom tat ly thuyet.

### Agent 2: Historical Asset Curator

- Thu thap portrait va backdrop tu nguon public/Wikimedia/Wikipedia hoac CC ro rang.
- Duy tri `src/data/philosopherAssets.ts` va `public/assets/mindmap/manifest.json`.
- Asset chinh hien co:
  - Portraits: `public/assets/mindmap/portraits/`
  - Backdrops: `public/assets/mindmap/backdrops/`
  - Audio: `public/audio/`
- Tieu chi xong viec: moi trieth gia co local portrait + local backdrop plate, remote URL chi con la fallback/reference.

### Agent 3: Scene/2.5D Art Director

- Chiu trach nhiem cam giac mo mong, hoanh trang, kich tinh hoac am ap theo tung chuong.
- Duy tri `src/components/mindmap/SceneBackdrop.tsx` va `src/components/mindmap/LayeredCharacterPortrait.tsx`.
- Nguyen tac:
  - Socrates/Plato: mo mong, huyen ao, anh sang khai mo.
  - Aristotle: ro net, sang, co trat tu quan sat.
  - Hegel: kich tinh, doi lap, xoay chuyen lich su.
  - Marx/Engels/Lenin: hoanh trang hon, co nhip lich su, cong nghiep, ban do, hanh dong.
- Tieu chi xong viec: nhin nhanh vao scene biet dang o thoi dai va tam trang nao.

### Agent 4: Motion Engineer

- Duy tri `src/components/mindmap/StoryBookStage.tsx`, GSAP flow va reduced-motion fallback.
- Can giu:
  - Lat trang theo `next`, `prev`, `jump`.
  - Parallax backdrop nhe.
  - Portrait lift va voice pulse nhe.
  - Khong tao trang trang/hidden content neu animation chua hoan tat.
- Tieu chi xong viec: chuyen nhan vat muot, khong giat ro, mobile khong bi overflow ngang.

### Agent 5: Voice/Narration Engineer

- Duy tri `src/hooks/useCharacterAudio.ts`, `src/hooks/useSpeechNarration.ts`, voice controls trong `StoryBookStage` va `PhilosopherDialog`.
- Mac dinh:
  - MP3 local trong `public/audio/`.
  - Web Speech API trong dialog la fallback/bo sung.
- Tieu chi xong viec: play, pause, stop, seek, rate hoat dong; doi nhan vat thi audio cu dung lai.

### Agent 6: QA Monitor

- Chuyen trach kiem tra tien do sau moi milestone.
- Buoc bat buoc sau moi thay doi lon:
  - `npm run lint`
  - `npm run build`
  - Mo/review `http://localhost:5173/`
  - Kiem deep link, vi du `#/mindmap/philosopher-plato`
  - Chup desktop va mobile neu co thay doi layout/asset/motion.
- Tieu chi xong viec: khong overflow ngang, khong cat chu nghiem trong, portrait/backdrop hien dung, voice khong bi treo, reduced-motion van dung duoc.

## Checklist review tai localhost

1. `http://localhost:5173/#/mindmap` vao duoc chuong dau.
2. `http://localhost:5173/#/mindmap/philosopher-marx` vao dung Marx sau refresh.
3. Moi nhan vat co portrait local tu `public/assets/mindmap/portraits/`.
4. Moi chuong co backdrop local tu `public/assets/mindmap/backdrops/`.
5. Nut `Trang sau`, `Trang truoc`, va click chapter rail doi canh dung.
6. Voice MP3 phat duoc va dung khi doi nhan vat.
7. Dialog ho so mo/dong bang nut X, backdrop click, phim Escape.
8. Mobile 390px khong cat H1, tag, button, portrait.
9. Desktop 1440px hien ro stage, chapter rail, influence map.
10. Neu `prefers-reduced-motion` bat, motion rut ve nhe va noi dung van hien.

## Trang thai hien tai

- Portrait local: 8/8.
- Backdrop local: 8/8.
- Voice MP3 local: 8/8.
- Story stage: da co layout gon hon, manuscript gallery frame, pedestal cho Socrates/Plato/Aristotle, paced dialogue, next-chapter handoff va motion nhe hon.
- Mindmap panels: header da rut gon, influence/challenge da dua xuong khu phu co the mo, chapter rail da thanh muc luc gon.
- QA gan nhat: `npm run lint` va `npm run build` pass; `localhost:5173` va deep link hash tra HTTP 200. Chua chup screenshot moi vi moi truong hien tai khong co browser CLI san.

## Viec nen lam tiep

- Chuan hoa lai toan bo `philosophyTimeline.ts` neu con mojibake trong source editor.
- Thu thap them layer foreground rieng: amphorae, manuscripts, telegrams, factory ledger, map pins.
- Review screenshot thu cong desktop 1440px va mobile 390px tren `localhost:5173`, dac biet Socrates/Plato/Aristotle pedestal va Lenin mobile.
- Them mode reduced-motion QA thu cong trong browser.
- Neu can nang cap voice, tao MP3 moi voi giong doc nhan vat hon va thay vao `public/audio/`.
