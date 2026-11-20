import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { renderChatDate } from '@/components/domains/chat/chat.helpers'

import '@/components/common'

/**
 * 대화 속 날짜 구분. datetime에 ISO 날짜(2022-05-17)를 주면 화면용 문구로 바꿔 보인다.
 */
@customElement('mm-chat-date')
export class ChatDate extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }
  `
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <mm-tag>${renderChatDate(this.datetime)}</mm-tag>
    `
  }
}
