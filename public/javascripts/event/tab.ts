import { throttle } from '../utils/optimizationUtils'
import { getElementWidth } from '../utils/elementUtils'

// 탭에서만 사용하기 때문에 initializeTabIndicator 함수의 파라미터를 제거하고 이벤트 제거를 쉽게 만들었다.

function tab() {
  // console.log(tabElement)

  const tabElement = document.querySelector<HTMLElement>('.js-tab')
  if (!tabElement) return

  // document.querySelector('test-tablist').shadowRoot.querySelector('button')
  const tabs = tabElement.querySelectorAll('[role=tab]')
  const panels = tabElement.querySelectorAll('[role=tabpanel]')

  console.log(tabs, panels)

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

    console.log(selectedTab)

    tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'))
    selectedTab.setAttribute('aria-selected', 'true')

    // tabPanels.forEach(panel => panel.classList.toggle('is-active', selectedTab.name === panel.dataset.name))
    // aria-

    panels.forEach(panel => {
      const isSelected = String(selectedTab.getAttribute('aria-controls') === (panel as HTMLElement).getAttribute('id'))
      panel.setAttribute('aria-hidden', isSelected === 'true' ? 'false' : 'true')
    })
  }

  function initializeIndicator() {
    if (!tabElement) return

    const indicatorElement = tabElement.querySelector<HTMLElement>('.tablist-indicator')
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
//   const tabs = document.querySelectorAll('[role="tab"]');
//   const tabList = document.querySelector('[role="tablist"]');

//   // Add a click event handler to each tab
//   tabs.forEach((tab) => {
//     tab.addEventListener("click", changeTabs);
//   });

//   // Enable arrow navigation between tabs in the tab list
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

// function changeTabs(e) {
//   const target = e.target;
//   const parent = target.parentNode;
//   const grandparent = parent.parentNode;

//   // Remove all current selected tabs
//   parent
//     .querySelectorAll('[aria-selected="true"]')
//     .forEach((t) => t.setAttribute("aria-selected", false));

//   // Set this tab as selected
//   target.setAttribute("aria-selected", true);

//   // Hide all tab panels
//   grandparent
//     .querySelectorAll('[role="tabpanel"]')
//     .forEach((p) => p.setAttribute("hidden", true));

//   // Show the selected panel
//   grandparent.parentNode
//     .querySelector(`#${target.getAttribute("aria-controls")}`)
//     .removeAttribute("hidden");
// }
