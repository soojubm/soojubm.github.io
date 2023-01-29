const OPENED_MENU_CLASSNAME = 'is-opened-menu'
const isOpendNavbarMenu = () => document.body.classList.contains(OPENED_MENU_CLASSNAME)

export function initializeNavbar() {
  const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')
  if (!document.body.classList.contains(OPENED_MENU_CLASSNAME)) return

  // toso aria
  navigationTrigger?.classList.remove('is-active')
  document.body.classList.remove(OPENED_MENU_CLASSNAME)
}

export function toggleNavbarMenu(event) {
  const trigger = (event.target as HTMLElement).closest('.js-navbar-toggle')
  if (!trigger) return

  const menuElement = trigger.nextElementSibling

  document.body.classList.toggle(OPENED_MENU_CLASSNAME, !isOpendNavbarMenu())

  trigger?.setAttribute('aria-expanded', String(isOpendNavbarMenu()))
  menuElement?.setAttribute('aria-hidden', String(!isOpendNavbarMenu()))

  const tabIndex = String(isOpendNavbarMenu() ? '0' : '-1')

  menuElement?.querySelectorAll('a').forEach(element => {
    element.setAttribute('tabindex', tabIndex)
  })

  function toggleAria(ariaType, force) {
    // Element.prototype
  }
  // document.addEventListener('mouseover', () => {
  //   document.removeEventListener('click', toggleNavbarMenu)
  // })
  // navbarMenu?.addEventListener('click', event => event.stopPropagation())
}
