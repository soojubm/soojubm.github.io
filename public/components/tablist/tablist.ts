import { makeStyleSheet } from '../../javascripts/components/utils'

class Tablist extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('nav')
    container.role = 'tablist'
    container.classList.add('tablist')
    container.dataset.variant = this.variant || ''

    const indicatorSlot = document.createElement('slot')
    indicatorSlot.name = 'indicator'

    const tabSlot = document.createElement('slot')
    tabSlot.name = 'tab'

    shadow.appendChild(container)
    container.append(tabSlot, indicatorSlot, makeStyleSheet('tablist'))
    // ...this.childNodes

    this.querySelectorAll('[slot=tab]').forEach(tab => {
      this.dataset.temp = 'test'
      container.dataset.temp = 'test'
      tab.addEventListener('click', event => {
        const eventTarget = event.target as HTMLElement

        const panels = this.parentNode?.querySelectorAll('[role=tabpanel')

        this.querySelectorAll('[slot=tab]').forEach(tab =>
          tab.setAttribute('aria-selected', 'false'),
        )
        eventTarget.setAttribute('aria-selected', 'true')

        panels?.forEach(panel => {
          panel.setAttribute('aria-hidden', 'true')
          if (panel.getAttribute('data-index') === eventTarget.getAttribute('data-index')) {
            // if (panel.getAttribute('data-index') === eventTarget.getAttribute('aria-controls')) {
            panel.setAttribute('aria-hidden', 'false')
          }
        })
      })
    })
  }

  changeTab(event) {
    // function initializeIndicator() {
    //   const indicatorElement = tabElement?.querySelector<HTMLElement>('.tablist-indicator')
    //   if (!indicatorElement) return
    //   indicatorElement.style.left = `${selectedTab.offsetLeft}px`
    //   indicatorElement.style.width = getElementWidth(selectedTab)
    // }
  }
  // selected
  get value() {
    return this.getAttribute('value')
  }
  get variant() {
    return this.getAttribute('variant')
  }
  static get observedAttributes() {
    return ['aria-selected']
  }
  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('tablist @@@@@', name, oldValue, newValue)
  }
}

export default Tablist

// const parsedData = JSON.parse(`${this.data}`)
// container.appendChild(
//   parsedData.map(item => {
//     return `
//     <div>${item.label}</div>
//   `
//   }),
// )
