import { navbarStyles } from '@/components/navbar/navbar.styles'
import applyTheme from '@/utils/theme'

const styleElement = document.createElement('style')
styleElement.textContent = navbarStyles.cssText
document.head.appendChild(styleElement)

document.addEventListener('DOMContentLoaded', () => {
  applyTheme()
})
