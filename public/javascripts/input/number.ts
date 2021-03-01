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
  document.addEventListener('keydown', event => {
    const { target }: any = event

    const isNumberInput = target.closest('.js-number-input')
    if (!isNumberInput) return

    document.addEventListener('keyup', setLimitNumber)
    setInputOnlyNumbers()

    function setInputOnlyNumbers() {
      const { keyCode } = event
      const keyCodes = [69, 189, 187, 190]
      const isValid = keyCodes.includes(keyCode)
      if (isValid) event.preventDefault()
      // target.value.length === 0 && keyCode === 48 && event.preventDefault();
      // keyCode >= 48 || keyCode <= 57 || event.preventDefault();
      // keyCode === 69 && event.preventDefault();
      // keyCode === 189 && event.preventDefault();
      // keyCode === 187 && event.preventDefault();
      // keyCode === 190 && event.preventDefault();
    }
    function setLimitNumber() {
      const MAXIMUM = 300
      const MINIMUN = 0
      const isFirstPlacedZero = /(^0+)/.test(target.value)
      const isMaximum = Number(target.value) >= MAXIMUM
      const isLength = target.value.length > MINIMUN

      if (isFirstPlacedZero) target.value = MINIMUN
      if (isLength) target.value = target.value.slice(0, 3)
      if (isMaximum) target.value = MAXIMUM
    }
  })
}

export default inputNumber

// export const inputquantity = () => {
// 	const quantity = document.querySelector('.js-quantity');
// 	const input = quantity.querySelector('.js-quantity-input');
// 	const decrement = quantity.querySelector('.js-quantity-decrement');
// 	const increment = quantity.querySelector('.js-quantity-increment');

// 	let value = input.value;
// 	const MIN_VALUE = 0;
// 	const MAX_VALUE = 10;
// 	let	isMinimun;
// 	let isMaximum;
// 	// const	isMinimun = Number(value) <= MIN_VALUE;
// 	// const isMaximum = Number(value) >= MAX_VALUE;

// 	// if(isMinimun) setDisableDecrement();
// 	// if(isMaximum) setDisableIecrement();

// 	decrement.addEventListener('click', event => {
// 		isMinimun = Number(value) <= MIN_VALUE;
// 		isMaximum = Number(value) >= MAX_VALUE;
// 		if(isMinimun) {
// 			decrement.classList.add('is-disabled');
// 			return;
// 		}
// 		if(!isMaximum) {
// 			increment.classList.remove('is-disabled');
// 		}

// 		value = Number(value) - 1;
// 	});
// 	increment.addEventListener('click', event => {
// 		isMinimun = Number(value) <= MIN_VALUE;
// 		isMaximum = Number(value) >= MAX_VALUE;
// 		console.log(isMinimun, isMaximum, value);
// 		if(isMaximum) {
// 			increment.classList.add('is-disabled');
// 			return;
// 		}
// 		if(!isMinimun) {
// 			decrement.classList.remove('is-disabled');
// 		}

// 		value = Number(value) + 1;
// 	});

// 	function setDisableDecrement() {
// 		decrement.classList.add('is-disabled');
// 		return;
// 	}
// 	function setDisableIecrement() {
// 		decrement.classList.add('is-disabled');
// 		return;
// 	}
// };

// value = isNaN(value) ? 0 : value;
// value < 1 ? value = 1 : '';
// value--;

// parseInt vs Number => 숫자로 시작하면 숫자를 저장 아니면 NaN
document.addEventListener('click', event => {
  const { target }: any = event
  const inputElement = target.parentNode.querySelector('.js-quantity-input')
  const decrementElement = target.parentNode.querySelector('.js-quantity-decrement')
  const incrementElement = target.parentNode.querySelector('.js-quantity-increment')
  const MIN_VALUE = 0
  const MAX_VALUE = 10
  const DISABLED_CLASS = 'is-disabled'

  if (target.closest('.js-quantity-decrement')) {
    --inputElement.value

    if (inputElement.value <= MIN_VALUE) target.setAttribute('disabled', 'true')
    if (inputElement.value < MAX_VALUE) incrementElement.removeAttribute('disabled')
  }
  if (target.closest('.js-quantity-increment')) {
    if (inputElement.value === MAX_VALUE) return

    ++inputElement.value
    
    if (inputElement.value >= MAX_VALUE) target.setAttribute('disabled', 'true')
    if (inputElement.value > MIN_VALUE) decrementElement.removeAttribute('disabled')
  }
})

// function setStringBytes() {}

// export const input = {
// 	textarea: inputTextarea(),
// 	number: inputNumber()
// };
