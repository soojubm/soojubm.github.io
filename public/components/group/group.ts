import { makeStyleSheet } from '../../javascripts/components/utils'

// TODO group / stack (layout, form layout은 스텍을 포함하는 형태. 고로 스텍은 dialog layout 같은)

// role = group | menu

type ValueType = 'checkbox' | 'radio' | 'chip' | 'button' | 'textfield' | 'menuitem'

const getContainer = (value: ValueType) => {
  if (value === 'checkbox' || value === 'radio') return 'fieldset'
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
