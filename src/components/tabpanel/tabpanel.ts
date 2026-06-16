import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tabpanel')
class TabPanel extends LitElement {
  @property({ type: String, attribute: 'aria-hidden' }) ariaHidden = 'false'
  @property({ type: String, attribute: 'data-index' }) dataIndex = ''

  render() {
    return html`
      <section role="tabpanel" aria-hidden="${this.ariaHidden}" data-index="${this.dataIndex}">
        <slot></slot>
      </section>
    `
  }
}

export default TabPanel

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
