import { makeStyleSheet } from '../../javascripts/components/utils'

class Switch extends HTMLElement {
  private _input: HTMLInputElement | null = null
  private _label: HTMLLabelElement | null = null

  static get observedAttributes() {
    return ['checked', 'disabled', 'name']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')

    container.classList.add('switch')

    this._input = document.createElement('input')
    this._label = document.createElement('label')

    this._input.setAttribute('type', 'checkbox')
    this._input.role = 'switch'

    // Initial rendering with attributes
    this._updateInputAttributes()

    shadow.appendChild(container)
    container.append(this._input, this._label, makeStyleSheet('switch'))
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this._updateInputAttributes()
    }
  }

  private _updateInputAttributes() {
    // Check for null before using, though TypeScript should now understand they're assigned
    if (!this._input || !this._label) return

    const name = this.getAttribute('name')
    if (name) {
      this._input.setAttribute('id', name)
      this._input.setAttribute('name', name)
      this._label.setAttribute('for', name)
    } else {
      this._input.removeAttribute('id')
      this._input.removeAttribute('name')
      this._label.removeAttribute('for')
    }

    if (this.hasAttribute('checked')) {
      this._input.checked = true
      this._input.setAttribute('checked', '')
    } else {
      this._input.checked = false
      this._input.removeAttribute('checked')
    }

    if (this.hasAttribute('disabled')) {
      this._input.disabled = true
      this._input.setAttribute('disabled', '')
    } else {
      this._input.disabled = false
      this._input.removeAttribute('disabled')
    }

    if (!this._label.textContent) {
      this._label.textContent = this.textContent || ''
    }
  }

  get name(): string | null {
    return this.getAttribute('name')
  }

  get size(): string | null {
    return this.getAttribute('size')
  }

  get checked(): boolean {
    return this.hasAttribute('checked')
  }

  set checked(value: boolean) {
    if (Boolean(value)) {
      this.setAttribute('checked', '')
    } else {
      this.removeAttribute('checked')
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }

  set disabled(value: boolean) {
    if (Boolean(value)) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  connectedCallback() {
    if (this._input) {
      // Ensure _input exists before adding listener
      this._input.addEventListener('change', this._handleInputChange.bind(this))
    }
  }

  disconnectedCallback() {
    if (this._input) {
      // Ensure _input exists before removing listener
      this._input.removeEventListener('change', this._handleInputChange.bind(this))
    }
  }

  private _handleInputChange() {
    if (this._input) {
      // Ensure _input exists
      if (this._input.checked) {
        this.setAttribute('checked', '')
      } else {
        this.removeAttribute('checked')
      }
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
    }
  }
}

export default Switch

// type Parameter = {
//   checkAllSelector: string
//   checkSelector: string
// }

// // useSelection
// // useForm

// class Checkbox {
//   checkAllElement: HTMLInputElement | null
//   constructor() {
//     this.checkAllElement = null
//   }

//   get isCheckedAll() {
//     return false
//   }
//   get isCheckedSome() {
//     return false
//   }
// }

// function checkbox({ checkAllSelector, checkSelector }: Parameter) {
//   const checkAllElement = document.querySelector<HTMLInputElement>(checkAllSelector)
//   const checkElements = document.querySelectorAll<HTMLInputElement>(checkSelector)
//   if (!checkAllElement || !checkElements) return

//   checkAllElement.addEventListener('change', () => checkAll(checkElements, checkAllElement))
//   checkElements.forEach(checkElement => {
//     checkElement.addEventListener('change', () => checkTarget(checkElements, checkAllElement))
//   })
// }

// function checkTarget(checkItems, checkAll) {
//   const checkboxElements: HTMLInputElement[] = Array.from(checkItems)

//   let isCheckedAll = checkboxElements.every(checkItem => checkItem.checked)
//   let isCheckedSome = checkboxElements.some(checkItem => checkItem.checked)
//   let isIndeterminate = isCheckedSome && !isCheckedAll

//   checkAll.checked = isCheckedAll
//   checkAll.indeterminate = isIndeterminate
//   checkAll.dataset.indeterminate = isIndeterminate
// }

// function checkAll(checkItems, checkAll) {
//   checkItems.forEach(checkItem => {
//     checkItem.checked = checkAll.checked
//     checkAll.indeterminate = false
//     checkAll.dataset.indeterminate = false
//   })
// }

// export default checkbox
