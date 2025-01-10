interface OptionItem {
  label: string
  value: string
}

const styles = `
  :host {}

  .button-list {
    display: flex;
    gap: 4px;
  }

  .button {
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s;
  }

  .button:hover {
    background: gold;
  }

  .button.selected {
    background: #007bff;
  }
`

class ButtonListComponent extends HTMLElement {
  private container: HTMLDivElement

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = styles

    this.container = document.createElement('div')
    this.container.classList.add('button-list')

    shadow.append(style, this.container)
  }

  static get observedAttributes() {
    return ['options']
  }

  // 여기서 newValue 때문에 랜더링이 발생함.
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'options' && newValue) {
      this.updateButtons(JSON.parse(newValue))
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('options')) {
      this.setAttribute('options', JSON.stringify([]))
    }
  }

  private updateButtons(options: OptionItem[]) {
    this.container.innerHTML = ''

    options.forEach(option => {
      const button = document.createElement('button')
      button.classList.add('button')
      button.textContent = option.label
      button.dataset.value = option.value

      button.addEventListener('click', () => this.onButtonClick(button))

      this.container.appendChild(button)
    })
  }

  private onButtonClick(targetButton: HTMLButtonElement) {
    const selectedButton = this.container.querySelector('.button.selected')
    selectedButton?.classList.remove('selected')
    targetButton.classList.add('selected')

    const event = new CustomEvent('optionChange', {
      detail: { value: targetButton.dataset.value },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event)
  }
}

export default ButtonListComponent

// event.detail.value

// bubbles
// parentElement.addEventListener('optionChange', (event) => {
//   console.log(event.detail.value);  // 자식에서 발생한 이벤트를 부모에서 감지
// });

// composed
// shadowRootElement.addEventListener('optionChange', (event) => {
//   console.log(event.detail.value);  // Shadow DOM 바깥에서 감지
// });
