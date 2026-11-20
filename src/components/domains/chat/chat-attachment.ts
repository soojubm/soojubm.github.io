import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES, type IconName } from '@/components/common'

import '@/components/common'
import {
  surfaceBaseStyles,
  surfaceElevatedStyles,
} from '@/components/common/surface/surface.styles'

/**
 * AI가 만든 파일·결과물 카드. 호스트가 elevated 면을 직접 갖는다.
 * 눌러 실행하는 행이 아니므로 menu-item이 아니라 list-item을 쓴다.
 * 동작(열기·다운로드)은 trailing slot의 버튼이 각자 맡는다.
 *
 * <mm-chat-attachment label="design-tokens.md" description="정리 완료 · 12KB">
 *   <mm-button slot="trailing" variant="secondary">열기</mm-button>
 * </mm-chat-attachment>
 */
@customElement('mm-chat-attachment')
export class ChatAttachment extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceElevatedStyles};

      max-width: min(85%, 480px);
    }
  `
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon: IconName = ICON_NAMES.DOCUMENT

  render() {
    return html`
      <mm-list-item
        size="medium"
        icon=${this.icon}
        label=${this.label}
        description=${this.description}
        avatar-variant="secondary"
      >
        <slot name="trailing" slot="trailing"></slot>
      </mm-list-item>
    `
  }
}
