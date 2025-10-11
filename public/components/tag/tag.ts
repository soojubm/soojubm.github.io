import { makeStyleSheet } from '../../javascripts/components/utils'

class Tag extends HTMLElement {
  #container: HTMLElement

  static get observedAttributes() {
    return ['variant', 'datetime']
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    this.#container = document.createElement(this.datetime ? 'time' : 'span')
    const container = this.#container

    // role=itemlist
    // tag-icon role=image
    container.classList.add('tag')
    container.dataset.variant = this.variant || ''

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    const childrenSlot = document.createElement('slot')

    container.append(iconSlot, childrenSlot)

    const tagStyle = makeStyleSheet('tag')
    shadowRoot.append(tagStyle, container)

    this._updateAttributes()
  }

  get variant() {
    return this.getAttribute('variant')
  }
  set variant(value) {
    if (value) this.setAttribute('variant', value)
  }

  get content() {
    return this.innerHTML
  }

  get datetime() {
    return this.getAttribute('datetime')
  }

  // --- 상태 업데이트 로직 ---

  // 속성 값을 읽어와 내부 DOM에 반영하는 전용 메서드
  // constructor, attributeChangedCallback에서 호출하여 일관성을 유지합니다.
  _updateAttributes() {
    // #container 참조를 사용하여 쿼리 없이 빠르게 접근
    this.#container.dataset.variant = this.variant || ''

    // datetime 속성이 있는 경우에만 반영
    if (this.datetime) {
      this.#container.setAttribute('datetime', this.datetime)
    } else {
      this.#container.removeAttribute('datetime')
    }
  }

  connectedCallback() {
    // 컴포넌트가 DOM에 연결될 때 필요한 추가 작업을 수행합니다.
  }

  // 관찰된 속성(`observedAttributes`)이 변경될 때 호출됩니다.
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // 상태 업데이트 로직을 전담 메서드에 위임
      this._updateAttributes()

      // 주의: this.datetime에 따라 요소 타입(time/span)을 변경하는 로직은
      // 이 시점에서 DOM 노드를 교체해야 하므로 복잡하며, 일반적으로 Custom Element에서는 피합니다.
    }
  }

  disconnectedCallback() {}
}

export default Tag
