type Parameter = {
  checkAllSelector: string
  checkSelector: string
}
// 파일로 묶여있어서 외부에서 접근할 수 없어서 나름 괜츈
// ㄲ체나 클래스로
// 함수는 레이지
// 암묵적이다.

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

// class Checkbox {
//   constructor() {
//     this.checkAll = document.querySelector(checkAllSelector),
//     this.checkItems = document.querySelectorAll(checkSelector)
//   }
// }

// const checkbox = ({ checkAllSelector, checkSelector }: Parameter) => {
//   const checkAll = document.querySelector(checkAllSelector);
//   const checkItems = document.querySelectorAll(checkSelector);
//   if (!checkAll || !checkItems) return;

//   checkAll.addEventListener('change', () => setCheckAll(checkItems, checkAll));
//   checkItems.forEach(checkItem => {
//     checkItem.addEventListener('change', () => setCheckEach(checkItems, checkAll));
//   });
// };

// function setCheckEach(checkItems, checkAll) {
//   const checks: HTMLInputElement[] = Array.from(checkItems);
//   const isCheckedEvery = checks.every(checkItem => checkItem.checked);
//   const isCheckedSome = checks.some(checkItem => checkItem.checked);

//   checkAll.checked = isCheckedEvery;
//   checkAll.indeterminate = isCheckedSome && !isCheckedEvery;
//   checkAll.dataset.indeterminate = isCheckedSome && !isCheckedEvery;
// }

// function setCheckAll(checkItems, checkAll) {
//   checkItems.forEach(checkItem => {
//     checkItem.checked = checkAll.checked;
//     checkAll.indeterminate = false;
//     checkAll.dataset.indeterminate = false;
//   });
// }

export default checkbox
