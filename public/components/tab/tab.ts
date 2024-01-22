import { makeStyleSheet } from '../../javascripts/components/utils'

class Tab extends HTMLElement {
  static observedAttributes = ['aria-selected']

  // TODO : constructo가 아닌 connectedCallback에서 사용하면, 스타일을 못 받아옴
  // observed

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('button')
    container.role = 'tab'
    container.classList.add('tab')
    container.ariaSelected = this.selected || 'false'

    const label = document.createElement('span')
    label.classList.add('tab-label')

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('tablist'))

    // declarative: The component only requires a clear trigger; the script manages everything under the hood.
    // composable: you can use it within or with any other component.
    // reusable: you can use it anywhere you need to toggle something into view.
    // extensible: I could do some more work to make it more extensible, but with the trigger event alone, we can react to the internal state.
    // interoperable: works on most modern browsers, and for the cases where it doesn't, the user can still read the information.
    // accessible: I could make more efforts on this subject, but this article isn't about accessibility.
  }

  get value() {
    return this.getAttribute('value')
  }

  get selected() {
    return this.getAttribute('selected')
  }

  connectedCallback() {}

  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot?.querySelector('button')?.setAttribute('aria-selected', newValue || 'false')
  }
}

export default Tab

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
