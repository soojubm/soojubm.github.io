import { makeStyleSheet } from '../../javascripts/components/utils'

class Tooltip extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    // 결국 2개 다 슬롯이어야 하는 듯? 왜?

    const container = document.createElement('div')
    container.classList.add('tooltip')
    container.dataset.align = this.align || ''

    const trigger = document.createElement('slot')
    trigger.classList.add('tooltip-trigger')
    trigger.name = 'trigger'

    const content = document.createElement('div')
    content.classList.add('tooltip-content')
    content.role = 'tooltip'
    content.innerText = this.content || ''

    shadow.append(container, makeStyleSheet('tooltip'))

    container.appendChild(trigger)
    container.appendChild(content)
  }

  get content() {
    return this.getAttribute('content')
  }
  get align() {
    return this.getAttribute('align')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Tooltip
