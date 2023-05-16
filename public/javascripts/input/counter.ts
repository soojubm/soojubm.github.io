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

export default counter
