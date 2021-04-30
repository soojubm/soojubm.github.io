import { throttle } from '../utils/optimizationUtils'
import { getElementWidth } from '../utils/elementUtils'

const tab = () => {
  const tab = document.querySelector('.js-tab')
  if(!tab) return

  const tablist = tab.querySelectorAll('[role=tab]')
  const tabPanels = tab.querySelectorAll('[role=tabpanel]')
  const indicatorElement = tab.querySelector<HTMLElement>('.profile-tablist-indicator')
  let selectedTab = tab.querySelector<HTMLElement>('[role=tab][aria-selected=true]')
  
  initializeIndicator(indicatorElement, selectedTab)

  tablist.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => {
      selectedTab = tab as HTMLElement
      initializeIndicator(indicatorElement, selectedTab)

      tablist.forEach((tab) => tab.setAttribute('aria-selected', 'false'))
      tab.setAttribute('aria-selected', 'true')

      tabPanels.forEach((tabPanel, tabPanelIndex) => {
        const isTargetPanel = tabIndex === tabPanelIndex
        tabPanel.setAttribute('aria-hidden', String(!isTargetPanel))
      })
    })
  })

  window.addEventListener('resize', () => throttle(initializeIndicator(indicatorElement, selectedTab)), true)

  function initializeIndicator(element, selectedTab) {
    element.style.left = `${selectedTab.offsetLeft}px`
    element.style.width = getElementWidth(selectedTab)
  }
}

export default tab


// if (tabIndex === tab.getAttribute('data-index')) {
//   tab.setAttribute('aria-selected', 'false')
// } else {
//   tab.setAttribute('aria-selected', 'true')
// }


// const { pathname, hash } = window.location
// history.pushState({ tabname: 'tester' }, 'name', `${target.name}`)

// const tabs2 = document.querySelectorAll<HTMLElement>('[role=tab]')
// if (!tab2) return

// tabs2.forEach(tab => {
//   tab.addEventListener('click', event => {
//     const tabIndex = tab.getAttribute('data-index')
//     const tabIndicator = tab?.parentNode?.querySelector<HTMLElement>('.profile-tablist-indicator')
//     if (tabIndicator) {}

//     tab.setAttribute('aria-selected', 'true')
//   })
// })
