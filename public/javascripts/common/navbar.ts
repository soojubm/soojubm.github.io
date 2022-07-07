import { unlockBodyElement } from '../load'

const OPENED_MENU_CLASSNAME = 'is-opened-menu'
const isOpendNavbarMenu = () => document.body.classList.contains(OPENED_MENU_CLASSNAME)

export function initializeNavbar() {
  const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')

  navigationTrigger?.classList.remove('is-active')
  // unlockBodyElement()
  // todo
  document.body.classList.remove('is-opened-menu')

  // document.removeEventListener('click', () => {})
}

export function toggleNavbarMenu(event) {
  const navbarBurgerElement = (event.target as HTMLElement).closest('.js-navbar-toggle')
  if (!navbarBurgerElement) return

  document.body.classList.toggle(OPENED_MENU_CLASSNAME, !isOpendNavbarMenu())
  // document.addEventListener('mouseover', () => {
  //   document.removeEventListener('click', toggleNavbarMenu)
  // })
  // const navbarMenu = navbarBurgerElement?.nextElementSibling
  // navbarMenu?.addEventListener('click', event => event.stopPropagation())
}
