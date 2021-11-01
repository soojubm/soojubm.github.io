// const isDarkTheme = window.matchMedia &&
//   window.matchMedia('(prefers-color-scheme: dark)').matches;

export const DARK_THEME_CLASS = 'theme-dark'
export const LIGHT_THEME_CLASS = 'theme-light'

function darkTheme(classname) {
  const darkThemeTrigger = document.querySelector(classname)
  if (!darkThemeTrigger) return

  // 3가지 body class, check attribute, local storage
  const isDarkTheme = () => document.body.classList.contains(DARK_THEME_CLASS)

  loadTheme()
  darkThemeTrigger.addEventListener('click', toggleDarkTheme)

  function toggleDarkTheme() {
    document.body.classList.toggle(DARK_THEME_CLASS)
    localStorage.setItem('theme', isDarkTheme() ? DARK_THEME_CLASS : LIGHT_THEME_CLASS)

    detectSwitch()
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) return

    document.body.classList.add(savedTheme)

    detectSwitch()
  }

  function detectSwitch() {
    const darkThemeSwitch = darkThemeTrigger?.querySelector('input')
    darkThemeSwitch.checked = isDarkTheme()
  }
}

// function usePrefersDarkMode() {
//   return useMedia(["(prefers-color-scheme: dark)"], [true], false);
// }

export default darkTheme

// function toggleTheme() {
//   // 저장된 값이 없다면 시스템 설정을 기준으로 함

//   const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
//   const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

//   // 최상위 엘리먼트에 설정, 로컬 스토리지에 설정을 저장
//   document.documentElement.setAttribute('data-theme', newTheme)
//   localStorage.setItem('theme', newTheme)
// }

// document.documentElement.classList.add('color-theme-in-transition')
// document.documentElement.setAttribute('data-theme', theme)

// window.setTimeout(function() {
//   document.documentElement.classList.remove('color-theme-in-transition')
// }, 1000)
