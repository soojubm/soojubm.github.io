import { sidebarContentShiftStyles } from '@/components/layouts/app-sidebar/sidebar.styles'

const styleElement = document.createElement('style')
styleElement.textContent = sidebarContentShiftStyles.cssText
document.head.appendChild(styleElement)
