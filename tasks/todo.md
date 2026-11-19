# Path to Self: UX/UI audit (2026-11-19)

Milestones this session: **UX/UI fixes** · **Figure update** (parked; the pulse and smoke changes are uncommitted in `src/App.tsx` and `src/styles.css`).

How each finding was found:
- **[measured]** checked in the browser at 1440×900 and 375×812
- **[code]** read from the source
- **[opinion]** design judgement, not tested with users

## P1: Fix first (mobile core flow)

- [ ] **1. Tapping an orb on mobile looks like it does nothing.** [measured] After a tap, the chakra name sits at y=929px on an 812px-tall screen and the page doesn't scroll, so the content changes out of sight.
  *Fix:* scroll smoothly to the chakra header after selecting on mobile, or show a sticky "Anahata · Read ↓" bar.
- [ ] **2. The mobile orbs are too small and too close together.** [measured] They're 30px wide, but their centres are only 26–67px apart (root to sacral is 26px), so tap areas overlap. Apple and Google recommend at least 44px.
  *Fix:* add a row of 01–07 chips under the figure on mobile as the main way to select, and keep the orbs as decoration or a secondary option.
- [ ] **3. Reading text is too small.** [measured] Accordion body text is 13px and the intro is 13.5px on both desktop and mobile. That's long-form reading at caption size.
  *Fix:* 16px on mobile, 15–16px on desktop, line height around 1.6.
- [ ] **4. You lose your place while reading on mobile.** [measured/opinion] Once you scroll into the sections, nothing shows which chakra you're on, and the only way forward is "Continue the path" at the very bottom.
  *Fix:* a sticky mini-header with the chakra name, colour dot and ‹ › buttons.

## P2: Hierarchy and layout

- [ ] **5. Too many tiny uppercase labels.** [measured] "An Experimental Map" is 10px, "Element" and the other fact labels are 10.5px, "Active Chakra" is 11px, the footer links are 11px, and the accordion numbers are 10px at **4.1:1 contrast, which fails WCAG AA**.
  *Fix:* cut back the kicker labels, use 12px minimum, and switch accordion titles to sentence case.
- [ ] **6. The desktop left panel overflows.** [measured] At 1440×900 its content is 942px tall in a 900px panel, so the Journal/Library/About links are partly cut off at the bottom.
  *Fix:* tighten the header, or move Journal/Library/About into a small top bar.
- [ ] **7. Eleven accordion sections per chakra.** [opinion] That's a wall of identical rows.
  *Fix:* group them into 3 tabs: Understand (themes, stage, shadow), Body (somatics, nervous system, poses), Practice (practices, mantras, crystals, related, contemplation).
- [ ] **8. Two navigations do the same job on desktop.** [opinion] The left list and the orbs both select a chakra, and three columns compete for attention.
  *Fix:* make the list more compact, or let the figure lead.
- [ ] **9. Mobile footer links are 15px tall.** [measured] That's too small to tap reliably.
  *Fix:* at least 44px of padding around each link.

## P3: Accessibility

- [ ] **10. Pop-ups don't take keyboard focus.** [measured] Opening About, Journal or Library leaves focus behind the overlay. Tab keeps moving through the page underneath.
  *Fix:* move focus into the dialog, keep it there while open, and return it on close.
- [ ] **11. The selected chakra isn't announced to screen readers.** [measured] Neither the orbs nor the list items have `aria-pressed` or `aria-current`.
- [ ] **12. The arrow keys take over the whole page.** [code] There's a global `keydown` listener with `preventDefault` (`src/App.tsx` ~line 422), so keyboard users can't scroll with the arrow keys.
  *Fix:* only handle arrows when focus is on the figure or the list.
- [ ] **13. Screen readers still read collapsed sections.** [measured] Add `inert` or `hidden` to closed sections.
- [ ] **14. The focus ring is faint.** [code] It's a 1px line at 70% opacity. Make it 2px.

## P4: Polish

- [ ] **15. Shared links look bare.** [measured] There's no meta description, no social preview image (`og:image`) and no favicon.
- [ ] **16. The quiz gives a misleading result when nothing stands out.** [code] If someone answers "Not really" to everything, every chakra scores 0 and the result is still Muladhara, with a reading that implies a problem. Show a "no strong pull" result instead.

## Checks that passed

- Text contrast against the background: everything passes AA except item 5's accordion numbers. All 7 chakra colours are 5.1:1 or higher.
- Escape closes pop-ups. Users with "reduce motion" on get no animation.
- Page language is set and the title is present.

## Suggested order

Batch A (mobile flow): 1, 2, 4, 9 → Batch B (type and hierarchy): 3, 5, 6 → Batch C (accessibility): 10–14 → Batch D: 7, 8, 15, 16

