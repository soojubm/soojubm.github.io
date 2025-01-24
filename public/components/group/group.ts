import { makeStyleSheet } from '../../javascripts/components/utils'

type ValueType = 'checkbox' | 'chip' | 'button' | 'textfield' | 'menuitem'

const getContainer = (value: ValueType) => {
  if (value === 'checkbox') return 'fieldset'
  return 'div'
}
class Group extends HTMLElement {
  private hostElement: HTMLDivElement
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.hostElement = document.createElement('div')
  }
  connectedCallback() {
    const { shadowRoot, hostElement } = this
    hostElement.classList.add('group')
    hostElement.role = 'group'

    hostElement.dataset.alignment = this.alignment

    if (this.alignment) hostElement.dataset.alignment = this.alignment

    const style = this.getAttribute('style')
    hostElement.setAttribute('style', style || '')

    if (this.variant) hostElement.dataset.variant = this.variant

    shadowRoot!.appendChild(hostElement)
    hostElement.append(...this.childNodes, makeStyleSheet('group'))
  }

  get variant() {
    return this.getAttribute('variant') || ''
  }

  get alignment() {
    return this.getAttribute('alignment') || ''
  }

  disconnectedCallback() {}
}

export default Group
