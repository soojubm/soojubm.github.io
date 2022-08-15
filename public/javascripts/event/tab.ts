import { throttle } from '../utils/optimizationUtils'
import { getElementWidth } from '../utils/elementUtils'

// const parents = Array.from(grandparent.children)
// 탭에서만 사용하기 때문에 initializeTabIndicator 함수의 파라미터를 제거하고 이벤트 제거를 쉽게 만들었다.

function tab() {
  const tabElement = document.querySelector<HTMLElement>('.js-tab')
  if (!tabElement) return

  const tabs = tabElement.querySelectorAll('[role=tab]')
  const panels = tabElement.querySelectorAll('[role=tabpanel]')

  let selectedTabIndex = 0
  let selectedTab = tabs[selectedTabIndex] as HTMLElement

  initializeIndicator()

  tabs.forEach(tab => tab.addEventListener('click', changeTab))
  window.addEventListener('resize', throttle(initializeIndicator), true)

  // 파라미터로 인덱스를 받지 않는 방법.
  function changeTab(event) {
    selectedTab = event.target
    //   const target = e.target
    //   const parent = target.parentNode
    //   const grandparent = parent.parentNode
    initializeIndicator()

    tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'))
    selectedTab.setAttribute('aria-selected', 'true')

    panels.forEach(panel => panel.setAttribute('aria-hidden', String(event.target.dataset.index !== (panel as HTMLElement).dataset.index)))
  }

  function initializeIndicator() {
    if (!tabElement) return

    const indicatorElement = tabElement.querySelector<HTMLElement>('.profile-tablist-indicator')
    if (!indicatorElement) return

    indicatorElement.style.left = `${selectedTab.offsetLeft}px`
    indicatorElement.style.width = getElementWidth(selectedTab)
  }
}

export default tab

//   tab.setAttribute('aria-selected', tabIndex === tab.getAttribute('data-index'))

// const { pathname, hash } = window.location
// history.pushState({ tabname: 'tester' }, 'name', `${target.name}`)

//   // Enable arrow navigation between tabs in the tab list
//   let tabFocus = 0
//   tabList.addEventListener('keydown', e => {
//     // Move right
//     if (e.keyCode === 39 || e.keyCode === 37) {
//       tabs[tabFocus].setAttribute('tabindex', -1)
//       if (e.keyCode === 39) {
//         tabFocus++
//         // If we're at the end, go to the start
//         if (tabFocus >= tabs.length) {
//           tabFocus = 0
//         }
//         // Move left
//       } else if (e.keyCode === 37) {
//         tabFocus--
//         // If we're at the start, move to the end
//         if (tabFocus < 0) {
//           tabFocus = tabs.length - 1
//         }
//       }

//       tabs[tabFocus].setAttribute('tabindex', 0)
//       tabs[tabFocus].focus()
//     }
//   })
// })
