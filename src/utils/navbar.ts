import applyTheme from './theme'

import '../components/navbar/navbar.css'
import '../components/footer/footer.css'

const OPENED_MENU_CLASSNAME = 'is-menu-opened'
const isOpendNavbarMenu = () => document.body.classList.contains(OPENED_MENU_CLASSNAME)

document.addEventListener('click', toggleNavbarMenu)
document.addEventListener('click', toggleNavbarUserMenu)

document.addEventListener('DOMContentLoaded', () => {
  applyTheme()
})

export function hideNavbar() {
  document.body.classList.remove('is-menu-opened')
}

export function initializeNavbar() {
  const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')
  navigationTrigger?.removeAttribute('expanded')
  const menuElement = getControlledElement(navigationTrigger)
  menuElement?.setAttribute('aria-hidden', 'true')
  document.body.classList.remove(OPENED_MENU_CLASSNAME)
}

function getControlledElement(trigger?: HTMLElement | null) {
  const controls = trigger?.getAttribute('aria-controls')
  return controls ? document.getElementById(controls) : null
}

export function toggleNavbarMenu(event) {
  const trigger = event.target.closest('.js-navbar-toggle')
  if (!trigger) return

  const menuElement = getControlledElement(trigger)
  if (!menuElement) return

  document.body.classList.toggle(OPENED_MENU_CLASSNAME, !isOpendNavbarMenu())

  trigger.toggleAttribute('expanded', isOpendNavbarMenu())
  menuElement.setAttribute('aria-hidden', String(!isOpendNavbarMenu()))

  const tabIndex = String(isOpendNavbarMenu() ? '0' : '-1')

  menuElement.querySelectorAll('a').forEach(element => {
    element.setAttribute('tabindex', tabIndex)
  })

  function toggleAria(ariaType, force) {}
}

export function toggleNavbarUserMenu(event) {
  const trigger = event.target.closest('.js-navbar-user-trigger')
  const openedTrigger = document.querySelector<HTMLElement>('.js-navbar-user-trigger.is-active')

  if (!trigger) {
    closeNavbarUserMenu(openedTrigger)
    return
  }

  event.preventDefault()
  const isOpen = trigger.classList.contains('is-active')

  closeNavbarUserMenu(openedTrigger)

  if (isOpen) return

  const menuElement = trigger.nextElementSibling as HTMLElement | null
  trigger.classList.add('is-active')
  trigger.setAttribute('aria-expanded', 'true')
  if (menuElement) menuElement.hidden = false
}

function closeNavbarUserMenu(trigger?: HTMLElement | null) {
  if (!trigger) return

  const menuElement = trigger.nextElementSibling as HTMLElement | null
  trigger.classList.remove('is-active')
  trigger.setAttribute('aria-expanded', 'false')
  if (menuElement) menuElement.hidden = true
}
