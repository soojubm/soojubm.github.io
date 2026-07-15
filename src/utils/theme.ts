import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'

export type Theme = 'light' | 'dark' | 'brutal' | 'glass'

export const THEMES: { value: Theme; icon: IconName; label: string }[] = [
  { value: 'light', icon: ICON_NAMES.LIGHT_MODE, label: 'Day' },
  { value: 'dark', icon: ICON_NAMES.DARK_MODE, label: 'Night' },
  { value: 'brutal', icon: ICON_NAMES.THEME, label: 'Brutal' },
  { value: 'glass', icon: ICON_NAMES.THEME, label: 'Glass' },
]

const THEME_STORAGE_KEY = 'theme'
const DEFAULT_THEME: Theme = 'light'

function isTheme(value: string | null): value is Theme {
  return THEMES.some(theme => theme.value === value)
}

function getStoredTheme(): Theme | null {
  const theme = localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(theme) ? theme : null
}

// 시스템 설정(prefers-color-scheme)에 따른 다크모드는 일단 적용하지 않는다.
// function getSystemTheme(): Theme {
//   return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : DEFAULT_THEME
// }

export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? DEFAULT_THEME
}

export function applyTheme(theme = getPreferredTheme()) {
  document.body.dataset.theme = theme
  return theme
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  return applyTheme(theme)
}

export default applyTheme
