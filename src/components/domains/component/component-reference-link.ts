import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { referenceCellStyles } from '@/components/domains/component/reference-cell.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-component-reference-link')
export class ComponentReferenceLink extends LitElement {
  static styles = [resetStyles, referenceCellStyles]
  @property({ type: String }) href = ''
  @property({ type: Boolean }) external = false

  render() {
    return html`
      <a
        href=${this.href}
        target=${this.external ? '_blank' : '_self'}
        rel=${this.external ? 'noopener noreferrer' : nothing}
      >
        <slot></slot>
        ${this.renderExternalIcon()}
      </a>
    `
  }

  private renderExternalIcon() {
    if (!this.external) return nothing

    return html`
      <fff-icon name=${ICON_NAMES.EXTERNAL_LINK} aria-hidden="true"></fff-icon>
    `
  }
}
