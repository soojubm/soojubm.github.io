export type Theme = 'light' | 'dark' | 'brutal'

export const THEME_STORAGE_KEY = 'theme'

export const THEMES: { value: Theme; icon: string; label: string }[] = [
  { value: 'light', icon: 'sun-light', label: 'Day' },
  { value: 'dark', icon: 'half-moon', label: 'Night' },
  { value: 'brutal', icon: 'color-filter', label: 'Brutal' },
]

export const DEFAULT_THEME: Theme = 'light'
