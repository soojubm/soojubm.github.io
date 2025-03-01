import { makeStyleSheet } from '../../javascripts/components/utils'

export class CustomHTMLElement extends HTMLElement {
  constructor() {
    super()
  }
}

class Checkbox extends CustomHTMLElement {
  static formAssociated = true
  static get observedAttributes() {
    return ['checked', 'disabled']
  }

  constructor() {
    super()
    // this._internals = this.attachInternals()
    // this.innerHTML = `<button class="chip"></button>`
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('checkbox')

    const label = document.createElement('label')
    label.setAttribute('for', this.name || '')
    // label.append(...this.childNodes)
    label.append(this.textContent || '')

    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.setAttribute('id', this.name || '')
    input.setAttribute('name', this.name || '')

    input.addEventListener('change', () => {
      // 타겟이 check all 일 때
      if (this.disabled) return
    })

    shadow.appendChild(container)
    container.appendChild(input)

    if (this.textContent && this.textContent.length > 0) {
      container.appendChild(label)
    }

    if (this.checked) input.setAttribute('checked', 'true')
    if (this.disabled) input.setAttribute('disabled', 'true')

    if (this.size) container.setAttribute('data-size', this.size)
    if (this.helper) {
      const helper = document.createElement('p')
      helper.textContent = this.helper
      container.appendChild(helper)
    }

    // 임시
    shadow.appendChild(makeStyleSheet('checkbox'))
  }

  get name() {
    return this.getAttribute('name')
  }

  get size() {
    return this.getAttribute('size')
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

  connectedCallback() {}
  disconnectedCallback() {}
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
