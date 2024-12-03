import { makeStyleSheet } from '../../javascripts/components/utils'

// TODO group / stack (layout, form layout은 스텍을 포함하는 형태. 고로 스텍은 dialog layout 같은)

// role = group | menu

type ValueType = 'checkbox' | 'radio' | 'chip' | 'button' | 'textfield' | 'menuitem'

const getContainer = (value: ValueType) => {
  if (value === 'checkbox' || value === 'radio') return 'fieldset'
  return 'div'
}
class Group extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('group')
    container.role = 'group'

    // TODO radio = radiogroup role

    container.dataset.alignment = this.alignment || ''

    if (this.alignment) container.dataset.alignment = this.alignment

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    if (this.variant) container.dataset.variant = this.variant
    // TODO : checkbox는 fieldset

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('group'))
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get alignment() {
    return this.getAttribute('alignment')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Group
