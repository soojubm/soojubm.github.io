import { makeStyleSheet } from '../../javascripts/components/utils'

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator)

  console.log('The original string is: "' + stringToSplit + '"')
  console.log('The separator is: "' + separator + '"')
  console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '))
}

var space = ' '
var comma = ','

class Entity extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    const avatarSlot = document.createElement('slot')
    const tagSlot = document.createElement('slot')
    // const avatar = document.createElement('mm-avatar')
    const labelElement = document.createElement('mm-text')
    const description = document.createElement('mm-text')
    const description2 = document.createElement('mm-text')
    const description3 = document.createElement('mm-text')

    container.classList.add('entity')
    avatarSlot.name = 'avatar'
    tagSlot.name = 'tag'

    container.dataset.alignment = this.alignment || ''

    labelElement.classList.add('entity-label')

    description.setAttribute('variant', 'caption')
    description2.setAttribute('variant', 'caption')
    description3.setAttribute('variant', 'caption')

    labelElement.innerText = this.label || ''
    labelElement.setAttribute('variant', 'subhead')

    description.innerText = this.description || ''
    description2.innerText = this.description2 || ''
    description3.innerText = this.description3 || ''

    const test = this.getAttribute('description')!.split('|', 3)

    const test2 = test.map(item => {
      return `<div>${item}</div>`
    })

    shadow.appendChild(container)
    // description.appendChild(JSON.parse(test2.join()))
    container.append(avatarSlot, tagSlot, makeStyleSheet('avatar'))

    if (this.label) container.appendChild(labelElement)
    if (this.description) container.appendChild(description)
    if (this.description2) container.appendChild(description2)
    if (this.description3) container.appendChild(description3)
  }
  get size() {
    return this.getAttribute('size')
  }

  get label() {
    return this.getAttribute('label')
  }
  get description() {
    return this.getAttribute('description')
  }
  get description2() {
    return this.getAttribute('description2')
  }
  get description3() {
    return this.getAttribute('description3')
  }

  get alignment() {
    return this.getAttribute('alignment')
  }

  set label(value) {
    this.setAttribute('label', value || '')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Entity
