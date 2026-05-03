import { DARKTHEME_SELECTOR, DARK_THEME_CLASS, LIGHT_THEME_CLASS, isDarkTheme } from './const'

function detectTheme() {
  // const savedTheme = localStorage.getItem('theme')
  // if (!savedTheme) return

  document.body.dataset.theme = isDarkTheme() ? DARK_THEME_CLASS : LIGHT_THEME_CLASS

  // TODO switch & toggle
  const themeTriggers = document.querySelectorAll(DARKTHEME_SELECTOR)
  themeTriggers?.forEach((element: HTMLElement | any) => {
    window.addEventListener('DOMContentLoaded', () => {
      const checkboxElement = element.shadowRoot
        ?.querySelector('slot[name=action]')
        .assignedNodes()[0]
        .shadowRoot?.querySelector('input')

      if (!checkboxElement) return

      // console.log(checkboxElement, isDarkTheme(), checkboxElement.checked)

      // switch
      checkboxElement.addEventListener('change', () => {
        const currentTheme = isDarkTheme() ? LIGHT_THEME_CLASS : DARK_THEME_CLASS
        localStorage.setItem('theme', currentTheme)

        document.body.dataset.theme = isDarkTheme() ? DARK_THEME_CLASS : LIGHT_THEME_CLASS
      })

      if (isDarkTheme()) {
        checkboxElement.setAttribute('checked', true)
      } else {
        checkboxElement.removeAttribute('checked')
      }
    })
  })
}

export default detectTheme
