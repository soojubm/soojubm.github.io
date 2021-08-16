import { throttle } from '../utils/optimizationUtils'
import { getElementWidth } from '../utils/elementUtils'

const tab = () => {
  const tabElement = document.querySelector('.js-tab')
  // const parents = Array.from(grandparent.children)
  if (!tabElement) return

  const tabs = tabElement.querySelectorAll('[role=tab]')
  const tabPanels = tabElement.querySelectorAll('[role=tabpanel]')
  const indicatorElement = tabElement.querySelector('.profile-tablist-indicator')
  let selectedTab = tabs[0] as HTMLElement

  initializeIndicator(indicatorElement, selectedTab)

  tabs.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => {
      selectedTab = tab as HTMLElement
      // selectedTab = tab.getAttribute('aria-selected') === true

      initializeIndicator(indicatorElement, selectedTab)

      // selectTab
      tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'))
      tab.setAttribute('aria-selected', 'true')

      // selectTabPanel
      tabPanels.forEach((tabPanel, tabPanelIndex) => {
        const isSelectedPanel = tabIndex === tabPanelIndex
        tabPanel.setAttribute('aria-hidden', String(!isSelectedPanel))
      })
    })
  })

  // todo 이벤트 제거 해야 함.
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

// tabs2.forEach(tab => {
//   tab.addEventListener('click', event => {
//     const tabIndex = tab.getAttribute('data-index')
//     const tabIndicator = tab?.parentNode?.querySelector<HTMLElement>('.profile-tablist-indicator')
//     if (tabIndicator) {}

//     tab.setAttribute('aria-selected', 'true')
//   })
// })
