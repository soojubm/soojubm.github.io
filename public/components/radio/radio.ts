import { makeStyleSheet, inheritStyle } from '../../javascripts/components/utils'

class Radio extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('radio')

    const label = document.createElement('label')
    label.innerHTML = this.innerHTML || ''
    label.setAttribute('for', this.id_temp || '')

    const input = document.createElement('input')
    input.setAttribute('type', 'radio')
    input.setAttribute('id', this.id_temp || '')
    input.setAttribute('name', this.name || '')
    if (this.checked) input.setAttribute('checked', 'true')
    if (this.disabled) input.setAttribute('disabled', 'true')

    // TODO : inheritStyle
    const style = this.getAttribute('style')
    if (style) container.setAttribute('style', style)

    shadow.appendChild(container)
    container.append(input, label, makeStyleSheet('radio'))

    if (this.helper) {
      const helper = document.createElement('p')
      helper.textContent = this.helper

      container.appendChild(helper)
    }
  }

  get id_temp() {
    return this.getAttribute('id')
  }

  get name() {
    return this.getAttribute('name')
  }

  get helper() {
    return this.getAttribute('helper')
  }

  get value() {
    return this.getAttribute('value')
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

export default Radio

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
