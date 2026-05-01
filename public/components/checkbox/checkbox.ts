import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-checkbox')
class Checkbox extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) size = ''
  @property({ type: String }) helper = ''
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: Boolean, reflect: true }) disabled = false

  private _onChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <link rel="stylesheet" href="/public/components/checkbox/checkbox.css" />
      <div data-size="${this.size}">
        <input
          type="checkbox"
          id="${this.name}"
          name="${this.name}"
          value="${this.value}"
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._onChange}"
        />
        <label for="${this.name}">
          <span class="checkbox-indicator"></span>
          <mm-text variant="body"><slot></slot></mm-text>
        </label>
        ${this.helper ? html`<p>${this.helper}</p>` : ''}
      </div>
    `
  }
}

export default Checkbox

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
