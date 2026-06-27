import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'

export type Theme = 'light' | 'dark' | 'brutal'

export const THEMES: { value: Theme; icon: IconName; label: string }[] = [
  { value: 'light', icon: ICON_NAMES.LIGHT_MODE, label: 'Day' },
  { value: 'dark', icon: ICON_NAMES.DARK_MODE, label: 'Night' },
  { value: 'brutal', icon: ICON_NAMES.THEME, label: 'Brutal' },
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

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : DEFAULT_THEME
}

export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
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
