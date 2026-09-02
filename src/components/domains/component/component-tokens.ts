import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/heading'
import '@/components/common/tag/semantics/keyword-tag'
import { componentTokensStyles, tokenStyles } from '@/components/domains/component/component.styles'
import { arrayAttributeConverter } from '@/utils'

export interface ComponentTokenItemData {
  name: string
  default: string
  // 이 토큰 값을 재할당하는 prop. prop 프리셋 밖의 값을 잡을 때 이 토큰을 override 한다.
  prop?: string
}

// 토큰 이름의 단어를 의미 그룹으로 묶어, 서로 다른 그룹의 경계에서만 구분자를 '.'으로 바꿔 구조를 드러낸다.
// 위에서부터 먼저 매칭되는 그룹을 사용하므로 더 구체적인 그룹을 앞에 둔다.
// state는 dimension·surface에 적용되는 변형이므로 겹치는 단어가 없어 순서와 무관하고,
// surface는 border-width처럼 dimension 단어(width)를 포함하는 합성어를 갖고 있어 dimension보다 앞에 둔다.
const WORD_CATEGORIES = [
  {
    name: 'state',
    words: ['hover', 'active', 'focus', 'disabled', 'selected', 'pressed', 'checked'],
  },
  {
    name: 'surface',
    words: [
      'border',
      'border-radius',
      'border-color',
      'border-width',
      'background-color',
      'backdrop-filter',
      'shadow',
      'blur',
      'accent',
      'line-color',
      'line-width',
    ],
  },
  {
    name: 'dimension',
    words: [
      'width',
      'min-width',
      'height',
      'max-height',
      'margin',
      'padding',
      'padding-inline',
      'gap',
      'size',
      'space',
      'spacing',
      'offset',
      'text-size',
      'text-color',
      'text-weight',
    ],
  },
] as const

// state는 dimension·surface에 딸린 변형이라 단독 카테고리가 아니라 base 뒤에 이어 붙인다.
const CATEGORY_DISPLAY_ORDER = ['dimension', 'surface', 'state'] as const

/**
 * 개별 CSS 커스텀 프로퍼티(토큰) 행.
 * mm-component-tokens 안에서만 사용합니다.
 */
@customElement('mm-token')
export class Token extends LitElement {
  static styles = [tokenStyles]

  @property({ type: String }) name = ''
  @property({ type: String }) default = ''
  @property({ type: String }) prop = ''

  render() {
    return html`
      <div class="token-row">
        <div class="token-category">${this.renderCategoryTag()}</div>
        <mm-meta-item layout="stacked" label=${this.formatName()}></mm-meta-item>
        ${this.renderPropTag()}
      </div>
    `
  }

  private renderPropTag() {
    if (!this.prop) return nothing

    return html`
      <div class="token-prop">
        <mm-keyword-tag icon="arrow-left">${this.prop}</mm-keyword-tag>
      </div>
    `
  }

  private renderCategoryTag() {
    const categories = this.categories()
    if (!categories.length) return nothing

    return html`
      <mm-keyword-tag>
        ${categories.map(category => this.capitalize(category)).join('-')}
      </mm-keyword-tag>
    `
  }

  private capitalize(word: string) {
    return `${word[0].toUpperCase()}${word.slice(1)}`
  }

  // 이름을 이루는 단어들이 속한 카테고리를 중복 없이 표시 순서(dimension/surface → state)로 반환한다.
  private categories() {
    const parts = this.name.split('-')
    const found = new Set(parts.map((_, index) => this.categoryName(index, parts)))

    return CATEGORY_DISPLAY_ORDER.filter(category => found.has(category))
  }

  // var(--radius-full)처럼 값이 토큰 참조면 var(--...)로 감싼 부분을 걷어내 토큰 이름만 남긴다.
  private formatDefault() {
    return this.default.replace(/var\(--([\w-]+)\)/g, '$1')
  }

  // state/surface/dimension 그룹이 바뀌는 경계에서만 '-'를 '.'으로 바꿔, 같은 그룹의 합성어(border-radius 등)는
  // 계속 '-'로 붙어 보이게 하면서 그룹 전환은 시각적으로 구분되게 한다.
  private formatName() {
    const parts = this.name.split('-')
    const categories = parts.map((_, index) => this.categoryName(index, parts))

    return parts.reduce((result, word, index) => {
      if (index === 0) return word

      const sameCategory = categories[index] && categories[index] === categories[index - 1]
      return `${result}${sameCategory ? '-' : '.'}${word}`
    }, '')
  }

  private categoryName(index: number, parts: string[]) {
    const category = WORD_CATEGORIES.find(({ words }) =>
      words.some(word => this.matchesWord(parts, index, word)),
    )
    return category?.name ?? ''
  }

  // border-radius, background-color처럼 '-'로 이어진 카테고리 단어는 조각을 이어붙인 문자열이
  // 아니라, 인접한 조각들이 각 자리에 정확히 대응하는지로 판단해 엉뚱한 이웃 조각까지
  // 함께 묶이지 않게 한다.
  private matchesWord(parts: string[], index: number, word: string) {
    const wordParts = word.split('-')
    const firstStart = Math.max(0, index - wordParts.length + 1)
    const starts = Array.from(
      { length: index - firstStart + 1 },
      (_, offset) => firstStart + offset,
    )

    return starts.some(start =>
      wordParts.every((wordPart, offset) => parts[start + offset]?.includes(wordPart)),
    )
  }
}

/**
 * 컴포넌트 CSS 커스텀 프로퍼티(토큰) 목록.
 * mm-component-props와 동일한 레이아웃으로 토큰을 소개합니다.
 */
@customElement('mm-component-tokens')
export class ComponentTokens extends LitElement {
  static styles = componentTokensStyles

  @property({
    attribute: 'tokens',
    converter: arrayAttributeConverter<ComponentTokenItemData>(),
  })
  tokens: ComponentTokenItemData[] = []

  render() {
    return html`
      <section class="component-content-frame" style="margin-top: var(--space-4)">
        <!-- <mm-heading>Component Tokens</mm-heading> -->
        <div class="token-list">
          ${this.tokens.map(
            token =>
              html`
                <mm-token
                  name=${token.name}
                  default=${token.default}
                  prop=${token.prop ?? ''}
                ></mm-token>
              `,
          )}
        </div>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token': Token
    'mm-component-tokens': ComponentTokens
  }
}
