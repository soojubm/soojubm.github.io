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

    const tabSlot = document.createElement('slot')
    tabSlot.name = 'tab'

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('tablist'))

    container.append(tabSlot, tabIndicator)

    // console.log('tabs', document.querySelector('test-tablist').shadowRoot.querySelector('button'))
    this.querySelectorAll('[slot=tab]').forEach(tab => {
      tab.addEventListener('click', event => {
        this.changeTab(event)
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
  }

  changeTab(event) {
    const eventTarget = event.target
    //   const parent = target.parentNode
    //   const grandparent = parent.parentNode
    // initializeIndicator()

    // TODO
    // this.querySelectorAll('[slot=tab]').forEach(tab => tab.setAttribute('aria-selected', 'false'))
    // eventTarget.setAttribute('aria-selected', 'true')

    // this.querySelectorAll('[slot=tab]').forEach(tab => {
    //   tab.shadowRoot!.querySelector('button')!.setAttribute('aria-selected', 'false')
    // })
    // eventTarget.shadowRoot!.querySelector('button')!.setAttribute('aria-selected', 'true')

    // tabPanels.forEach(panel => panel.classList.toggle('is-active', selectedTab.name === panel.dataset.name))
    // panels.forEach(panel => panel.setAttribute('aria-hidden', String(selectedTab.dataset.index !== (panel as HTMLElement).dataset.index)))
  }
  // selected
  get value() {
    return this.getAttribute('value')
  }
  static get observedAttributes() {
    return ['aria-selected']
  }
  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('@@@@@', name, oldValue, newValue)
  }
}

export default Tablist