---

# Plan: UX/UI pass 1 (items 1–9), DRAFT for approval

Scope: P1 and P2 (items 1–9). Accessibility (10–14) and polish (15–16) come next, in pass 2.
Work happens on a branch `ux-pass-1`. Nothing goes to `main` (and so the live site) until you approve.

## Goals: each one is checked by a script, not by eye

| # | Goal | Done when (pass/fail check) | Covers |
|---|------|-----------------------------|--------|
| G1 | Selecting on mobile is visible | At 375×812, after tapping any orb or chip, the chakra name is on screen within 700ms | 1 |
| G2 | Everything is tappable | On mobile, every interactive element is at least 44×44px, and no two chakra hit areas overlap | 2, 9 |
| G3 | Reading is comfortable | Body paragraphs are 16px or larger on mobile and 15px or larger on desktop, with line height 1.5 or more | 3 |
| G4 | You never lose your place | On mobile, while scrolled into the content, a sticky bar shows the current chakra and its ‹ › buttons work | 4 |
| G5 | Labels are readable | No visible text under 12px; every text element is at least 4.5:1 contrast; ALL-CAPS only on labels of 3 words or fewer | 5 |
| G6 | Nothing is cut off on desktop | At 1440×900 and 1366×768 the left panel fits without being clipped or scrolling | 6 |
| G7 | Sections are digestible | The 11 sections sit in 3 tabs (no tab has more than 4); all 11 can be reached; tabs work by mouse, touch and keyboard | 7 |
| G8 | One focal point on desktop | The left list is compact (decided with you); you sign off on before/after screenshots | 8 |
| G9 | No regressions | `tsc` and `build` pass; quiz, journal, library and about open and close; arrow-key navigation works; reduced motion is respected; no console errors | all |

G1–G7 and G9 are checked automatically by one script run in the browser at 1440×900, 1366×768 and 375×812. G8 is your call, made from screenshots.

## Decisions (2026-11-19)

- **Section tabs:** Understand / Feel / Practice
  - Understand: Psychological Themes, Developmental Stage, Shadow & Blockages, Related Centers
  - Feel: Somatic & Physiology, Nervous System Links, Yoga Poses
  - Practice: Practices & Meditations, Mantras & Sounds, Crystals & Stones, Integration & Contemplation
- **Desktop left list:** compact, one slim line per chakra (number, sigil, name); keywords removed
- **Labels:** gold caps only for short kickers at 12px or larger; section titles in sentence case; drop redundant kickers
- **Mobile selection:** a row of 01–07 chips under the figure; the orbs stay tappable

## Batch 0: Light "parchment" theme + new figure (2026-11-19), DONE

- [x] Colour tokens switched to light (`src/styles.css` `:root`); all ~60 hard-coded dark colours now come from tokens
- [x] Chakra colours used as text are deepened via the `.ink` class (oklab mix, 50%) so they stay readable on cream
- [x] Idle orb rings deepened so they read as tappable on light artwork
- [x] Verified: 0 contrast failures (minimum 4.97:1) across all 7 chakras, Journal/Library/About, quiz intro and quiz result; no console errors; `tsc` + build pass
- [x] New androgynous figure installed (`public/figure.jpg`, 1774×887, 104 KB). The seven painted chakra cores were detected by pixel scan at x = 50.0%, y = 73.8 / 63.0 / 54.4 / 45.8 / 37.2 / 24.9 / 19.9%, and the orb coordinates in `src/data/chakras.ts` were set to match
- [x] Parked smoke wisps removed (invisible on light). Idle orb pulse kept

## Loop

1. Implement one batch → 2. run the check script → 3. fix whatever fails, then re-run → 4. take before/after screenshots at all 3 sizes → 5. next batch.
Done = every goal passes in one clean run, plus your sign-off on G8 → then commit, open a PR, and you merge to deploy.

## Batch A results (2026-11-19), DONE

- [x] Mobile chip row (01–07) under the figure: 48px tall, `aria-pressed`
- [x] Selecting on stacked layouts (≤1120px) via chip, orb, list or "Continue the path" smooth-scrolls the chakra header into view (instant if reduced motion is on)
- [x] Sticky chakra bar on stacked layouts: appears once the header scrolls away, ‹ › wrap around, tapping the title jumps back to the header
- [x] Orb hit areas shrunk below the spacing between neighbours (2.2cqw desktop, 20px mobile) and drawn 1.5× larger, so they never overlap. Every orb centre was confirmed to hit its own button
- [x] Mobile footer links 44px tall; orbs get `aria-pressed`, list items get `aria-current`
- **Checks** (`tasks/ux-check.js`): G1, G2, G4 and G9 pass at 375×812, 900×700, 1440×900 and 1366×768; no console errors; `tsc` and build pass
- Note: at 320px wide the chips are 41px, below 44. 375px and up is fine
- Note: the browser pane was hidden during testing, which stalls smooth scrolling and transitions. The script forces instant scrolling, so the smooth animation itself still needs a look on a real phone

