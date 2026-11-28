import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES, type IconName } from '@/components/common'

import '@/components/common'
import {
  surfaceBaseStyles,
  surfaceElevatedStyles,
} from '@/components/common/surface/surface.styles'

@customElement('fff-chat-attachment')
export class ChatAttachment extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceElevatedStyles};

      max-width: min(85%, calc(var(--size-80) * 6));
    }
  `
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon: IconName = ICON_NAMES.DOCUMENT

  render() {
    return html`
      <fff-list-item
        size="medium"
        icon=${this.icon}
        label=${this.label}
        description=${this.description}
        .avatar=${{ variant: 'secondary' }}
      >
        <slot name="trailing" slot="trailing"></slot>
      </fff-list-item>
    `
  }
}
