import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)

  // 1. 커스텀 이벤트의 detail 구조 정의
  interface RadioGroupChangeDetail {
    value: string
    name: string
  }

  // 2. 제네릭(<>)을 사용하여 엘리먼트 타입을 MenuItemRadioGroup으로 지정
  // (Strict 모드에서는 결과가 null일 수 있으므로 변수에 할당 후 체크하는 것이 좋습니다)
  // const radioGroup = document.querySelector<MenuItemRadioGroup>('#theme-group')
  const radioGroup = document.querySelector('#theme-group')

  if (radioGroup) {
    // 1. 이벤트 리스너로 실시간 변경 감지
    radioGroup.addEventListener('change', (event: Event) => {
      // 일반 Event를 CustomEvent<T> 타입으로 캐스팅하여 detail 내부 값에 안전하게 접근합니다.
      const customEvent = event as CustomEvent<RadioGroupChangeDetail>
      const selectedValue: string = customEvent.detail.value

      console.log('선택된 테마:', selectedValue)

      // 비즈니스 로직 적용
      if (selectedValue === 'dark') {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    })

    // 2. 필요할 때 언제든 현재 선택된 값 직접 꺼내 쓰기
    // const getCurrentValue = (): void => {
    //   // radioGroup이 MenuItemRadioGroup 타입이므로 .value 속성을 에러 없이 인식합니다.
    //   alert(`현재 선택된 값은 ${radioGroup.value} 입니다.`)
    // }
  }
})
