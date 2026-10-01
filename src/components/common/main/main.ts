import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { MEDIA } from '@/constants'

/**
 * 모든 페이지의 본문 셸. main 랜드마크가 되어 상단 여백·좌우 패딩·최소 높이를 소유한다.
 * 상단 바나 푸터는 이 안이 아니라 형제로 둔다.
 * 사이드바가 열릴 때 밀려나는 폭은 body가 노출하는 `--sidebar-content-shift`를 따르며,
 * 스스로 가운데 정렬되는 width·layout 변형은 그 대신 기본 좌우 패딩으로 되돌린다.
 * `layout="split"`은 첫 자식(mm-page-header 또는 이를 묶은 레이아웃)을 왼쪽 칼럼에 sticky로 두고 나머지 콘텐츠를 오른쪽에 둔다.
 * 칼럼 간격은 좌우 패딩과 같아, 오른쪽 칼럼의 콘텐츠 프레임이 패딩만큼 바깥으로 나와도 왼쪽 칼럼과 겹치지 않는다.
 * 좁은 폭에서는 한 칼럼으로 접히며 sticky도 풀린다.
 */
@customElement('mm-main')
export class Main extends LitElement {
  static styles = css`
    :host {
      --main-padding-left: var(--sidebar-content-shift);

      display: block;
      min-height: calc(100vh - var(--navbar-height));
      padding: var(--layout-main-space-top) var(--layout-padding-inline) calc(var(--space-4) * 6);
      padding-left: var(--main-padding-left);
      box-sizing: border-box;
      background-color: var(--background-color);
      position: relative;
      transition: padding-left var(--transition-duration) var(--transition-easing);
    }

    :host([background='subtle']) {
      background-color: var(--background-subtle-color);
      box-shadow: 0 0 0 100vmax var(--background-subtle-color);
      clip-path: inset(0 -100vmax);
    }

    :host([full-width]) {
      --main-padding-left: 0;

      padding-right: 0;
    }

    :host([width='small']),
    :host([width='narrow']) {
      --main-padding-left: var(--layout-padding-inline);

      max-width: var(--layout-width-small);
      margin: 0 auto;
      box-sizing: content-box;
    }

    :host([width='narrow']) {
      max-width: var(--layout-width-narrow);
    }

    :host([layout='chat']) {
      display: flex;
      flex-direction: column;
      height: calc(100vh - var(--navbar-height));
      padding: 0;
      overflow: hidden;
    }

    :host([layout='chat']) ::slotted(mm-chat-room) {
      flex: 1;
      min-height: 0;
    }

    :host([layout='split']) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--layout-padding-inline);
    }

    :host([layout='split']) ::slotted(:first-child) {
      align-self: start;
      position: sticky;
      top: calc(var(--navbar-height) + var(--layout-main-space-top));
    }

    @media ${MEDIA.narrow} {
      :host([layout='split']) {
        grid-template-columns: minmax(0, 1fr);
      }

      :host([layout='split']) ::slotted(:first-child) {
        position: static;
      }
    }
  `
  @property({ type: String, reflect: true }) width: 'small' | 'narrow' | '' = ''
  @property({ type: String, reflect: true }) layout: 'chat' | 'split' | '' = ''
  @property({ type: String, reflect: true }) background: 'subtle' | '' = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'main')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
