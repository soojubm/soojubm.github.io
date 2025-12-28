class ListRow extends HTMLElement {
  static get observedAttributes() {
    return ['icon', 'primarytext', 'secondarytext', 'avatar-variant']
  }

  private shadow!: ShadowRoot
  private avatarContainer!: HTMLElement
  private fallbackAvatar!: HTMLElement
  private primaryEl!: HTMLElement
  private secondaryEl!: HTMLElement

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = `
      :host {
        display: flex;
        align-items: center;
        width: 100%;
        gap: var(--space-2);
      }

      ::slotted([slot="action"]) {
        margin-left: auto;
      }

      .text-container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
    this.shadow.appendChild(style)

    this.avatarContainer = document.createElement('div')
    this.avatarContainer.className = 'avatar'

    const avatarSlot = document.createElement('slot')
    avatarSlot.name = 'avatar'

    this.fallbackAvatar = document.createElement('mm-avatar')
    this.fallbackAvatar.setAttribute('variant', 'tertiary')
    this.fallbackAvatar.setAttribute('size', 'large')
    this.shadow.appendChild(this.avatarContainer)

    this.avatarContainer.appendChild(avatarSlot)
    this.avatarContainer.appendChild(this.fallbackAvatar)

    avatarSlot.addEventListener('slotchange', () => {
      const assigned = avatarSlot.assignedElements()
      this.fallbackAvatar.style.display = assigned.length > 0 ? 'none' : 'flex'
    })

    const textContainer = document.createElement('div')
    textContainer.className = 'text-container'

    this.primaryEl = document.createElement('mm-text')
    this.primaryEl.setAttribute('variant', 'body-bold')
    textContainer.appendChild(this.primaryEl)

    this.secondaryEl = document.createElement('mm-text')
    this.secondaryEl.setAttribute('variant', 'label')
    textContainer.appendChild(this.secondaryEl)

    this.shadow.appendChild(textContainer)

    const action = document.createElement('slot')
    action.name = 'action'
    this.shadow.appendChild(action)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) this.render()
  }

  private render() {
    const primaryAttr = this.getAttribute('primarytext')
    this.primaryEl.textContent = primaryAttr || ''

    const secondaryAttr = this.getAttribute('secondarytext')
    if (secondaryAttr) {
      this.secondaryEl.textContent = secondaryAttr
      this.secondaryEl.style.display = 'inline'
    } else {
      this.secondaryEl.textContent = ''
      this.secondaryEl.style.display = 'none'
    }

    const iconAttr = this.getAttribute('icon') || ''
    this.fallbackAvatar.setAttribute('name', iconAttr)

    const avatarVariant = this.getAttribute('avatar-variant') || 'tertiary'
    this.fallbackAvatar.setAttribute('variant', avatarVariant)
  }
}

// if (!customElements.get('mm-list-row')) {
//   customElements.define('mm-list-row', ListRow)
// }
export default ListRow
