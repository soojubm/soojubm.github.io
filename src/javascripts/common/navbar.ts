import detectTheme from '../theme/dectectTheme'
import toggleDarkTheme from '../theme/toggleTheme'

import '/src/components/navbar/navbar.css'
import '/src/components/footer/footer.css'
import { BRUTAL_THEME_CLASS } from '../theme/const'

const OPENED_MENU_CLASSNAME = 'is-menu-opened'
const isOpendNavbarMenu = () => document.body.classList.contains(OPENED_MENU_CLASSNAME)

document.addEventListener('click', toggleDarkTheme)
document.addEventListener('click', toggleNavbarMenu)

document.addEventListener('click', event => {
  const target = event.target as HTMLElement
  if (target.closest('.js-brutalmode')) {
    // localStorage.setItem('theme', 'burutal')
    document.body.dataset.theme = 'brutal'
  }

  // const currentTheme = isDarkTheme() ? LIGHT_THEME_CLASS : DARK_THEME_CLASS

  // detectTheme()
})

document.addEventListener('DOMContentLoaded', () => {
  detectTheme()
})


export function hideNavbar() {
  document.body.classList.remove('is-menu-opened')
}

export function initializeNavbar() {
  const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')
  if (!document.body.classList.contains(OPENED_MENU_CLASSNAME)) return

  // todo aria
  navigationTrigger?.classList.remove('is-active')
  document.body.classList.remove(OPENED_MENU_CLASSNAME)
}

export function toggleNavbarMenu(event) {
  const trigger = event.target.closest('.js-navbar-toggle')
  if (!trigger) return

  const menuElement = trigger.nextElementSibling

  document.body.classList.toggle(OPENED_MENU_CLASSNAME, !isOpendNavbarMenu())

  trigger.setAttribute('aria-expanded', String(isOpendNavbarMenu()))
  menuElement.setAttribute('aria-hidden', String(!isOpendNavbarMenu()))

  const tabIndex = String(isOpendNavbarMenu() ? '0' : '-1')

  menuElement.querySelectorAll('a').forEach(element => {
    element.setAttribute('tabindex', tabIndex)
  })

  function toggleAria(ariaType, force) {}
}

