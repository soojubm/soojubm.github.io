type Parameter = {
  checkAllSelector: string
  checkSelector: string
}

const checkbox = ({ checkAllSelector, checkSelector }: Parameter) => ({
  checkAll: document.querySelector(checkAllSelector),
  checkItems: document.querySelectorAll(checkSelector),
  setEvent() {
    if (!this.checkAll || !this.checkItems) return

    this.checkAll.addEventListener('change', () => this.setCheckAll(this.checkItems, this.checkAll))
    this.checkItems.forEach(checkItem => {
      checkItem.addEventListener('change', () => this.setCheckEach(this.checkItems, this.checkAll))
    })
  },
  setCheckEach(checkItems, checkAll) {
    const checks: HTMLInputElement[] = Array.from(checkItems)
    const isCheckedEvery = checks.every(checkItem => checkItem.checked)
    const isCheckedSome = checks.some(checkItem => checkItem.checked)

    checkAll.checked = isCheckedEvery
    checkAll.indeterminate = isCheckedSome && !isCheckedEvery
    checkAll.dataset.indeterminate = isCheckedSome && !isCheckedEvery
  },
  setCheckAll(checkItems, checkAll) {
    checkItems.forEach(checkItem => {
      checkItem.checked = checkAll.checked
      checkAll.indeterminate = false
      checkAll.dataset.indeterminate = false
    })
  },
})

export default checkbox
