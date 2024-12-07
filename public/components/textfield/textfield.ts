import Input from './input'

class Textfield extends Input {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return [...Input.observedAttributes]
  }

  connectedCallback() {}
  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Textfield
