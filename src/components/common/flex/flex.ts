import { LitElement, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import { resolveSpaceToken } from '@/utils'

type Direction = 'row' | 'column'
type JustifyAlias = 'start' | 'center' | 'end' | 'between' | 'around'
type AlignAlias = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type JustifyContent = JustifyAlias | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
type AlignItems = AlignAlias | 'flex-start' | 'flex-end'
type FlexAs = 'div' | 'header' | 'section' | 'footer' | 'nav'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/**
 * 범용 flexbox 레이아웃 프리미티브.
 * 의미별 그룹핑(button/tag/avatar 등)은 각 시멘틱 컴포넌트가 담당하고,
 * mm-flex 는 순수 레이아웃만 책임진다.
 *
 * 레이아웃은 reflect된 attribute를 받는 :host 셀렉터로만 적용한다(인라인 스타일 없음).
 * gap만 임의 값이라 willUpdate에서 `--flex-gap` custom property로 넘긴다.
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

      :host([justify-content='center']) {
        justify-content: center;
      }
      :host([justify-content='end']),
      :host([justify-content='flex-end']) {
        justify-content: flex-end;
      }
      :host([justify-content='between']),
      :host([justify-content='space-between']) {
        justify-content: space-between;
      }
      :host([justify-content='around']),
      :host([justify-content='space-around']) {
        justify-content: space-around;
      }

      :host([align-items='center']) {
        align-items: center;
      }
      :host([align-items='start']),
      :host([align-items='flex-start']) {
        align-items: flex-start;
      }
      :host([align-items='end']),
      :host([align-items='flex-end']) {
        align-items: flex-end;
      }
      :host([align-items='baseline']) {
        align-items: baseline;
      }

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

  @property({ type: String, reflect: true }) direction: Direction = 'row'
  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: JustifyContent = 'flex-start'
  @property({ type: String, attribute: 'align-items', reflect: true }) alignItems: AlignItems =
    'stretch'
  @property({ type: String, reflect: true }) gap = '0'
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

  /** gap은 host의 `--flex-gap`으로, 기본 as="div"의 group role은 host attribute로 반영한다. */
  protected willUpdate() {
    this.style.setProperty('--flex-gap', resolveSpaceToken(this.gap))

    if (this.as === 'div') {
      this.setAttribute('role', 'group')
      return
    }

    this.removeAttribute('role')
  }
}
