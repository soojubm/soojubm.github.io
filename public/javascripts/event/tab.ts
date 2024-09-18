import { throttle } from '../utils/optimizationUtils'
import { getElementWidth } from '../utils/elementUtils'

// 탭에서만 사용하기 때문에 initializeTabIndicator 함수의 파라미터를 제거하고 이벤트 제거를 쉽게 만들었다.

function tab() {
  // console.log(tabElement)
  const tabElement = document.querySelector<HTMLElement>('.js-tab')
  if (!tabElement) return

  // document.querySelector('mm-tablist').shadowRoot.querySelector('button')
  const tabs = tabElement.querySelectorAll('[role=tab]')
  const panels = tabElement.querySelectorAll('[role=tabpanel]')

  let selectedTabIndex = 0
  let selectedTab = tabs[selectedTabIndex] as HTMLElement

  initializeIndicator()

  tabs.forEach(tab => tab.addEventListener('click', handleTabClick))
  window.addEventListener('resize', throttle(initializeIndicator), true)

  // 파라미터로 인덱스를 받지 않는 방법.
  function handleTabClick(event) {
    selectedTab = event.target
    initializeIndicator()

    tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'))
    selectedTab.setAttribute('aria-selected', 'true')
    // event.currentTarget

    // const tabPanel = tabs.querySelector(`[aria-labelledby="${event.currentTarget.id}"]`);

    panels.forEach(panel => {
      const isSelected = selectedTab.getAttribute('aria-controls') === panel.getAttribute('id')
      panel.setAttribute('aria-hidden', String(!isSelected))
    })
  }

  function initializeIndicator() {
    const indicatorElement = tabElement?.querySelector<HTMLElement>('.tablist-indicator')
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

// window.addEventListener("DOMContentLoaded", () => {
//   let tabFocus = 0;

//   tabList.addEventListener("keydown", (e) => {
//     // Move right
//     if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
//       tabs[tabFocus].setAttribute("tabindex", -1);
//       if (e.key === "ArrowRight") {
//         tabFocus++;
//         // If we're at the end, go to the start
//         if (tabFocus >= tabs.length) {
//           tabFocus = 0;
//         }
//         // Move left
//       } else if (e.key === "ArrowLeft") {
//         tabFocus--;
//         // If we're at the start, move to the end
//         if (tabFocus < 0) {
//           tabFocus = tabs.length - 1;
//         }
//       }

//       tabs[tabFocus].setAttribute("tabindex", 0);
//       tabs[tabFocus].focus();
//     }
//   });
// });
