export const DARK_THEME_CLASS = 'theme-dark'
export const LIGHT_THEME_CLASS = 'theme-light'

function darkTheme() {
  const darkThemeTrigger = document.querySelector('.js-darkmode')
  const darkThemeSwitch = darkThemeTrigger?.querySelector('input')
  if(!darkThemeTrigger || !darkThemeSwitch ) return

  loadTheme(darkThemeSwitch)

  darkThemeTrigger.addEventListener('click', () => toggleDarkTheme(darkThemeSwitch), false)

  function toggleDarkTheme(darkThemeSwitch) {
    document.body.classList.toggle(DARK_THEME_CLASS)
    
    const isDarkmode = document.body.classList.contains(DARK_THEME_CLASS)
    darkThemeSwitch.checked = isDarkmode

    localStorage.setItem('theme', isDarkmode ? DARK_THEME_CLASS : LIGHT_THEME_CLASS)
  }

  function loadTheme(darkThemeSwitch) {
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) return

    document.body.classList.add(savedTheme)
    darkThemeSwitch.checked = savedTheme === DARK_THEME_CLASS
  }
}



// function darkTheme() {
//   const darkmodeButton = document.querySelector('.js-darkmode')
//   if(!darkmodeButton) return

//   const DARK_CLASS = 'theme-dark'
//   const isDarkmode = document.body.classList.contains(DARK_CLASS)

//   darkmodeButton.addEventListener('click', setTheme, false)

//   loadTheme()

//   function setTheme() {
//     document.body.classList.toggle(DARK_CLASS)

//     darkmodeButton!.querySelector('input')!.checked = isDarkmode

//     if (isDarkmode) {
//       saveTheme(DARK_CLASS)
//     } else {
//       clearTheme()
//     }

//   }
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


