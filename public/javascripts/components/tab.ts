import { makeStyleSheet } from './utils'

class Tab extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('button')
    container.classList.add('tab')
    container.role = 'tab'
    // this.role = 'tab'
    // TODO role 어디에

    const label = document.createElement('span')
    label.classList.add('tab-label')

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('tablist'))

    container.setAttribute('aria-selected', this.selected || 'false')
    container.append(...this.childNodes)

    this.querySelector('button')!.addEventListener('click', () => {})

    // const b = this.querySelector('[slot="trigger"]');

    // if (b) b.addEventListener('click', () => {
    //   if (p.style.display === 'none') {
    //     p.style.display = 'block';
    //   } else {
    //     p.style.display = 'none';
    //   }
    // });

    //     declarative: The component only requires a clear trigger; the script manages everything under the hood.

    // composable: you can use it within or with any other component.

    // reusable: you can use it anywhere you need to toggle something into view.

    // extensible: I could do some more work to make it more extensible, but with the trigger event alone, we can react to the internal state.

    // interoperable: works on most modern browsers, and for the cases where it doesn't, the user can still read the information.

    // accessible: I could make more efforts on this subject, but this article isn't about accessibility.
    // if (b.hasAttribute('data-active')) {
    //   b.removeAttribute('data-active');
    //   b.dispatchEvent(new CustomEvent('tigger'));
    //   p.style.display = 'none';
    // } else {
    //   b.setAttribute('data-active', '');
    //   p.style.display = 'block';
    // }
  }

  get value() {
    return this.getAttribute('value')
  }

  get selected() {
    return this.getAttribute('selected')
  }
  connectedCallback() {}
  disconnectedCallback() {}
}

export default Tab
