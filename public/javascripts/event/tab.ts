import { throttle } from '../utils/optimizationUtils'
import { getElementWidth } from '../utils/elementUtils'

// const parents = Array.from(grandparent.children)
// 업데이트 노트
// 탭에서만 사용하기 때문에 initializeTabIndicator 함수의 파라미터를 제거하고 이벤트 제거를 쉽게 만들었다.

function tab() {
  const tabElement = document.querySelector<HTMLElement>('.js-tab')
  if (!tabElement) return

  const tabs = tabElement.querySelectorAll('[role=tab]')
  const tabPanels = tabElement.querySelectorAll('[role=tabpanel]')
  let selectedTab = tabs[0] as HTMLElement

  initializeTabIndicator()

  tabs.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => {
      selectedTab = tab as HTMLElement

      initializeTabIndicator()

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

  // var tempEEE = throttle(initializeTabIndicator).bind(this)
  window.addEventListener('resize', throttle(initializeTabIndicator), true)
  // window.removeEventListener('resize', tempEEE, true)

  function initializeTabIndicator() {
    if (!tabElement) return

    const indicatorElement = tabElement.querySelector<HTMLElement>('.profile-tablist-indicator')
    if (!indicatorElement) return

    indicatorElement.style.left = `${selectedTab.offsetLeft}px`
    indicatorElement.style.width = getElementWidth(selectedTab)
  }
  // function initializeTabIndicator(element, selectedTab) {
  //   element.style.left = `${selectedTab.offsetLeft}px`
  //   element.style.width = getElementWidth(selectedTab)
  // }
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
