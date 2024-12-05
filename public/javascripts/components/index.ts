import Tag from '../../components/tag/tag'

import Avatar from '../../components/avatar/avatar'
import Entity from '../../components/entity/entity'

import Tile from '../../components/tile/tile'
import Textfield from '../../components/textfield/textfield'

import Checkbox from '../../components/checkbox/checkbox'
import Switch from '../../components/switch/switch'
import Radio from '../../components/radio/radio'

import Button from '../../components/button/button'
import Link from '../../components/link/link'
import Text from '../../components/text/text'

import Group from '../../components/group/group'
import Row from '../../components/row/row'

import Tablist from '../../components/tablist/tablist'
import Tab from '../../components/tab/tab'
import Callout from '../../components/callout/callout'

import MenuItem from '../../components/menuitem/menuitem'

import Dialog from './dialog'

import Tooltip from '../../components/tooltip/tooltip'
import TitleBar from '../../components/titlebar/titlebar'
import Icon from '../../components/icon/icon'
import Separator from '../../components/separator/separator'

import Result from '../../components/result/result'
import Feature from '../../components/feature/feature'
import Keyvalue from '../../components/keyvalue/keyvalue'

import Media from '../../components/media/media'
import TabPanel from '../../components/tabpanel/tabpanel'
import IconButton from '../../components/button/iconButton'
import Textarea from '../../components/textfield/textarea'
import ClearButton from '../../components/button/clearButton'

export function defineCustomElement() {
  if ('customElements' in window) {
    customElements.define('mm-icon', Icon)

    customElements.define('mm-button', Button)
    customElements.define('mm-icon-button', IconButton)
    customElements.define('mm-clear-button', ClearButton)

    customElements.define('mm-link', Link)

    customElements.define('mm-tag', Tag)

    customElements.define('mm-entity', Entity)

    // 위에 있어야 넣어지네? text보다 shadow Dom
    customElements.define('mm-result', Result)
    customElements.define('mm-feature', Feature)
    customElements.define('mm-keyvalue', Keyvalue)

    customElements.define('mm-avatar', Avatar)

    customElements.define('mm-textfield', Textfield)
    customElements.define('mm-textarea', Textarea)

    customElements.define('mm-checkbox', Checkbox)
    customElements.define('mm-switch', Switch)
    customElements.define('mm-radio', Radio)

    customElements.define('mm-tile', Tile)
    customElements.define('mm-text', Text)

    customElements.define('mm-tablist', Tablist)
    customElements.define('mm-tab', Tab)
    customElements.define('mm-tabpanel', TabPanel)

    customElements.define('mm-callout', Callout)

    customElements.define('mm-menuitem', MenuItem)

    customElements.define('mm-dialog', Dialog)
    customElements.define('mm-media', Media)

    customElements.define('mm-tooltip', Tooltip)

    customElements.define('mm-titlebar', TitleBar)
    customElements.define('mm-group', Group)
    customElements.define('mm-row', Row)
    customElements.define('mm-separator', Separator)
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
