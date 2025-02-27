import Input from './input'

class Textfield extends Input {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return [...Input.observedAttributes]
  }

  connectedCallback() {
    // 부모 클래스의 connectedCallback 호출
    super.connectedCallback() // 부모 클래스에서 처리하는 렌더링을 수행

    // Textfield에서 추가로 필요한 처리 (옵션)
    // 예: 추가적인 DOM 요소 삽입, 클래스 추가 등
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Textfield
