import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tablistStyles } from './tablist.styles'

@customElement('mm-tablist')
class Tablist extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) variant = ''

  static styles = [tablistStyles]

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('mm-tab-select', this._handleSelect as EventListener)
  }

  disconnectedCallback() {
    this.removeEventListener('mm-tab-select', this._handleSelect as EventListener)
    super.disconnectedCallback()
  }

  private _handleSelect = (event: CustomEvent<{ dataIndex: string }>) => {
    const { dataIndex } = event.detail
    const tabElements = this.querySelectorAll('mm-tab')
    const panels = this.parentElement?.querySelectorAll('mm-tabpanel')

    tabElements.forEach(tab => {
      tab.setAttribute('selected', tab.getAttribute('data-index') === dataIndex ? 'true' : 'false')
    })

    panels?.forEach(panel => {
      panel.setAttribute('aria-hidden', panel.getAttribute('data-index') === dataIndex ? 'false' : 'true')
    })
  }

  render() {
    return html`
      <nav role="tablist" class="tablist" data-variant="${this.variant}">
        <slot name="tab"></slot>
        <slot name="indicator"></slot>
      </nav>
    `
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
