// Writes index.html for one output format (landscape | square | vertical) from src/.
// HyperFrames expects a single root composition, so each render regenerates index.html.
//   node build.mjs square
import { readFileSync, writeFileSync } from 'node:fs'
import { FORMATS, render } from './src/template.mjs'

const format = process.argv[2] ?? 'landscape'
if (!FORMATS[format]) {
  console.error(`Unknown format "${format}". Use one of: ${Object.keys(FORMATS).join(', ')}`)
  process.exit(1)
}

const read = (f) => readFileSync(new URL(f, import.meta.url), 'utf8')
writeFileSync(new URL('index.html', import.meta.url), render(format, { css: read('src/styles.css'), js: read('src/timeline.js') }))
console.log(`wrote index.html (${format})`)
