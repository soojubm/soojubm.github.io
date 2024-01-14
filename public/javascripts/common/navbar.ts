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
  // navbarMenu?.addEventListener('click', event => event.stopPropagation())
}

// todo refactoring
document.addEventListener('click', toggleDarkTheme)

document.addEventListener('click', toggleNavbarMenu)

document.addEventListener('DOMContentLoaded', () => {
  lazyLoading()
  detectTheme()
  const pathname = window.location.pathname

  document.querySelectorAll('.sidebar-menu a').forEach(item => {
    let temp = 0
    if (pathname.includes(item.getAttribute('href') || '')) {
      item.setAttribute('aria-current', 'page')
    }

    const a = document.querySelector('.sidebar-menu')

    item.addEventListener('click', () => {
      localStorage.setItem('tttt', String(a?.scrollTop))
    })

    if (a) {
      // a.scrollTo(0, document.querySelector('[aria-current=page')?.clientTop || 0)
      a.scrollTo(0, Number(localStorage.getItem('tttt')))
    }
  })

  function lazyLoading() {
    const lazyBackgrounds = [].slice.call(document.querySelectorAll('.footer'))
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.25,
    }
    let observer = new IntersectionObserver(callback, options)

    lazyBackgrounds.forEach(element => observer.observe(element))

    function callback(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        //  var image = entry.target
        //  image.src = image.dataset.src
        //  image.classList.remove('lazy')
        //  imageObserver.unobserve(image)
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

          view.insertAdjacentHTML(
            'beforeend',
            `<div style="height:120px;line-height:120px;background:var(--color-accent);text-align:center;">무한스크롤 ${item.name}</div>`,
          )
        })
      } catch (error) {}
    }
  }

  // document.addEventListener('DOMContentLoaded', function() {
  // var lazyloadImages = document.querySelectorAll('.lazy')
  // var lazyloadThrottleTimeout

  // function lazyload() {
  //   if (lazyloadThrottleTimeout) clearTimeout(lazyloadThrottleTimeout)

  //   lazyloadThrottleTimeout = setTimeout(function() {
  //     var scrollTop = window.pageYOffset
  //     lazyloadImages.forEach(function(img) {
  //       if (img.offsetTop < window.innerHeight + scrollTop) {
  //         img.src = img.dataset.src
  //         img.classList.remove('lazy')
  //       }
  //     })
  //     if (lazyloadImages.length == 0) {
  //       document.removeEventListener('scroll', lazyload)
  //       window.removeEventListener('resize', lazyload)
  //       window.removeEventListener('orientationChange', lazyload)
  //     }
  //   }, 20)
  // }

  //     document.addEventListener('scroll', lazyload)
  //     window.addEventListener('resize', lazyload)
  //     window.addEventListener('orientationChange', lazyload)
  //   }
  // })
})
