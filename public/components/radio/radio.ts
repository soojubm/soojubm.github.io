import { makeStyleSheet, inheritStyle } from '../../javascripts/components/utils'

class Radio extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const id = this.id_temp || `radio-${Math.random().toString(36).substr(2, 9)}`

    const container = document.createElement('div')
    container.classList.add('radio')

    // input
    const input = document.createElement('input')
    input.setAttribute('type', 'radio')
    input.setAttribute('id', this.id_temp || id)
    input.setAttribute('name', this.name || '')
    // MEMO true 와 같은 값 없이
    if (this.checked) input.setAttribute('checked', '')
    if (this.disabled) input.setAttribute('disabled', '')

    // label
    const label = document.createElement('label')
    label.setAttribute('for', id)

    const indicator = document.createElement('span')
    indicator.classList.add('radio-indicator')

    label.appendChild(indicator) // 한 번만 붙이기
    if (this.textContent && this.textContent.length > 0) {
      const text = document.createElement('span')
      text.classList.add('radio-text')
      text.textContent = this.textContent
      label.appendChild(text) // indicator 재첨부 X
    }

    container.appendChild(input)

    container.appendChild(label)

    if (this.helper) {
      const helper = document.createElement('p')
      helper.textContent = this.helper

      container.appendChild(helper)
    }

    shadow.appendChild(makeStyleSheet('radio'))
    shadow.appendChild(container)
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
    return this.hasAttribute('checked')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  // static get observedAttributes() {
  //   return ['checked', 'disabled']
  // }

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
