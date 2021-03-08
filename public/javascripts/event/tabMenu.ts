import { throttle } from '../utils/interfaceUtils'

const tabMenu = () => {
  // todo resize throttle
  const tabIndicator = document.querySelector<HTMLElement>('.profile-tablist-indicator')
  const firstTab = tabIndicator?.parentNode?.querySelector<HTMLElement>('[role=tab]')
  if (!tabIndicator || !firstTab) return
  
  const firstTabWidth = getComputedStyle(firstTab).width
  tabIndicator.style.width = firstTabWidth

  // window.addEventListener('load', () => initializeIndicator(tabIndicator, firstTabWidth))
  document.addEventListener('resize', () => throttle(initializeIndicator(tabIndicator, firstTabWidth)))
  document.addEventListener('click', event => {
    const { target }: any = event
    const tabs = target.parentNode.querySelectorAll('[role=tab]')
    const tabPanels = target.parentNode.parentNode.querySelectorAll('[role=tabpanel]')
    const tabIndex = target.getAttribute('data-index')

    if (!tabs) return

    if (target.closest('[role=tab]')) {
      tabIndicator.style.left = `${target.offsetLeft}px`
      tabIndicator.style.width = getComputedStyle(target).width

      tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'))
      target.setAttribute('aria-selected', 'true')

      // const { pathname, hash } = window.location
      // history.pushState({ tabname: 'tester' }, 'name', `${target.name}`)

      tabPanels.forEach(element => {
        element.classList.add('hidden')
        element.setAttribute('aria-hidden', 'true')

        if (tabIndex === element.getAttribute('data-index')) {
          element.classList.remove('hidden')
          element.setAttribute('aria-hidden', 'hidden')
        }
      })
    }
  }, true)

  function initializeIndicator(tabIndicator, firstTabWidth) {
    setTimeout(() => {
      tabIndicator.style.width = firstTabWidth
    }, 100)
  }
}

export default tabMenu

// const tabs2 = document.querySelectorAll<HTMLElement>('[role=tab]')
// if (!tab2) return

// tabs2.forEach(tab => {
//   tab.addEventListener('click', event => {
//     const tabIndex = tab.getAttribute('data-index')
//     const tabIndicator = tab?.parentNode?.querySelector<HTMLElement>('.profile-tablist-indicator')
//     if (tabIndicator) {
//       tabIndicator.style.left = `${tab.offsetLeft}px`
//       tabIndicator.style.width = getComputedStyle(tab).width
//     }

//     tab.setAttribute('aria-selected', 'true')
//   })
// })
