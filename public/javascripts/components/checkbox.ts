import { makeStyleSheet } from './utils'

class Checkbox extends HTMLElement {
  constructor() {
    super()
    // this.innerHTML = `<button class="chip"></button>`
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('checkbox')

    const label = document.createElement('label')
    const input = document.createElement('input')

    input.addEventListener('change', () => {
      // 타겟이 check all 일 때
      if (this.disabled) return
      alert('test')
    })

    input.setAttribute('type', 'checkbox')

    shadow.appendChild(container)

    container.appendChild(input)
    container.appendChild(label)

    label.setAttribute('for', this.name || '')
    input.setAttribute('id', this.name || '')
    input.setAttribute('name', this.name || '')

    if (this.label) {
      label.textContent = this.label
    } else {
      label.append(...this.childNodes)
    }

    if (this.checked) input.setAttribute('checked', 'true')
    if (this.disabled) input.setAttribute('disabled', 'true')

    if (this.size) container.setAttribute('data-size', this.size)
    if (this.helper) {
      const helper = document.createElement('p')
      helper.textContent = this.helper

      container.appendChild(helper)
    }

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

  get label() {
    return this.getAttribute('label')
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
