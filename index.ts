import './src/javascripts/components'

import { initializeNavbar } from './src/javascripts/common/navbar'
import scrollAnimation from './src/javascripts/event/scrollAnimation'
import scrollspy from './src/javascripts/event/scrollspy'
import { stopAnimation } from './src/javascripts/utils/optimizationUtils'

const MOBILE_NAVBAR_QUERY = '(max-width: 1080px)'
const WINDOWS_FONT_FAMILY = "'Alan Sans', 'Pretendard', sans-serif"

document.addEventListener('DOMContentLoaded', initializePage)
stopAnimation()

function initializePage() {
  applyWindowsFont()
  updateDocumentTitle()
  initializeResponsiveNavbar()
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

function initializeResponsiveNavbar() {
  const mediaQuery = window.matchMedia(MOBILE_NAVBAR_QUERY)
  const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
    if (event.matches) initializeNavbar()
  }

  handleChange(mediaQuery)

  if ('addEventListener' in mediaQuery) {
    mediaQuery.addEventListener('change', handleChange)
    return
  }

  ;(
    mediaQuery as MediaQueryList & {
      addListener(listener: (event: MediaQueryListEvent) => void): void
    }
  ).addListener(handleChange)
}

function initializeScrollEffects() {
  scrollAnimation({ selector: '.js-observer' })
  scrollspy({ menusSelector: '.js-scrollspy-trigger', sectionsSelector: '.js-scrollspy-section' })
}
