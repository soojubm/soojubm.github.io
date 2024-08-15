import detectTheme from '../theme/dectectTheme'
import toggleDarkTheme from '../theme/toggleTheme'

import '/public/components/navbar/navbar.css'
import '/public/components/footer/footer.css'

const OPENED_MENU_CLASSNAME = 'is-opened-menu'
const isOpendNavbarMenu = () => document.body.classList.contains(OPENED_MENU_CLASSNAME)

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

document.addEventListener('click', toggleDarkTheme)
document.addEventListener('click', toggleNavbarMenu)

document.addEventListener('DOMContentLoaded', () => {
  // lazyLoading()
  detectTheme()

  // detectPage
  // document.querySelectorAll('.sidebar-menu a, .sidebar-menu mm-menuitem').forEach(item => {
  document.querySelectorAll('.sidebar-menu a').forEach(item => {
    const { pathname } = window.location
    // console.log(pathname, item.getAttribute('href'))
    if (pathname.includes(item.getAttribute('href') || '')) {
      item.setAttribute('aria-current', 'page')
    }

    // const a = document.querySelector('.sidebar-menu')

    // item.addEventListener('click', () => {
    //   localStorage.setItem('tttt', String(a?.scrollTop))
    // })

    // a?.scrollTo(0, Number(localStorage.getItem('tttt')))
  })

  function lazyLoading() {
    const lazyItems = [].slice.call(document.querySelectorAll('.footer'))
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.25,
    }
    let observer = new IntersectionObserver(callback, options)

    lazyItems.forEach(element => observer.observe(element))

    function callback(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        //  entry.target.src = image.dataset.src
        observer.unobserve(entry.target)

        fetchData()
      })
    }
    async function fetchData() {
      try {
        const URL =
          'https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json'

        const response = await fetch(URL)
        if (!response.ok) throw 'Something went wrong.'

        let data = await response.json()

        data.items.forEach(item => {
          const view = document.querySelector('body')
          if (!view) return

          const template = `<div style="height:120px;line-height:120px;background:var(--color-accent);text-align:center;">무한스크롤 ${item.name}</div>`
          view.insertAdjacentHTML('beforeend', template)
        })
      } catch (error) {}
    }
  }
  // document.addEventListener('scroll', lazyload)
  // window.addEventListener('resize', lazyload)
  // window.addEventListener('orientationChange', lazyload)
})
