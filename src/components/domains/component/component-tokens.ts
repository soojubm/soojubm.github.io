import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/text/semantics/heading'
import { componentTokensStyles, tokenStyles } from '@/components/domains/component/component-tokens.styles'

// 토큰 이름의 단어를 의미 그룹으로 묶어 그룹마다 한 색을 준다.
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
      'background',
      'background-color',
      'text-color',
      'shadow',
      'blur',
      'accent',
      'line-color',
      'line-width',
    ],
  },
  {
    name: 'dimension',
    words: ['margin', 'padding', 'gap', 'width', 'height', 'size', 'space', 'spacing', 'offset', 'text-size'],
  },
] as const

/**
 * 개별 CSS 커스텀 프로퍼티(토큰) 행.
 * mm-component-tokens 안에서만 사용합니다.
 */
@customElement('mm-token')
export class Token extends LitElement {
  static styles = tokenStyles

  @property({ type: String }) name = ''
  @property({ type: String }) default = ''

  render() {
    return html`
      <dt>${this.renderName()}</dt>
      <dd class="value">${this.renderDefaultValue()}</dd>
    `
  }

  // 토큰 이름을 dash 단위로 나눠, 상태를 뜻하는 단어에만 색을 입혀 네이밍 구조를 드러낸다.
  // span 사이 공백이 생기지 않도록 템플릿을 한 줄로 유지한다.
  private renderName() {
    const parts = this.name.split('-')
    const classes = parts.map((_, index) => this.wordClass(index, parts))
    return parts.map((word, index) => this.renderWord(word, index, classes))
  }

  private renderWord(word: string, index: number, classes: string[]) {
    const dash = index > 0 ? '-' : ''
    // prettier-ignore
    return html`<span class=${this.dashClass(index, classes)}>${dash}</span><span class=${classes[index]}>${word}</span>`
  }

  // 앞뒤 단어가 같은 카테고리로 물들면 그 사이 dash도 같은 색으로 이어지게 한다.
  private dashClass(index: number, classes: string[]) {
    const category = classes[index]
    if (index > 0 && category && category === classes[index - 1]) return `dash ${category}`

    return 'dash'
  }

  // border-radius, background-color처럼 '-'로 이어진 카테고리 단어는 조각을 이어붙인 문자열이
  // 아니라, 인접한 조각들이 각 자리에 정확히 대응하는지로 판단해 엉뚱한 이웃 조각까지
  // 함께 물들지 않게 한다.
  private wordClass(index: number, parts: string[]) {
    const category = WORD_CATEGORIES.find(({ words }) => words.some(word => this.matchesWord(parts, index, word)))
    if (!category) return ''

    return `word-${category.name}`
  }

  private matchesWord(parts: string[], index: number, word: string) {
    const wordParts = word.split('-')
    const firstStart = Math.max(0, index - wordParts.length + 1)

    for (let start = firstStart; start <= index; start++) {
      if (wordParts.every((wordPart, offset) => parts[start + offset]?.includes(wordPart))) return true
    }

    return false
  }

  private renderDefaultValue() {
    if (!this.default) return nothing

    return html`
      <mm-text>${this.default}</mm-text>
    `
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
      <section class="component-tokens component-content-frame">
        <mm-heading class="component-tokens-title">Component Tokens</mm-heading>
        <dl>
          <slot></slot>
        </dl>
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
