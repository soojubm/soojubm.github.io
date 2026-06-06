import { ICON_NAMES } from '../../components/icon-button/semantics/icon-names'

export type Theme = 'light' | 'dark' | 'brutal'

export const THEME_STORAGE_KEY = 'theme'

export const THEMES: { value: Theme; icon: string; label: string }[] = [
  { value: 'light', icon: ICON_NAMES.LIGHT_MODE, label: 'Day' },
  { value: 'dark', icon: ICON_NAMES.DARK_MODE, label: 'Night' },
  { value: 'brutal', icon: ICON_NAMES.THEME, label: 'Brutal' },
]

export const DEFAULT_THEME: Theme = 'light'
