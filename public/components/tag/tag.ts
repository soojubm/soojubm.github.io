import { makeStyleSheet } from '../../javascripts/components/utils'

// TODO 참고
// import styleTextCoral from './coral.scss'
// const styleGreen = document.createElement('style');
// styleGreen.type = 'text/css';
// styleGreen.appendChild(document.createTextNode(styleTextGreen));

class Tag extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    // role=itemlist
    // tag-icon role=image
    const container = document.createElement(this.datetime ? 'time' : 'span')
    container.classList.add('tag')
    container.dataset.variant = this.variant || ''

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    // for ordering
    const label = document.createElement('span')
    label.textContent = this.textContent

    shadow.append(container, makeStyleSheet('tag'))
    container.appendChild(iconSlot)
    if (this.textContent) container.appendChild(label)
  }

  get variant() {
    return this.getAttribute('variant')
  }
  set variant(value) {
    if (value) this.setAttribute('variant', value)
  }

  get content() {
    return this.innerHTML
  }

  get label() {
    return this.getAttribute('label')
  }

  get datetime() {
    return this.getAttribute('datetime')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Tag
