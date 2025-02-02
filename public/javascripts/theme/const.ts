export const DARK_THEME_CLASS = 'dark'
export const LIGHT_THEME_CLASS = ''
export const DARKTHEME_SELECTOR = '.js-darkmode'

const savedTheme = localStorage.getItem('theme')

export const isDarkTheme = () => localStorage.getItem('theme') === exports.DARK_THEME_CLASS

// export const isDarkTheme = () => savedTheme === DARK_THEME_CLASS

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
//   document.body.setAttribute('data-style', newTheme)
//   localStorage.setItem('theme', newTheme)
// }

// document.documentElement.classList.add('color-theme-in-transition')
// window.setTimeout(function() {
//   document.documentElement.classList.remove('color-theme-in-transition')
// }, 1000)