## Batches

- **A (mobile flow):** chip selector, scroll-to-content, sticky chakra bar, bigger tap targets → G1, G2, G4
- **B (type and hierarchy):** body size, label cleanup, left panel fit, compact list → G3, G5, G6, G8
- **C (sections):** 3-tab grouping → G7
- **Final:** full check run (G1–G9), screenshots, PR

## Typeface (2026-11-19), DONE

- [x] Necto Mono (Collletttivo, SIL OFL 1.1) added: `src/assets/fonts/NectoMono-Regular.woff2`, bundled by Vite with a relative URL so it works under the GitHub Pages sub-path; licence at `public/fonts/NectoMono-OFL.txt`
- [x] Roles: Necto Mono = labels, nav, buttons, data values (`--font-ui`); Cormorant Garamond = headings and chakra numbers; Inter = reading text
- [x] Single weight, so UI text is normalised to 400 with `font-synthesis: none` (no faux bold) and tighter 0.06em tracking
- [x] Verified: font loads; no text overflows its panel across all 7 chakras; contrast minimum still 4.97:1; ux-check passes at 1440×900 and 375×812; no console errors
- Note for Batch B: mono is wider, so the chakra-list keywords now wrap to 2 lines. The planned compact list removes them

## Batch B results (2026-11-19), DONE (G8 needs your sign-off)

- [x] Compact desktop list: number, sigil and name on one 42px line (37px on short screens); keywords and the "An Experimental Map" kicker removed
- [x] Reading text: 15px on desktop, 16px on phones, line height 1.55–1.7 (intro, summary, sections, About, Library, quiz reading, journal box)
- [x] Labels: 12px minimum everywhere; long all-caps runs removed (top kicker, quiz button, tap hint, about hint, quiz chart heading, chakra subtitles); section titles shown in sentence case
- [x] Left panel fits at 1440×900 and 1366×768 (a short-screen rule tightens spacing at ≤860px tall); the quiz button's description moved to the body font so it no longer wraps to 3 lines
- [x] Heading and body fonts are now tokens (`--font-display`, `--font-body`), so a new heading font is a one-line change
- **Checks:** G1–G6 and G9 pass at 1366×768, 1440×900, 900×700 and 375×812. The pop-ups and quiz screens were also scanned (sizes, caps, contrast). No console errors; `tsc` and build pass
- Exemption: large display headings (e.g. the 30px "AN ANATOMY OF CONSCIOUSNESS" in About, and "PATH TO SELF") keep caps; the caps rule applies to labels
- [ ] G8: your sign-off on the compact list
- [ ] Open: you said you don't like the look yet, and want a different heading font

## Figure blend + Batch C (2026-11-19), DONE

- [x] Figure re-processed (`tasks/tools/blend-figure.py`, source PNG in ~/Downloads): the paper colour is shifted to exactly `--bg`, then the edges fade to transparent outside an ellipse around the aura. Now `public/figure.webp`, 53 KB (was a 104 KB JPG); `figure.jpg` removed. Body flat `--bg`; the old edge "veil" removed
- [x] Mobile: the artwork keeps its scale (orbs unchanged) but overflows the portrait frame, so the aura fades across the screen instead of being cut into a box; no horizontal scroll
- [x] Orbs: fine 1px rings in each chakra's colour, drawn ~1.16× the hit area (no overlapping rings); selected ring in the chakra colour instead of brown-gold; smaller pulse
- [x] Batch C: Understand (themes, stage, shadow, related) / Feel (somatics, nervous system, poses) / Practice (practices, mantras, crystals, contemplation). Proper tab semantics, ←/→ moves between tabs, arrow keys on a tab no longer switch chakra; resets to Understand on chakra change
- [x] G7 added to ux-check.js. G1–G7 and G9 pass at 375×812, 900×700, 1366×768 and 1440×900; no console errors
- [ ] Heading font: waiting on your pick (the token `--font-display` is ready)

## Edge fix + liquid glass (2026-11-19), DONE

