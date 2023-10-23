import { makeStyleSheet } from './utils'
import Input from './textfield'

// size = "large";

// constructor() {
//   super();
//   this.value = "";
// }

// static get observedAttributes() {
//   return ["placeholder"];
// }
// this.innerHTML = `<button class="chip"></button>`

class Searchfield extends Input {
  constructor() {
    super()
    // const shadow = this.attachShadow({ mode: 'open' })

    console.log('super', super())

    // const icon = document.createElement('test-icon')
    // icon.name = 'search'
  }

  connectedCallback() {
    console.log('helper', this.helper)
    console.log('textarea', this)
  }
  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Searchfield
