import './src/components'
import './src/utils/navbar'

import { stopAnimation } from './src/utils/optimization-utils'
import scrollAnimation from './src/utils/scroll-animation'

const WINDOWS_FONT_FAMILY = "'Alan Sans', 'Pretendard', sans-serif"

document.addEventListener('DOMContentLoaded', initializePage)
stopAnimation()

function initializePage() {
  applyWindowsFont()
  updateDocumentTitle()
  initializeScrollEffects()
}

function applyWindowsFont() {
  if (!/Windows/i.test(navigator.userAgent)) return

  document.documentElement.style.setProperty('--font-family', WINDOWS_FONT_FAMILY)
}

function updateDocumentTitle() {
  const path = window.location.pathname.substring(1)
  document.title = `이경수 ${path}`
}

function initializeScrollEffects() {
  scrollAnimation({ selector: '.js-observer' })
}
