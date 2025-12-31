import { makeStyleSheet } from '../../javascripts/components/utils'

class Feature extends HTMLElement {
  private root: ShadowRoot
  private container!: HTMLElement
  private avatar!: HTMLElement
  private iconEl!: HTMLElement
  private header!: HTMLElement
  private slotEl!: HTMLSlotElement

  static get observedAttributes() {
    return ['icon', 'titletext', 'description']
  }

  // ---------------------------
  // 아이콘 타입 매핑
  // ---------------------------
  private iconMap: Record<string, string> = {
    interactive: 'cursor-pointer',
    easyScanning: 'eye-circle',
    groupable: 'information-circle',
    check: 'check-circle',
    warning: 'warning-triangle',
    error: 'alert-circle',
    user: 'user-circle',

    // 필요할 때 계속 추가
    // success: 'check-badge',
    // arrow: 'arrow-right',
  }

  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.render()
  }

  // ---------------------------
  // featureData로 UI 속성 묶음
  // ---------------------------
  get featureData() {
    const iconKey = this.getAttribute('icon') ?? ''
    return {
      name: this.getAttribute('titletext') ?? '',
      description: this.getAttribute('description') ?? '',

      // 매핑된 아이콘 제공
      iconName: this.iconMap[iconKey] ?? iconKey,
    }
  }

  // ---------------------------
  // Lifecycle
  // ---------------------------
  connectedCallback() {
    this.update()
  }

  attributeChangedCallback() {
    this.update()
  }

  // ---------------------------
  // DOM 최초 구성
  // ---------------------------
  private render() {
    this.container = document.createElement('div')
    this.container.classList.add('feature-item')

    // avatar
    this.avatar = document.createElement('mm-avatar')
    this.avatar.setAttribute('variant', 'secondary')
    this.avatar.setAttribute('size', 'medium')

    this.iconEl = document.createElement('mm-icon')
    this.iconEl.setAttribute('size', 'medium')
    this.avatar.appendChild(this.iconEl)

    // header
    this.header = document.createElement('mm-title-with-description')
    this.header.classList.add('feature-item-header')
    this.header.setAttribute('level', '4')

    // slot
    this.slotEl = document.createElement('slot')

    const avatarStyle = document.createElement('style')
    avatarStyle.textContent = `
      mm-avatar::part(avatar) {
        // border-color: var(--color-foreground) !important;
      }
    `

    this.root.appendChild(avatarStyle)
    this.root.appendChild(this.container)
    this.container.append(this.avatar, this.header, makeStyleSheet('feature'), this.slotEl)
  }

  // ---------------------------
  // DOM 업데이트
  // ---------------------------
  private update() {
    const { name, iconName, description } = this.featureData

    this.iconEl.setAttribute('name', iconName)
    this.header.setAttribute('title', name)
    this.header.setAttribute('description', description)
  }
}

export default Feature
