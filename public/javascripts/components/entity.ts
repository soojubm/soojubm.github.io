import { makeStyleSheet } from './utils'

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
    // const avatar = document.createElement('test-avatar')
    const label = document.createElement('test-text')
    const description = document.createElement('test-text')
    const description2 = document.createElement('test-text')
    const description3 = document.createElement('test-text')

    container.classList.add('entity')
    avatarSlot.name = 'avatar'
    tagSlot.name = 'tag'

    label.classList.add('entity-label')
    description.classList.add('entity-description')
    description2.classList.add('entity-description')
    description3.classList.add('entity-description')

    label.innerText = this.label
    label.setAttribute('variant', 'subhead')
    description.innerText = this.getAttribute('description') || ''
    description2.innerText = this.getAttribute('description2') || ''
    description3.innerText = this.getAttribute('description3') || ''

    const test = this.getAttribute('description')!.split('|', 3)

    // console.log(splitString(monthString, comma), 'ppd')
    const test2 = test.map(item => {
      return `<div>${item}</div>`
    })

    shadow.appendChild(container)
    // description.appendChild(JSON.parse(test2.join()))

    container.append(avatarSlot, tagSlot, label, description, description2, description3, makeStyleSheet('avatar'))
  }
  get size() {
    return this.getAttribute('size')
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
