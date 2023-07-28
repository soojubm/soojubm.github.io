import { makeStyleSheet } from './utils'

// <nav class="tablist" role="tablist">
// <button class="tablist-tab" role="tab" name="project" aria-selected="true" data-index="1">
//   <span class="tablist-tab-label">프로젝트</span>
// </button>
// <button class="tablist-tab" role="tab" name="case-study" aria-selected="false" data-index="2">
//   <span class="tablist-tab-label">두 번째 탭</span>
// </button>
// <button class="tablist-tab" role="tab" name="blank" aria-selected="false" data-index="3">
//   <span class="tablist-tab-label">빈 상태</span>
// </button>
// <button class="tablist-tab" role="tab" name="blank" aria-selected="false" data-index="3">
//   <span class="tablist-tab-label">네번쨰 탭</span>
// </button>
// <i class="tablist-indicator"></i>
// </nav>

// <button class="tablist-tab" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" tabindex="0">
// </button>
// <button class="tablist-tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">두번째 탭</button>
// <button class="tablist-tab" role="tab" aria-selected="false" aria-controls="panel-3" id="tab-3" tabindex="-1">세번째 탭</button>
// <i class="tablist-indicator"></i>

class Tablist extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('nav')
    container.classList.add('tablist')
    container.role = 'tablist'

    const tabIndicator = document.createElement('slot')
    tabIndicator.name = 'indicator'

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('tablist'))

    container.append(tabIndicator, ...this.childNodes)

    // console.log('tabs', document.querySelector('test-tablist').shadowRoot.querySelector('button'))
    this.querySelectorAll('[role=tab]').forEach(tab => {
      tab.addEventListener('click', event => {
        alert(event.target)
      })
    })

    // const parsedData = JSON.parse(`${this.data}`)
    // container.appendChild(
    //   parsedData.map(item => {
    //     return `
    //     <div>${item.label}</div>
    //   `
    //   }),
    // )
    // console.log(JSON.parse(`${this.data}`), 'tabs')
  }

  get data() {
    return this.dataset.tabs
  }

  // selected
  get value() {
    return this.getAttribute('value')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Tablist
