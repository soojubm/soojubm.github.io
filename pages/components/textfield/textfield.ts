import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './textfield.html'
import '/pages/components/components.css'

import '/public/stylesheets/shared.css'
import '/public/stylesheets/components/form.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

  const enable = element => element.setAttribute('disabled', false)
  const disable = element => element.setAttribute('disabled', true)

  function updateValue() {}

  const counter = () => {
    const counter = document.querySelector('.js-counter')
    if (!counter) return

    const decrement = counter.querySelector('.js-counter-decrement')
    const increment = counter.querySelector('.js-counter-increment')
    const input = counter.querySelector('input') as HTMLInputElement

    let count = Number(input.value)

    const MIN_VALUE = 0
    const MAX_VALUE = 5

    input.addEventListener('change', event => {
      const target = event.target as any

      if (count > MAX_VALUE || count < MIN_VALUE) count = target.value

      decrement?.setAttribute('aria-disabled', String(count <= MIN_VALUE))
      increment?.setAttribute('aria-disabled', String(count >= MAX_VALUE))

      target.value = count
      // if (target.value === count) return
      // console.log(typeof target.value, target.value, count)
    })

    decrement?.addEventListener('click', handleIncreaseClick)
    increment?.addEventListener('click', handleDecreseClick)

    function handleIncreaseClick() {
      count = Number(count) - 1
      input.dispatchEvent(new Event('change'))
    }
    function handleDecreseClick() {
      count = Number(count) + 1
      input.dispatchEvent(new Event('change'))
    }
  }

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

  const inputTextarea = () => {
    // tagName과 nodeName은 텍스트 노드를 각각 undefined와 #text 반환한다.
    document.addEventListener('input', event => {
      const { target }: any = event
      if (target) return

      const isTextarea = target.nodeName.toLowerCase() === 'textarea'
      if (!isTextarea) return

      const BYTE_MAXIMUM = 30

      const byteElement = document.querySelector<HTMLElement>('.textfield-byte b')
      if (!byteElement) return

      const stringByteLength =
        target?.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length || 0 // || 0 임시
      byteElement.innerText = stringByteLength

      const isMaximum = stringByteLength > BYTE_MAXIMUM
      target.parentNode.classList.toggle('is-invalid', isMaximum)

      // autoExpand(target)
    })
  }

  const autoExpand = field => {
    // doesnt work
    field.style.height = 'inherit'

    const computed = window.getComputedStyle(field)
    const height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'))
    field.style.height = `${height}px`
  }

  // const newValue = 'bar';
  // // 1: check if value is not already set to the `newValue`
  // if (hiddenInput.value !== newValue) {
  //     // 2: change value
  //     hiddenInput.value = newValue;
  //     // 3: trigger `change` event
  //     hiddenInput.dispatchEvent(new Event('change'));
  // }
  // value = isNaN(value) ? 0 : value;
  // value < 1 ? value = 1 : '';
  // value--;

  // parseInt vs Number => 숫자로 시작하면 숫자를 저장 아니면 NaN
})

// input.addEventListener("input", updateValue);
// function updateValue(e) {
// log.textContent = e.target.value;
// }
