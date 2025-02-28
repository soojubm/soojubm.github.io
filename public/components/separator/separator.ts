import { makeStyleSheet } from '../../javascripts/components/utils'

class Separator extends HTMLElement {
  private hostElement: HTMLHRElement

  constructor() {
    super()
    this.hostElement = document.createElement('hr')
  }
  connectedCallback() {
    const { hostElement } = this
    const shadow = this.attachShadow({ mode: 'open' })

    // hr 태그는 textContent나 innerText를 지원하지 않으므로, slot을 사용합니다.
    hostElement.role = 'separator'
    hostElement.dataset.spacing = this.spacing

    const textSlot = document.createElement('slot')
    textSlot.name = 'text'

    shadow.append(hostElement)
    shadow.append(makeStyleSheet('separator'))
    hostElement.append(textSlot)
  }

  disconnectedCallback() {}

  get spacing() {
    return this.getAttribute('spacing') || ''
  }
}

export default Separator
