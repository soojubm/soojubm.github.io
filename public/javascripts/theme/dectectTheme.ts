import { DARKTHEME_SELECTOR, DARK_THEME_CLASS } from './const'

function detectTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (!savedTheme) return

  if (savedTheme === DARK_THEME_CLASS) {
    document.body.dataset.theme = 'dark'
  }

  // 모든 인터페이스에 다크 테마용
  // todo 바로 swithc 셀렉터로
  const darkThemeTriggers = document.querySelectorAll(DARKTHEME_SELECTOR)
  darkThemeTriggers?.forEach((element: any) => {
    element.querySelector('input').checked = true
  })
}

export default detectTheme
