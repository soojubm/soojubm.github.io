import './src/components'

import { applyLargeText } from './src/utils/large-text'
import { applyTheme } from './src/utils/theme'

const WINDOWS_FONT_FAMILY = "'Alan Sans', 'Pretendard', sans-serif"

document.addEventListener('DOMContentLoaded', initializePage)

function initializePage() {
  applyTheme()
  applyLargeText()
  applyWindowsFont()
  updateDocumentTitle()
}

function applyWindowsFont() {
  if (!/Windows/i.test(navigator.userAgent)) return

  document.documentElement.style.setProperty('--font-family', WINDOWS_FONT_FAMILY)
}

function updateDocumentTitle() {
  const path = window.location.pathname.substring(1)
  document.title = `이경수 ${path}`
}
