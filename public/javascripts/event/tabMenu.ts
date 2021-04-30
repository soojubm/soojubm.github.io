import { throttle } from '../utils/optimizationUtils'

const tabMenu = () => {
  const indicatorElement = document.querySelector<HTMLElement>('.profile-tablist-indicator')
  const firstTab = indicatorElement?.parentNode?.querySelector<HTMLElement>('[role=tab]')
  if (!indicatorElement || !firstTab) return
  
  let firstTabWidth = getComputedStyle(firstTab).width
  indicatorElement.style.width = firstTabWidth

  // window.addEventListener('load', () => initializeIndicator(tabIndicator, firstTabWidth))
  document.addEventListener('resize', () => throttle(initializeIndicator(indicatorElement, firstTabWidth)))
  document.addEventListener('click', event => {
    const { target }: any = event
    const tabs = target.parentNode.querySelectorAll('[role=tab]')
    const tabPanels = target.parentNode.parentNode.querySelectorAll('[role=tabpanel]')
    const tabIndex = target.getAttribute('data-index')

    if (!tabs) return

    if (target.closest('[role=tab]')) {
      indicatorElement.style.left = `${target.offsetLeft}px`
      indicatorElement.style.width = getComputedStyle(target).width

      tabs.forEach(tab => {
        tab.setAttribute('aria-selected', tabIndex === tab.getAttribute('data-index'))
        // if (tabIndex === tab.getAttribute('data-index')) {
        //   tab.setAttribute('aria-selected', 'false')
        // } else {
        //   tab.setAttribute('aria-selected', 'true')
        // }
      })


      tabPanels.forEach(element => {
        if (tabIndex === element.getAttribute('data-index')) {
          element.hidden = false
          element.setAttribute('aria-hidden', 'fales')
        } else {
          element.hidden = true
          element.setAttribute('aria-hidden', 'true')
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



// const { pathname, hash } = window.location
// history.pushState({ tabname: 'tester' }, 'name', `${target.name}`)

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
