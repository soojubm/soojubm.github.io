const inputNumber = () => {
  // document.addEventListener('keydown', (event) => {
  // 	console.log('keydown: ', event.target.value);
  // 	console.log('keydown - keycode: ', event.keyCode);
  // });
  // document.addEventListener('keypress', (event) => {
  // 	console.log('keypress: ', event.target.value);
  // 	console.log('keypress - keycode: ', event.keyCode);
  // });
  // document.addEventListener('keyup', (event) => {
  // 	console.log('keyup: ', event.target.value);
  // 	console.log('keyup - keycode: ', event.keyCode);
  // });
  // document.addEventListener('change', (event) => {
  // 	console.log('change: ', event.target.value);
  // 	console.log('change - keycode: ', event.keyCode);
  // });
  // document.addEventListener('input', (event) => {
  // 	console.log('input: ', event.target.value);
  // 	console.log('input - keycode: ', event.keyCode);
  // });

  // 방향키로 조절할 때 min max 조건에 걸린다.

  const MAXIMUM_VALUE = 300
  const MINIMUN_VALUE = 0
  const isFirstPlacedZero = value => /(^0+)/.test(value)

  document.addEventListener('keydown', event => {
    const { target }: any = event
    const isNumberInput = target.closest('.js-number-input')
    if (!isNumberInput) return

    document.addEventListener('keyup', setLimitNumber)

    // function limitMaximunValue() {
    //   const isMaximum = Number(value) >= MAXIMUM_VALUE
    //   if (!isMaximum) return

    //   target.value = MAXIMUM_VALUE
    // }

    function setLimitNumber() {
      const { value } = target
      const isMaximum = Number(value) >= MAXIMUM_VALUE

      if (isFirstPlacedZero(value)) target.value = MINIMUN_VALUE
      if (isMaximum) target.value = MAXIMUM_VALUE
    }
    // setInputOnlyNumbers()
    // function setInputOnlyNumbers() {
    //   const { keyCode } = event
    //   const keyCodes = [69, 189, 187, 190]
    //   const isValid = keyCodes.includes(keyCode)
    //   if (isValid) event.preventDefault()
    //   // target.value.length === 0 && keyCode === 48 && event.preventDefault();
    //   // keyCode >= 48 || keyCode <= 57 || event.preventDefault();
    //   // keyCode === 69 && event.preventDefault();
    //   // keyCode === 189 && event.preventDefault();
    //   // keyCode === 187 && event.preventDefault();
    //   // keyCode === 190 && event.preventDefault();
    // }
  })
}

export default inputNumber

const inputTest = document.querySelector<HTMLInputElement>('.js-input-test')
if (inputTest) {
  inputTest.addEventListener('keypress', event => {
    const key = event.which || event.keyCode
    const isNumberKey = key < 48 || key > 57 // todo ! isNumberKey 이다 지금음0 to 9
    const isSpaceKey = key === 32

    if (!isSpaceKey && isNumberKey) event.preventDefault()
  })

  // Track the current value
  let currentValue = inputTest.value || ''
  inputTest.addEventListener('input', e => {
    const target = e.target as HTMLInputElement
    if (/^[0-9\s]*$/.test(target.value)) currentValue = target.value
    else target.value = currentValue
    // Note that in this case, `e.preventDefault()` doesn't help

    // 한글 입력했을 때 커서가 맨 뒤로 감.
    // if (/^[0-9s]*$/.test(target.value)) {
    //   currentValue = target.value
    // } else {
    //   target.value = currentValue
    //   target.setSelectionRange(selection.start, selection.end)
    // }
  })
  // let selection = {};
  // inputTest.addEventListener('keydown', function(e) {
  //   const target = e.target as HTMLInputElement;
  //   selection = { start: target.selectionStart, end: target.selectionEnd };
  // });
}
