import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/text/semantics/heading'
import { componentTokensStyles, tokenStyles } from '@/components/domains/component/tokens.styles'

// 토큰 이름의 단어를 의미 그룹으로 묶어 그룹마다 한 색을 준다.
// 위에서부터 먼저 매칭되는 그룹을 사용하므로 더 구체적인 그룹을 앞에 둔다.
const WORD_CATEGORIES = [
  {
    name: 'state',
    words: ['hover', 'active', 'focus', 'disabled', 'selected', 'pressed', 'checked'],
  },
  {
    name: 'property',
    words: ['border', 'text', 'background', 'shadow'],
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
    return this.name.split('-').map((word, index) => this.renderWord(word, index))
  }

  private renderWord(word: string, index: number) {
    const dash = index > 0 ? '-' : ''
    // prettier-ignore
    return html`<span class="dash">${dash}</span><span class=${this.wordClass(word)}>${word}</span>`
  }

  private wordClass(word: string) {
    const category = WORD_CATEGORIES.find(({ words }) => words.some(name => word.includes(name)))
    if (!category) return ''

    return `word-${category.name}`
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
