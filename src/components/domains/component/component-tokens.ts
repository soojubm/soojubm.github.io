import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/text/semantics/heading'
import {
  componentTokensStyles,
  tokenStyles,
} from '@/components/domains/component/component-tokens.styles'

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

/**
 * 개별 CSS 커스텀 프로퍼티(토큰) 행.
 * mm-component-tokens 안에서만 사용합니다.
 */
@customElement('mm-token')
export class Token extends LitElement {
  static styles = [tokenStyles]

  @property({ type: String }) name = ''
  @property({ type: String }) default = ''

  render() {
    return html`
      <mm-flex align-items="center" gap="3">
        <!-- category-tag -->
        <mm-keyword-tag>Dimension</mm-keyword-tag>
        <mm-meta-item
          layout="stacked"
          label=${this.formatName()}
          value=${this.formatDefault()}
        ></mm-meta-item>
      </mm-flex>
    `
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

  render() {
    return html`
      <section class="component-content-frame">
        <!-- <mm-heading>Component Tokens</mm-heading> -->
        <mm-flex direction="column" gap="2"><slot></slot></mm-flex>
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
