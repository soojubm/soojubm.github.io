type Parameter = {
  checkAllSelector: string
  checkSelector: string
}

const checkbox = ({ checkAllSelector, checkSelector }: Parameter) => ({
  checkAll: document.querySelector<HTMLInputElement>(checkAllSelector),
  checkItems: document.querySelectorAll<HTMLInputElement>(checkSelector),
  initialize() {
    if (!this.checkAll || !this.checkItems) return

    this.checkAll.addEventListener('change', () => this.setCheckedAll(this.checkItems, this.checkAll))
    this.checkItems.forEach(checkItem => {
      checkItem.addEventListener('change', () => this.setCheckedEach(this.checkItems, this.checkAll))
    })
  },
  setCheckedEach(checkItems, checkAll) {
    const checkboxElements: HTMLInputElement[] = Array.from(checkItems)

    let isCheckedEvery = checkboxElements.every(checkItem => checkItem.checked)
    let isCheckedSome = checkboxElements.some(checkItem => checkItem.checked)
    let isIndeterminate = isCheckedSome && !isCheckedEvery

    checkAll.checked = isCheckedEvery
    checkAll.indeterminate = isIndeterminate
    checkAll.dataset.indeterminate = isIndeterminate
  },
  setCheckedAll(checkItems, checkAll) {
    checkItems.forEach(checkItem => {
      checkItem.checked = checkAll.checked
      checkAll.indeterminate = false
      checkAll.dataset.indeterminate = false
    })
  },
})

export default checkbox
