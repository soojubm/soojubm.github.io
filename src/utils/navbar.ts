import applyTheme from '@/utils/theme'

import '@/components/navbar/navbar.css'

const OPENED_MENU_CLASSNAME = 'is-menu-opened'
const isOpendNavbarMenu = () => document.body.classList.contains(OPENED_MENU_CLASSNAME)

document.addEventListener('click', toggleNavbarMenu)

document.addEventListener('DOMContentLoaded', () => {
  applyTheme()
})

export function hideNavbar() {
  document.body.classList.remove(OPENED_MENU_CLASSNAME)
  syncNavbarMenu()
}

export function initializeNavbar() {
  document.body.classList.remove(OPENED_MENU_CLASSNAME)
  syncNavbarMenu()
}

function getControlledElement(trigger?: HTMLElement | null) {
  const controls = trigger?.getAttribute('aria-controls')
  return controls ? document.getElementById(controls) : null
}

export function toggleNavbarMenu(event) {
  const trigger = event.target.closest('.js-navbar-toggle')
  if (!trigger) return

  document.body.classList.toggle(OPENED_MENU_CLASSNAME, !isOpendNavbarMenu())
  syncNavbarMenu()
}

// 열림 상태를 트리거의 aria-expanded와 사이드바의 inert에 반영한다.
// 닫혔을 때 inert로 두면 화면 밖 메뉴 내부로 포커스가 들어가지 않는다.
function syncNavbarMenu() {
  const trigger = document.querySelector<HTMLElement>('.js-navbar-toggle')
  const open = isOpendNavbarMenu()

  trigger?.setAttribute('aria-expanded', String(open))

  const menuElement = getControlledElement(trigger)
  if (menuElement) menuElement.inert = !open
}
