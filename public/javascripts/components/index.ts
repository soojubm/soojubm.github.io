import Chip from '../../components/chip/chip'

import Tag from '../../components/tag/tag'
import Badge from '../../components/badge/badge'

import Avatar from '../../components/avatar/avatar'
import Entity from '../../components/entity/entity'
import AvatarGroup from './avatarGroup'

import Tile from '../../components/tile/tile'
import Textfield from '../../components/textfield/textfield'

import Checkbox from '../../components/checkbox/checkbox'
import Switch from '../../components/switch/switch'
import Radio from '../../components/radio/radio'

import Button from '../../components/button/button'
import Link from '../../components/link/link'
import Row from '../../components/group/group'
import Text from '../../components/text/text'

import Tablist from '../../components/tablist/tablist'
import Tab from '../../components/tab/tab'
import Callout from '../../components/callout/callout'

import MenuItem from '../../components/menuitem/menuitem'

import Dialog from './dialog'

import Tooltip from '../../components/tooltip/tooltip'
import TitleBar from '../../components/titlebar/titlebar'
import RadioGroup from './radioGroup'
import Icon from '../../components/icon/icon'
import Separator from '../../components/separator/separator'
import Card from '../../components/card/card'
import Result from '../../components/result/result'

// class extends HTMLElement {
//   static get observedAttributes() {
//     return ['value']
//   }
// }

export function defineCustomElement() {
  if ('customElements' in window) {
    customElements.define('test-icon', Icon)
    customElements.define('test-button', Button)
    customElements.define('test-link', Link)
    customElements.define('test-chip', Chip)

    customElements.define('test-tag', Tag)
    customElements.define('test-badge', Badge)

    customElements.define('test-avatar', Avatar)
    customElements.define('test-entity', Entity)

    customElements.define('test-result', Result)

    customElements.define('test-textfield', Textfield)

    customElements.define('test-checkbox', Checkbox)
    customElements.define('test-switch', Switch)
    customElements.define('test-radio', Radio)

    customElements.define('test-tile', Tile)
    customElements.define('test-card', Card)
    customElements.define('test-titlebar', TitleBar)
    customElements.define('test-group', Row)
    customElements.define('test-text', Text)

    customElements.define('test-tablist', Tablist)
    customElements.define('test-tab', Tab)

    customElements.define('test-callout', Callout)

    customElements.define('test-menuitem', MenuItem)

    customElements.define('test-avatar-group', AvatarGroup)
    customElements.define('test-radio-group', RadioGroup)

    customElements.define('test-dialog', Dialog)

    customElements.define('test-tooltip', Tooltip)

    customElements.define('test-separator', Separator)

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
