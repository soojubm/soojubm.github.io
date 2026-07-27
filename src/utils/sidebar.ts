import { sidebarContentShiftStyles } from '@/components/domains/app-sidebar/sidebar.styles'

const styleElement = document.createElement('style')
styleElement.textContent = sidebarContentShiftStyles.cssText
document.head.appendChild(styleElement)
