import { DARKTHEME_SELECTOR, DARK_THEME_CLASS, isDarkTheme } from './const'

// todo 바로 swithc 셀렉터로
// todo 같은 기능의 버튼이 여러 군데에 있을 때.

function detectTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (!savedTheme) return

  document.body.classList.add(DARK_THEME_CLASS)

  const darkThemeTriggers = document.querySelectorAll(DARKTHEME_SELECTOR)
  darkThemeTriggers?.forEach((element: any) => {
    element.querySelector('input').checked = true
  })
}

export default detectTheme
