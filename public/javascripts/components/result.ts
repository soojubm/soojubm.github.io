import { makeStyleSheet } from './utils'

class Result extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    const avatar = document.createElement('test-avatar')
    const label = document.createElement('test-text')
    const description = document.createElement('test-text')

    const listSlot = document.createElement('slot')
    const actionSlot = document.createElement('slot')

    container.role = 'status'
    // container.classList.add('result')

    // TODO slot 아니면 이렇게 상속이 안 되는 것 같다.
    avatar.setAttribute('size', 'large')
    avatar.setAttribute('variant', 'secondary')

    label.classList.add('result-title')
    label.innerText = this.label || ''
    label.setAttribute('variant', 'subhead')

    description.classList.add('result-description')
    description.innerText = this.description || ''

    listSlot.name = 'list'
    actionSlot.name = 'action'

    shadow.appendChild(container)
    container.append(avatar, label, description, listSlot, actionSlot, makeStyleSheet('result'))
  }

  get label() {
    return this.getAttribute('label')
  }
  get description() {
    return this.getAttribute('description')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Result
