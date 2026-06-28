import applyTheme from '@/utils/theme'

import '@/components/navbar/navbar.css'

const OPENED_MENU_CLASSNAME = 'is-menu-opened'
const isOpendNavbarMenu = () => document.body.classList.contains(OPENED_MENU_CLASSNAME)

document.addEventListener('click', toggleNavbarMenu)

document.addEventListener('DOMContentLoaded', () => {
  applyTheme()
})

export function hideNavbar() {
  document.body.classList.remove('is-menu-opened')
}

export function initializeNavbar() {
  const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')
  navigationTrigger?.setAttribute('aria-expanded', 'false')
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

  trigger.setAttribute('aria-expanded', String(isOpendNavbarMenu()))
  menuElement.setAttribute('aria-hidden', String(!isOpendNavbarMenu()))

  const tabIndex = String(isOpendNavbarMenu() ? '0' : '-1')

  menuElement.querySelectorAll('a').forEach(element => {
    element.setAttribute('tabindex', tabIndex)
  })

  function toggleAria(ariaType, force) {}
}
