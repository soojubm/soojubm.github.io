import { DARKTHEME_SELECTOR, DARK_THEME_CLASS, LIGHT_THEME_CLASS, isDarkTheme } from './const'

// todo removeLocalStorage
function toggleDarkTheme(event) {
  if (!event.target.closest(DARKTHEME_SELECTOR)) return

  document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark'

  localStorage.setItem('theme', isDarkTheme() ? DARK_THEME_CLASS : LIGHT_THEME_CLASS)

  const darkThemeTriggers = document.querySelectorAll(DARKTHEME_SELECTOR)
  darkThemeTriggers?.forEach((element: any) => {
    // TODO 트기거가 스위치인 경우에만.
    if (element.querySelector('[type=checkbox]')) {
      element.querySelector('[type=checkbox]').checked = isDarkTheme()
    }
  })

  // saveTheme
}

// function toggleTheme() {
//   document.body.classList.toggle(DARK_THEME_CLASS)

//   const currentTheme = isDarkTheme() ? DARK_THEME_CLASS : LIGHT_THEME_CLASS
//   localStorage.setItem('theme', currentTheme)

//   checkSwitch()
// }

export default toggleDarkTheme
