import { makeStyleSheet } from './utils'

class Tooltip extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    // 결국 2개 다 슬롯이어야 하는 듯. slot-trigger / slot-content
    const container = document.createElement('div')
    const trigger = document.createElement('span')
    const content = document.createElement('div')

    container.classList.add('tooltip')
    trigger.classList.add('tooltip-trigger')
    trigger.classList.add('iconoir-help-center')
    content.classList.add('tooltip-content')

    content.role = 'tooltip'

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('tooltip'))

    container.appendChild(trigger)
    container.appendChild(content)

    trigger.innerHTML = this.innerHTML
    content.innerText = this.content || ''
  }

  get content() {
    return this.getAttribute('content')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Tooltip
