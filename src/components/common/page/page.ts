import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * 모든 페이지의 본문 셸. main 랜드마크가 되어 상단 여백·좌우 패딩·최소 높이를 소유한다.
 * 사이드바가 열릴 때 밀려나는 폭은 body가 노출하는 `--sidebar-content-shift`를 따르며,
 * 스스로 가운데 정렬되는 width·layout 변형은 그 대신 기본 좌우 패딩으로 되돌린다.
 */
@customElement('mm-page')
export class Page extends LitElement {
  static styles = css`
    :host {
      --page-padding-left: var(--sidebar-content-shift);

      display: block;
      min-height: calc(100vh - var(--navbar-height));
      padding: var(--layout-main-space-top) var(--layout-padding-inline) calc(var(--space-4) * 6);
      padding-left: var(--page-padding-left);
      box-sizing: border-box;
      position: relative;
      transition: padding-left var(--transition-duration) var(--transition-easing);
    }

    :host([background='subtle']) {
      background-color: var(--gray100);
      box-shadow: 0 0 0 100vmax var(--background-subtle-color);
      clip-path: inset(0 -100vmax);
    }

    :host([full-width]) {
      --page-padding-left: 0;

      padding-right: 0;
    }

    :host([width='small']),
    :host([width='medium']),
    :host([layout='chat']) {
      --page-padding-left: var(--layout-padding-inline);

      margin: 0 auto;
    }

    :host([width='small']) {
      max-width: var(--layout-width-small);
      box-sizing: content-box;
    }

    :host([width='medium']) {
      max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
      box-sizing: content-box;
    }

    :host([layout='chat']) {
      display: flex;
      flex-direction: column;
      max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
      height: calc(100vh - var(--navbar-height));
      padding: 0;
      overflow: hidden;
    }

    :host([layout='chat'][full-width]) {
      max-width: none;
    }

    :host([layout='chat']) ::slotted(mm-chat-room) {
      flex: 1;
      min-height: 0;
    }
  `

  @property({ type: String, reflect: true }) role = 'main'
  @property({ type: String, reflect: true }) width: 'small' | 'medium' | '' = ''
  @property({ type: String, reflect: true }) layout: 'chat' | '' = ''
  @property({ type: String, reflect: true }) background: 'subtle' | '' = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <slot></slot>
    `
  }
}
