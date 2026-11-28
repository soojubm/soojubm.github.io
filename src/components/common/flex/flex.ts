import { LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js'

import { justifyContentTokens, resetStyles, spaceTokens } from '@/stylesheets/shared.styles'
import type { JustifyContent, Space, FlexDirection, FlexWrap } from '@/stylesheets/shared.types'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
type FlexAs = 'div' | 'header' | 'section' | 'footer' | 'nav'

const flexAlignItemsTokens: AttributeTokens<Exclude<AlignItems, 'stretch'>> = {
  center: { 'align-items': 'center' },
  'flex-start': { 'align-items': 'flex-start' },
  'flex-end': { 'align-items': 'flex-end' },
  baseline: { 'align-items': 'baseline' },
}

@customElement('fff-flex')
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
