export const DARK_THEME_CLASS = 'theme-dark'
export const LIGHT_THEME_CLASS = ''
export const DARKTHEME_SELECTOR = '.js-darkmode'

// export const isDarkTheme = savedTheme === DARK_THEME_CLASS
export const isDarkTheme = () => document.body.classList.contains(DARK_THEME_CLASS)
// 3가지 body class, check attribute, local storage

// export const isDarkTheme = window.matchMedia &&
//   window.matchMedia('(prefers-color-scheme: dark)').matches;

// function usePrefersDarkMode() {
//   return useMedia(["(prefers-color-scheme: dark)"], [true], false);
// }

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
