class Input extends HTMLElement {
  constructor() {
    super()
    // this.innerHTML = `<button class="chip"></button>`
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('textfield')
    // container.setAttribute('class', 'chip')

    const label = document.createElement('label')
    label.classList.add('textfield-label')

    const input = document.createElement('input')

    input.classList.add('reset-input')
    input.classList.add('textfield-input')
    input.setAttribute('type', 'text')

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    shadow.appendChild(container)
    container.appendChild(label)
    container.appendChild(input)
    container.appendChild(iconSlot)

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', '/public/stylesheets/components/textfield.css')
    shadow.appendChild(linkElem)

    label.textContent = this.label
    // input.setAttribute('placeholder', this.placeholder || '')

    if (this.isOptional) {
      const small = document.createElement('small')
      small.textContent = '선택입력'
      label.appendChild(small)
    }

    if (this.helper && this.helper.length > 0) {
      const p = document.createElement('p')
      p.textContent = this.helper
      container.appendChild(p)
    }
  }

  get type() {
    return this.getAttribute('type')
  }
  set type(value) {
    if (value) this.setAttribute('type', value)
  }

  get size() {
    return this.getAttribute('size')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  get name() {
    return this.getAttribute('name')
  }
  set name(value) {
    if (value) this.setAttribute('name', value)
  }

  get placeholder() {
    return this.getAttribute('placeholder')
  }
  set placeholder(value) {
    if (value) this.setAttribute('placeholder', value)
  }

  get label() {
    return this.getAttribute('label')
  }
  set label(value) {
    if (value) this.setAttribute('label', value)
  }

  get helper() {
    return this.getAttribute('helper')
  }

  get isOptional() {
    return this.hasAttribute('isOptional')
  }

  connectedCallback() {
    // this.textContent = this.label

    console.log('helper', this.helper)

    console.log('ihnnerhtml', this.innerHTML)
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Input