- [x] Figure edges: the top and bottom rows were still opaque (alpha 254/238), causing a hard horizontal line. Top 12% and bottom 10% fades added; all four edges now alpha 0, crown untouched
- [x] Phone panels transparent again (the body is flat, so no box shows), which stops the right panel's solid fill cutting off the glass shadows. Tablets keep the solid fill because the figure is fixed behind the page there
- [x] Liquid-glass styling in plain CSS (`--glass-fill`, `--glass-blur`, `--glass-shadow`): one frosted pill holding the 7 chips, floating over the lotus on phones, with a chakra-tinted lens on the active chip; glass quiz card; glass segmented tabs
- Decision: dashersw/liquid-glass-js was read but NOT used. Its buttons are divs (no keyboard or screen-reader support), it needs html2canvas to screenshot the whole page (slow on phones, stale after content changes), and every element creates its own WebGL context (phones cap these). The look was rebuilt in CSS with real `<button>`s
- [x] G1–G7 and G9 pass at 375×812, 900×700, 1366×768 and 1440×900; no console errors
- [ ] Waiting on you: replacement fonts for Cormorant Garamond (`--font-display`) and Inter (`--font-body`)

## Heading font: Fabello (2026-11-19), DONE locally (licence needed before deploy)

- [x] Cormorant Garamond replaced by Fabello (Light 300 for the title and numbers, Regular 400 for the other headings); Inter kept and its italic loaded; Cormorant removed from the Google Fonts request; theme-color updated to the light background
- [x] Hierarchy (desktop 1440): title 71px Fabello Light, line height 0.92 → chakra name 42–58px Regular → number 32px Light → "Continue the path" 26px → reading 15–16px Inter, line height 1.6–1.7 → section titles and list 15px mono → labels 12px mono. All headings now mixed case (Fabello reads best that way)
- [x] Fabello only covers basic Latin (no curly quotes, no "·"), so it is used only for short headings; italic quotes and prompts moved to Inter italic; "02 · Name" separators changed to "02 – Name"
- [x] Facts show the label above the value (fixes "Lower Abdomen" overflowing)
- [x] G1–G7 and G9 pass at all four sizes; no overflow across 7 chakras; no console errors
- **Licence:** this copy came from dafontfile.org. Fabello is Britt Fabello's commercial font (Creative Market). `src/assets/fonts/fabello/` is git-ignored, so the public repo and deployed site won't include it; headings fall back to Georgia until a licence is bought and the files are committed (verified the build still passes without them)

## Heading font: Day Roman + smaller Inter (2026-11-19), DONE

- [x] Fabello replaced by Day Roman (Fredrick Nader / Apostrophic Labs, 2002; freeware, and the readme invites commercial use with a charity donation; embedding flag allows web use). Committed at `src/assets/fonts/DayRoman-Regular.woff2` (27 KB), readme at `public/fonts/DayRoman-README.txt`. Fabello removed (local copy deleted, gitignore entry dropped)
- [x] Single weight, so all headings are 400 (no faux light or bold); mixed case kept; oldstyle figures for the chakra numbers. The designer notes it is tuned for 10–30pt; at the 71px title no oddities were visible on screen
- [x] Inter reading text 1px smaller at your request: desktop 14px (summary 15px), phones 15px; line height unchanged (1.6–1.7). The journal box stays 16px so iOS doesn't zoom in on focus. G3 thresholds updated to 14 / 15px
- [x] G1–G7 and G9 pass at 375×812, 900×700, 1366×768 and 1440×900; no header overflow across 7 chakras; no console errors

## Small fixes (2026-11-19), DONE

- [x] Library footnote ("A starting shelf, not a syllabus…") removed
- [x] "Continue the path" card made smaller: padding 11px/16px, name 20px (was 26px), keywords 12px, arrow 16px; about 81px tall on desktop
- [x] Inter reading text down another 1px: desktop 13px (summary and quiz lead 14px), phones 14px; line height unchanged at 1.6–1.7. G3 thresholds now 13 / 14px
- [x] G1–G7 and G9 pass at all four sizes; no console errors

## Yantras, paper and smoke (2026-11-19)
- [x] Chakra list icons → traditional yantras (Wikimedia, Atarax42 / Holger Koch, CC0; `src/assets/chakras/`, cleaned by `tasks/tools/clean-chakra-svgs.py`). Muted + multiplied into the paper; active one full colour. 30px.
- [x] Site eyebrow "An Anatomy of Consciousness" 12 → 14px desktop / 15px phones, one line.
- [x] Library closing note (guide to supplement learning, not a replacement).
- [x] Paper grain (fixed SVG fractal-noise overlay, multiply, 0.32) + 5 slow smoke wisps behind the figure (reduced-motion: static).
- [x] Selection effect: 18-fleck gold burst → one soft chakra-coloured bloom expanding from the orb (1.6s).
- Checks: G1–G7, G9 pass at 1440×900, 1366×768, 900×700, 375×812 (G1 mobile failed once on timing in the hidden pane, passed on two reruns). No console errors.
