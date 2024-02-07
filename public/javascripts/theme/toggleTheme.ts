import { DARKTHEME_SELECTOR, DARK_THEME_CLASS, LIGHT_THEME_CLASS, isDarkTheme } from './const'

// todo removeLocalStorage
function toggleDarkTheme(event) {
  if (!event.target.closest(DARKTHEME_SELECTOR)) return

  document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark'

  const darkThemeTriggers = document.querySelectorAll(DARKTHEME_SELECTOR)
  darkThemeTriggers?.forEach((element: any) => {
    // todo toggle과 switch 2종류..
    element.querySelector('input').checked = isDarkTheme()
  })

  // saveTheme
  localStorage.setItem('theme', isDarkTheme() ? DARK_THEME_CLASS : LIGHT_THEME_CLASS)
}

// function toggleTheme() {
//   document.body.classList.toggle(DARK_THEME_CLASS)

//   const currentTheme = isDarkTheme() ? DARK_THEME_CLASS : LIGHT_THEME_CLASS
//   localStorage.setItem('theme', currentTheme)

//   checkSwitch()
// }

export default toggleDarkTheme
