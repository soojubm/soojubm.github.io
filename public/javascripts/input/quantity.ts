const quantity = () => {
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

    // todo ..... bubbling으로 변경 후 엉망이 됨.
    if (!target.closest('.js-quantity-decrement') || !target.closest('.js-quantity-increment')) return

    const inputElement = target.parentNode.querySelector('.js-quantity-input')
    const decrementElement = target.parentNode.querySelector('.js-quantity-decrement')
    const incrementElement = target.parentNode.querySelector('.js-quantity-increment')
    const MIN_VALUE = 0
    const MAX_VALUE = 10
    const DISABLED_CLASS = 'is-disabled'

    if (target.closest('.js-quantity-decrement')) {
      alert()
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
}

export default quantity
