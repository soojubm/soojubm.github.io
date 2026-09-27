import { LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js'

import {
  justifyContentTokens,
  resetStyles,
  spaceTokens,
  type JustifyContent,
  type Space,
  type FlexDirection,
  type FlexWrap,
} from '@/stylesheets/shared.styles'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
type FlexAs = 'div' | 'header' | 'section' | 'footer' | 'nav'

const flexAlignItemsTokens: AttributeTokens<Exclude<AlignItems, 'stretch'>> = {
  center: { 'align-items': 'center' },
  'flex-start': { 'align-items': 'flex-start' },
  'flex-end': { 'align-items': 'flex-end' },
  baseline: { 'align-items': 'baseline' },
}

/**
 * 범용 flexbox 레이아웃 프리미티브.
 * 의미별 그룹핑(button/tag/avatar 등)은 각 시멘틱 컴포넌트가 담당하고,
 * mm-flex 는 순수 레이아웃만 책임진다.
 *
 * 레이아웃은 reflect된 attribute를 받는 :host 셀렉터로만 적용한다(인라인 스타일 없음).
 * 기본(as="div")은 host 자체가 flex 컨테이너다. 시멘틱 랜드마크가 필요한 경우(as="section" 등)에만
 * 내부 요소를 컨테이너로 쓰며, 레이아웃 값은 host 계산값에 남아 있어 `inherit`으로 그대로 내려간다.
 */
@customElement('mm-flex')
export class Flex extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --flex-gap: 0;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        gap: var(--flex-gap);
      }

      /* 시멘틱 래퍼를 쓰는 경우 host는 단순 박스이고 내부 .flex가 flex 컨테이너다. */
      :host([as='header']),
      :host([as='section']),
      :host([as='footer']),
      :host([as='nav']) {
        display: block;
      }

      :host([direction='column']) {
        flex-direction: column;
      }

      :host([wrap='wrap']) {
        flex-wrap: wrap;
      }
      :host([wrap='wrap-reverse']) {
        flex-wrap: wrap-reverse;
      }

      ${unsafeCSS(buildAttributeRules('justify-content', justifyContentTokens))}

      ${unsafeCSS(buildAttributeRules('align-items', flexAlignItemsTokens))}

      ${unsafeCSS(buildAttributeRules('gap', spaceTokens('--flex-gap')))}

      :host([stretch]) ::slotted(*) {
        flex: 1;
      }

      .flex {
        display: flex;
        flex-direction: inherit;
        justify-content: inherit;
        align-items: inherit;
        flex-wrap: inherit;
        gap: inherit;
        width: 100%;
      }
    `,
  ]
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: JustifyContent = 'flex-start'
  @property({ type: String, attribute: 'align-items', reflect: true }) alignItems: AlignItems =
    'stretch'
  @property({ type: String, reflect: true }) gap: Space = '0'
  @property({ type: String, reflect: true }) as: FlexAs = 'div'
  @property({ type: String, reflect: true }) wrap: FlexWrap = 'nowrap'
  @property({ type: Boolean, reflect: true }) stretch = false

  render() {
    if (this.as === 'div') {
      return html`
        <slot></slot>
      `
    }

    const tag = unsafeStatic(this.as)
    // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html -- lit/static-html의 태그 자리 바인딩이라 정상이다.
    return html`<${tag} class="flex"><slot></slot></${tag}>`
  }

  /** 기본 as="div"의 group role은 host attribute로 반영한다. */
  protected willUpdate() {
    if (this.as === 'div') {
      this.setAttribute('role', 'group')
      return
    }

    this.removeAttribute('role')
  }
}
