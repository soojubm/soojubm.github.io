import { makeStyleSheet } from '../../javascripts/components/utils'

class TabPanel extends HTMLElement {
  static observedAttributes = ['aria-hidden']

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('section')
    container.role = 'tabpanel'
    container.classList.add('tabpanel') // unstyled
    container.ariaHidden = this.ariaHidden || 'false'
    container.dataset.index = this.dataIndex || ''

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('tablist'))
  }

  get ariaHidden() {
    return this.getAttribute('aria-hidden')
  }

  get dataIndex() {
    return this.getAttribute('data-index')
  }

  connectedCallback() {
    // if (!this.hasAttribute('role')) this.setAttribute('role', 'checkbox')
    // if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', 0)
    // if (!this.getAttribute('greeting-name')) { this.setAttribute('greeting-name', 'world'); }
  }
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return

    // this.setAttribute('aria-hidden', newValue) // assign doesn't work
    this.shadowRoot?.querySelector('section')?.setAttribute(name, newValue)

    // if (name === 'checked') this.checked = newValue
    // switch (name) {
    //   case 'greeting-name':
    //     this.p.textContent = `Hello ${newVal || 'world'}!`
    //     break
    // }
  }
}

export default TabPanel

// static get observedAttributes() {
//   return ["color", "size"];
// }

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
