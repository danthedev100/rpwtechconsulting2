# RPW LinkedIn intro (25s)

A short brand video for LinkedIn, built with [HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP → MP4).
It reuses the website's logo rings, fonts and colours, and all copy comes from the live site.

| Time | Scene |
|---|---|
| 0–3.8s | Logo sting: rings converge and draw, wordmark slides in |
| 3.6–7.7s | "Technical assurance that holds up under inspection." |
| 7.5–13.6s | Three service pillars |
| 13.4–18.1s | "Independent." + sectors |
| 17.9–22.2s | Richard Warren portrait and title |
| 22–25s | Logo, "Start a conversation", website, LinkedIn |

## Render

```bash
cd video/linkedin-intro
npm install
npm run render            # all three formats → renders/
npm run render:square     # 1080×1080, LinkedIn feed
npm run render:vertical   # 1080×1920, mobile / stories
npm run render:landscape  # 1920×1080, website / presentations
```

The first render downloads a headless Chrome (`npx hyperframes browser ensure`).

## Edit

- Copy and scene markup: `src/template.mjs`
- Layout per format: `src/styles.css` (the `.fmt-*` blocks at the bottom)
- Animation timing: `src/timeline.js`

`index.html` is generated (`node build.mjs <format>`) — don't edit it by hand.
Use `npm run preview` to scrub the timeline in HyperFrames Studio.

## Adding music later

Drop an audio file into `assets/` and add an `<audio>` element inside `#root` in `src/template.mjs`, e.g.
`<audio src="assets/music.mp3" data-start="0" data-duration="25" data-fade-out="1.5"></audio>`.
Only use a track you have a licence for.
