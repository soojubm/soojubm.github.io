import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { avatarStyles } from './avatar.styles'

@customElement('mm-avatar')
class Avatar extends LitElement {
  @property({ type: String }) variant = 'primary'
  @property({ type: String }) size = 'medium'
  @property({ type: String }) src = ''
  @property({ type: String }) icon = ''
  @property({ type: String, attribute: 'badge-label' }) badgeLabel = ''

  static styles = [avatarStyles]

  render() {
    const isLargeIcon = this.size === 'large' || this.size === 'huge'
    const iconSize = isLargeIcon ? 'large' : 'medium'
    const hasSlottedText = Boolean(this.textContent?.trim())

    return html`
      <figure
        part="avatar"
        role="img"
        data-size="${this.size}"
        data-variant="${this.variant}"
        aria-label="${this.ariaLabel || ''}"
      >
        ${this.src ? html`<img src="${this.src}" alt="${this.ariaLabel || 'avatar'}" />` : ''}
        ${this.icon ? html`<mm-icon name="${this.icon}" size="${iconSize}"></mm-icon>` : ''}
        ${!this.src && !this.icon && !hasSlottedText
          ? html`<mm-icon name="people-tag" size="${iconSize}"></mm-icon>`
          : html`<slot></slot>`}
        ${this.badgeLabel ? html`<mm-tag variant="primary">${this.badgeLabel}</mm-tag>` : ''}
      </figure>
    `
  }
}

export default Avatar

// Attach the created elements to the shadow dom
// <span class="avatar-badge"></span>
// container.appendChild(label)
// label.textContent = this.label

// if (this.type === 'primary') container.classList.add('is-primary')
