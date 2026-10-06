// RPW LinkedIn intro — master timeline (25s). HyperFrames seeks this paused timeline frame by frame,
// so everything here must be deterministic: no randomness, no infinite repeats.
;(function () {
  const DURATION = 25
  const CIRC = 2 * Math.PI * 32 // ring circumference, matches stroke-dasharray in the markup
  const q = (sel, scope) => (scope || document).querySelectorAll(sel)
  const one = (sel, scope) => (scope || document).querySelector(sel)

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })

  // Hidden starting states
  gsap.set(q('.ring'), { strokeDashoffset: CIRC })

  /* ---------- Background (whole video) ---------- */
  const bgRings = one('.bg-rings')
  tl.to(q('.ring', bgRings), { strokeDashoffset: 0, duration: 2.6, stagger: 0.35, ease: 'power2.inOut' }, 0.4)
  q('.orbit', bgRings).forEach((o, i) => {
    tl.fromTo(o, { rotation: 0, transformOrigin: '50% 50%' }, { rotation: i % 2 ? -140 : 140, duration: DURATION, ease: 'none' }, 0)
  })
  q('.ring-group', bgRings).forEach((g, i) => {
    tl.to(g, { x: 6 + i * 3, y: -6 + i * 4, duration: 6.25, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 0)
  })
  tl.fromTo(bgRings, { rotation: -8, scale: 0.94 }, { rotation: 10, scale: 1.06, duration: DURATION, ease: 'none' }, 0)
  tl.fromTo('.bg-glow', { opacity: 0.4 }, { opacity: 1, duration: 4, ease: 'sine.inOut', repeat: 5, yoyo: true }, 0)

  /* ---------- 1. Logo sting (0 – 3.8s) ---------- */
  const logo = one('.logo-main')
  const scatter = [
    { x: -60, y: -40 },
    { x: 60, y: -40 },
    { x: 0, y: 70 },
  ]
  q('.ring-group', logo).forEach((g, i) => {
    tl.fromTo(g, { ...scatter[i], opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.6, ease: 'power3.out' }, 0.25 + i * 0.18)
  })
  tl.to(q('.ring', logo), { strokeDashoffset: 0, duration: 1.5, stagger: 0.18, ease: 'power2.inOut' }, 0.25)
  tl.fromTo(one('.lockup-wordmark', logo), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.1 }, 1.55)
  tl.to(logo, { scale: 0.9, y: -30, opacity: 0, duration: 0.55, ease: 'power3.in' }, 3.2)

  /* ---------- 2. Headline (3.6 – 7.7s) ---------- */
  const headline = q('#s-headline .line-inner')
  tl.fromTo(headline, { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.14 }, 3.75)
  tl.fromTo('#s-headline .accent', { textShadow: '0 0 0px rgba(0,194,168,0)' }, { textShadow: '0 0 40px rgba(0,194,168,0.75)', duration: 0.5, ease: 'power2.out' }, 4.6)
  tl.to('#s-headline .accent', { textShadow: '0 0 0px rgba(0,194,168,0)', duration: 1.2, ease: 'power2.inOut' }, 5.1)
  tl.fromTo('#s-headline .tag', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9 }, 4.7)
  tl.to(headline, { yPercent: -115, duration: 0.5, stagger: 0.06, ease: 'power3.in' }, 7.1)
  tl.to('#s-headline .tag', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 7.15)

  /* ---------- 3. Three pillars (7.5 – 13.6s) ---------- */
  tl.fromTo('#s-pillars .eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8 }, 7.6)
  tl.to(q('#s-pillars .eyebrow .ring'), { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: 'power2.inOut' }, 7.6)
  tl.fromTo('#s-pillars .title .line-inner', { yPercent: 115 }, { yPercent: 0, duration: 1 }, 7.75)
  q('#s-pillars .card').forEach((card, i) => {
    const at = 8.4 + i * 1.25
    tl.fromTo(card, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1 }, at)
    tl.fromTo(one('.card-accent', card), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.inOut' }, at + 0.15)
    tl.fromTo(q('li', card), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, at + 0.35)
  })
  tl.to(['#s-pillars .eyebrow', '#s-pillars .title', ...q('#s-pillars .card')], { opacity: 0, y: -40, duration: 0.5, stagger: 0.05, ease: 'power3.in' }, 13.0)

  /* ---------- 4. Independent (13.4 – 18.1s) ---------- */
  tl.fromTo('#s-independent .big .line-inner', { yPercent: 115 }, { yPercent: 0, duration: 1.2 }, 13.6)
  tl.fromTo('#s-independent .sub .line-inner', { yPercent: 115 }, { yPercent: 0, duration: 1 }, 14.3)
  tl.fromTo('#s-independent .rule', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 14.8)
  tl.fromTo(q('#s-independent .sectors li'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 15.2)
  tl.to('#s-independent', { opacity: 0, y: -30, duration: 0.5, ease: 'power3.in' }, 17.5)

  /* ---------- 5. Richard (17.9 – 22.2s) ---------- */
  tl.fromTo('#s-richard .portrait-cover', { scaleY: 1 }, { scaleY: 0, duration: 1.1, ease: 'expo.inOut' }, 18.05)
  tl.fromTo('#s-richard .portrait img', { scale: 1.18 }, { scale: 1, duration: 1.8 }, 18.05)
  tl.to(q('#s-richard .portrait-rings .ring'), { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: 'power2.inOut' }, 18.6)
  tl.fromTo('#s-richard .bio .eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8 }, 18.6)
  tl.to(q('#s-richard .bio .eyebrow .ring'), { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: 'power2.inOut' }, 18.6)
  tl.fromTo('#s-richard .name .line-inner', { yPercent: 115 }, { yPercent: 0, duration: 1.1 }, 18.8)
  tl.fromTo('#s-richard .role', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 19.25)
  tl.fromTo('#s-richard .bio-line', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 19.5)
  tl.to('#s-richard', { opacity: 0, scale: 0.98, duration: 0.5, ease: 'power3.in' }, 21.6)

  /* ---------- 6. Close (22 – 25s) ---------- */
  const close = one('.logo-close')
  q('.ring-group', close).forEach((g, i) => {
    tl.fromTo(g, { ...scatter[i], opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }, 22.1 + i * 0.12)
  })
  tl.to(q('.ring', close), { strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: 'power2.inOut' }, 22.1)
  tl.fromTo(one('.lockup-wordmark', close), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1 }, 22.9)
  tl.fromTo('#s-close .cta', { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 23.4)
  tl.fromTo('#s-close .url', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 23.7)
  tl.fromTo('#s-close .linkedin', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 23.9)

  // Pin the timeline to the full video length
  tl.set({}, {}, DURATION)

  window.__timelines = window.__timelines || {}
  window.__timelines.main = tl
  tl.seek(0)
})()
