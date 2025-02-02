import { DARKTHEME_SELECTOR, DARK_THEME_CLASS, LIGHT_THEME_CLASS, isDarkTheme } from './const'
import detectTheme from './dectectTheme'

// todo removeLocalStorage
function toggleDarkTheme(event) {
  if (!event.target.closest(DARKTHEME_SELECTOR)) return

  const currentTheme = isDarkTheme() ? LIGHT_THEME_CLASS : DARK_THEME_CLASS
  localStorage.setItem('theme', currentTheme)

  detectTheme()
}

export default toggleDarkTheme
