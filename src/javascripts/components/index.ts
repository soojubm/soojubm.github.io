// 이 코드는 “값을 가져오기 위한 import”가 아니라 “부작용(side-effect)을 실행시키기 위한 import”다.
import '../../components/icon/icon'
import '../../components/avatar/avatar'
import '../../components/link/link'
import '../../components/textfield/textfield'
import '../../components/textfield/searchfield'
import '../../components/textfield/textarea'
import '../../components/tablist/tablist'
import '../../components/tab/tab'
import '../../components/tabpanel/tabpanel'
import '../../components/tooltip/tooltip'
import '../../components/callout/callout'
import '../../components/menuitem/menuitem'
import '../../components/group/group'
import '../../components/row/row'
import '../../components/entity/entity'
import '../../components/text/text'
import '../../components/text/textGroup'
import '../../components/text/textList'
import '../../components/titlebar/titlebar'
import '../../components/separator/separator'
import '../../components/surface/surface'
import '../../components/switch/switch'
import '../../components/result/result'
import '../../components/feature/feature'
import '../../components/keyvalue/keyvalue'
import '../../components/textfield/dropdown'
import '../../components/title-with-description/index'
import '../../components/component-section'
import '../../components/sheet/sheet'
import '../../components/sheet/sheet-header'
import '../../components/sheet/sheet-body'
import '../../components/sheet/sheet-footer'
import '../../components/list-row'
import '../../components/option-row'

import '../../components/thumbnail/thumbnail'

import '../../components/button/button'
import '../../components/button/icon-button'
import '../../components/button/clear-button'

import '../../components/toggle-button-group'

import '../../components/checkbox/checkbox'
import '../../components/checkbox/checkbox-group'

import '../../components/tag/tag'
import '../../components/tag/keyword-tag'
import '../../components/tag/accent-tag'
import '../../components/tag/status-tag'
import '../../components/tag/category-tag'

import '../../components/radio/radio'
import '../../components/radio/radio-group'

import '../../components/menuitem/menu-item-row'
import '../../components/menuitem/menu-item-link'
import '../../components/menuitem/menu-item-checkbox'
import '../../components/menuitem/menu-item-radio'
import '../../components/menuitem/menu-item-radio-group'

import '../../components/component-props/'

import '../../components/app-sidebar'

// 👉 “이 파일은 module이다”라고 명시

// 효과:

// TS에서 global script로 처리되는 것 방지
// side-effect entry 파일로 안정화
export {}

import Dialog from './dialog'

export function defineCustomElement() {
  if ('customElements' in window) {
    // 위에 있어야 넣어지네? text보다 shadow Dom
    customElements.define('mm-dialog', Dialog)
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
