import './style.css'
import typescriptLogo from './typescript.svg'

import $ from "../lib/main"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Web Analytics and Tracking</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Tracking and analytics for the web. Tracks mouse movement, clicks, and scrolls.
    </p>
  </div>
`

$("123", window, {});