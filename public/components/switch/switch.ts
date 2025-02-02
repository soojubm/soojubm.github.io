import { makeStyleSheet } from '../../javascripts/components/utils'

class Switch extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')

    container.classList.add('switch')

    input.setAttribute('type', 'checkbox')
    input.role = 'switch'

    label.textContent = this.textContent || ''
    label.setAttribute('for', this.name || '')
    input.setAttribute('id', this.name || '')
    input.setAttribute('name', this.name || '')

    if (this.checked) input.setAttribute('checked', 'true')
    if (this.disabled) input.setAttribute('disabled', 'true')

    shadow.appendChild(container)
    container.append(input, label, makeStyleSheet('switch'))
  }

  get name() {
    return this.getAttribute('name')
  }

  get size() {
    return this.getAttribute('size')
  }

  get checked() {
    return this.getAttribute('checked')
  }

  get disabled() {
    return this.getAttribute('disabled')
  }

  connectedCallback() {}
  disconnectedCallback() {}
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
