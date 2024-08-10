import { makeStyleSheet } from '../../javascripts/components/utils'

class Result extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.role = 'status'
    container.classList.add('result')

    // TODO title
    const description = document.createElement('mm-text')

    const avatarSlot = document.createElement('slot')
    const listSlot = document.createElement('slot')
    const actionSlot = document.createElement('slot')

    const label = document.createElement('mm-text')
    label.classList.add('result-title')
    label.innerText = this.label || ''
    label.setAttribute('variant', 'subhead')

    // TODO slot 아니면 이렇게 상속이 안 되는 것 같다.
    const avatar = document.createElement('mm-avatar')
    avatar.setAttribute('size', 'large')
    avatar.setAttribute('variant', 'secondary')
    avatar.setAttribute('default', 'true')

    description.classList.add('result-description')
    description.innerText = this.description || ''
    description.setAttribute('variant', 'body')

    avatarSlot.name = 'avatar'
    listSlot.name = 'list'
    actionSlot.name = 'action'

    shadow.appendChild(container)
    container.append(avatarSlot, label, description, listSlot, actionSlot, makeStyleSheet('result'))
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
