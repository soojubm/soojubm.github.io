import { makeStyleSheet } from '../../javascripts/components/utils'

class TextList extends HTMLElement {
  // 텍스트 배열을 받을 속성 타입 정의
  private texts: string[] = []

  constructor() {
    super()
    this.attachShadow({ mode: 'open' }) // Shadow DOM 활성화
  }

  // 웹 컴포넌트가 DOM에 연결될 때 호출되는 메서드
  connectedCallback(): void {
    const textsAttr = this.getAttribute('texts')
    if (textsAttr) {
      try {
        // 문자열로 전달된 텍스트 배열을 JSON으로 파싱
        this.texts = JSON.parse(textsAttr)
      } catch (error) {
        console.error('Invalid JSON format for "texts" attribute:', error)
      }
    }
    this.render()
  }

  // 텍스트 배열을 DOM에 추가하는 렌더링 메서드
  private render(): void {
    const ul = document.createElement('ul') // ul 요소 생성
    ul.classList.add('checklist')

    // 텍스트 배열을 순회하면서 각 항목을 li로 추가
    this.texts.forEach((text: string) => {
      const li = document.createElement('li')
      li.textContent = text
      ul.appendChild(li) // ul에 li 추가
    })

    // Shadow DOM에 ul 삽입
    // this.shadowRoot!.innerHTML = '' // 기존 내용을 지우고
    this.shadowRoot!.appendChild(makeStyleSheet('text'))
    this.shadowRoot!.appendChild(ul)
  }
}

export default TextList
