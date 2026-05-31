import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, type Theme } from './const'

export function isTheme(value: string | null): value is Theme {
  return THEMES.some(theme => theme.value === value)
}

export function getStoredTheme(): Theme | null {
  const theme = localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(theme) ? theme : null
}

export function getSystemTheme(): Theme {
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
