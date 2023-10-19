import { makeStyleSheet } from './utils'

class Separator extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    // ! hr 태그는 innerText 안 됨.
    const container = document.createElement('div')
    container.role = 'separator'
    container.classList.add('separator')
    container.innerHTML = this.innerHTML
    // container.querySelector(':after')!.innerHTML = this.innerHTML

    // getter와 무슨 차이?
    console.log(this.innerHTML, this.innerText)

    shadow.append(container, makeStyleSheet('separator'))
  }

  // get content() {
  //   return this.innerText
  // }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Separator
