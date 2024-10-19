import { makeStyleSheet } from '../../javascripts/components/utils'

class Tab extends HTMLElement {
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

    // TRACKING THE URL
    // connectedCallback() {
    //   if (window.location.hash.substr(1) === this.heading.id) {
    //     this.setAttribute('open', 'true')
    //     this.btn.focus()
    //   }
    // }
    // this.btn.onclick = () => {
    //   let open = this.getAttribute('open') === 'true' || false
    //   this.setAttribute('open', open ? 'false' : 'true')

    //   if (this.heading.id && !open) {
    //     history.pushState(null, null, '#' + this.heading.id)
    //   }
    // }

    // attributeChangedCallback(name) {
    //   if (name === 'open') {
    //     this.switchState()
    //   }
    // }
    // this.switchState = () => {
    //   let expanded = this.getAttribute('open') === 'true' || false
    //   this.btn.setAttribute('aria-expanded', expanded)
    //   this.shadowRoot.querySelector('.content').hidden = !expanded
    // }

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
