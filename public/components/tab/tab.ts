import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tablistStyles } from '../tablist/tablist.styles'

@customElement('mm-tab')
class Tab extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) selected = 'false'
  @property({ type: String, attribute: 'data-index' }) dataIndex = ''

  static styles = [tablistStyles]

  private _onClick() {
    this.dispatchEvent(
      new CustomEvent('mm-tab-select', {
        bubbles: true,
        composed: true,
        detail: { dataIndex: this.dataIndex },
      }),
    )
  }

  render() {
    return html`
      <button
        role="tab"
        class="tab"
        data-index="${this.dataIndex}"
        aria-selected="${this.selected}"
        @click="${this._onClick}"
      >
        <slot></slot>
      </button>
    `
  }
}

export default Tab

// this.shadowRoot.appendChild(template.content);

// let tabs = [];
// let children = this.shadowRoot.children;

// for(let elem of children) {
//   if(elem.getAttribute('part')) {
//     tabs.push(elem);
//   }
// }

// tabs.forEach((tab) => {
//   tab.addEventListener('click', (e) => {
//     tabs.forEach((tab) => {
//       tab.part = 'tab';
//     })
//     e.target.part = 'tab active';
//   })

//   console.log(tab.part);
// })
