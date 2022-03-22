type Parameter = {
  checkAllSelector: string
  checkSelector: string
}

function checkbox({ checkAllSelector, checkSelector }: Parameter) {
  const checkAllElement = document.querySelector<HTMLInputElement>(checkAllSelector)
  const checkElements = document.querySelectorAll<HTMLInputElement>(checkSelector)

  if (!checkAllElement || !checkElements) return

  checkAllElement.addEventListener('change', () => checkAll(checkElements, checkAllElement))
  checkElements.forEach(checkItem => {
    checkItem.addEventListener('change', () => checkTarget(checkElements, checkAllElement))
  })

  function checkTarget(checkItems, checkAll) {
    const checkboxElements: HTMLInputElement[] = Array.from(checkItems)

    let isCheckedAll = checkboxElements.every(checkItem => checkItem.checked)
    let isCheckedSome = checkboxElements.some(checkItem => checkItem.checked)
    let isIndeterminate = isCheckedSome && !isCheckedAll

    checkAll.checked = isCheckedAll
    checkAll.indeterminate = isIndeterminate
    checkAll.dataset.indeterminate = isIndeterminate
  }
  function checkAll(checkItems, checkAll) {
    checkItems.forEach(checkItem => {
      checkItem.checked = checkAll.checked
      checkAll.indeterminate = false
      checkAll.dataset.indeterminate = false
    })
  }
}

export default checkbox
