import Chip from './chip'

import Tag from './tag'
import Badge from './badge'

import Avatar from './avatar'
import Tile from './tile'
import Textfield from './input'

import Checkbox from './checkbox'
import Switch from './switch'
import Radio from './Radio'

import Button from './button'
import Row from './row'
import Text from './text'

import Tablist from './tablist'
import Callout from './callout'

import MenuItem from './menuitem'

import Dialog from './dialog'

import Tooltip from './tooltip'

export function defineCustomElement() {
  if ('customElements' in window) {
    customElements.define('test-button', Button)
    customElements.define('test-chip', Chip)

    customElements.define('test-tag', Tag)
    customElements.define('test-badge', Badge)

    customElements.define('test-avatar', Avatar)
    customElements.define('test-textfield', Textfield)

    customElements.define('test-checkbox', Checkbox)
    customElements.define('test-switch', Switch)
    customElements.define('test-radio', Radio)

    customElements.define('test-tile', Tile)
    customElements.define('test-row', Row)
    customElements.define('test-text', Text)

    customElements.define('test-tablist', Tablist)

    customElements.define('test-callout', Callout)

    customElements.define('test-menu-item', MenuItem)

    customElements.define('test-dialog', Dialog)

    customElements.define('test-tooltip', Tooltip)

    // customElements.define('close-button', CloseButton)
  }
}

// <script>
// const text = document.createTextNode(`${Math.random()}`);
// document.querySelector('x-component').appendChild(text);

// setInterval(() => {
//   // update text node (no slotchange update)
//   text.data = `${Math.random()}`;

//   // update text content (triggers slotchange update)
//   document.querySelector('x-component').textContent = `${Math.random()}`;

//   // change the DOM structure (triggers slotchange update)
//   document.querySelector('x-component').innerHTML = `<span>${Math.random()}</span>`;
// }, 1000);
// </script>

// <script>
// setInterval(() => {
//   // update text content
//   document.querySelector('x-component').textContent = `${Math.random()}`;

//   // change the DOM structure
//   document.querySelector('x-component').innerHTML = `<span>${Math.random()}</span>`;
// }, 1000);

// 이벤트가 발생하지 않음
// const text = document.createTextNode(`${Math.random()}`);
// document.querySelector('x-component').appendChild(text);
// </script>

// const template = document.createElement('template')
// template.innerHTML = `
// <div class="inner-template">
//   <slot></slot>
// </div>`

// class XComponent extends HTMLElement {
//   constructor() {
//     super()
//     this.attachShadow({ mode: 'open' })
//     this.shadowRoot.appendChild(template.content.cloneNode(true))

//     this.shadowRoot.addEventListener('slotchange', event => console.log(event))
//   }
// }

// customElements.define('x-component', XComponent)
