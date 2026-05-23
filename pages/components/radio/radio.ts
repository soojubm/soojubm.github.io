import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'
// import { RadioGroup } from './radio-group'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)

  interface RadioGroupDetail {
    value: string
    name: string
  }

  const planGroup = document.querySelector('#plan-group')

  if (planGroup) {
    planGroup.addEventListener('change', (event: Event) => {
      const customEvent = event as CustomEvent<RadioGroupDetail>
      const selectedValue = customEvent.detail.value

      console.log('현재 선택된 요금제 value:', selectedValue)
      // 출력 결과 예시: "basic" 또는 "premium"
    })
  }
})
