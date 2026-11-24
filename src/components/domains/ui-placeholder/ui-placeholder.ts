import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { spaceTokens } from '@/stylesheets/shared.styles'
import type { Space } from '@/stylesheets/shared.types'
import { buildAttributeRules } from '@/utils'

type UiPlaceholderVariant = 'avatar' | 'heading' | 'text'

const variantTokens = {
  avatar: {
    '--ui-placeholder-width': 'var(--size-48)',
    '--ui-placeholder-height': 'var(--size-48)',
    '--ui-placeholder-border-radius': 'var(--border-radius-full)',
  },
  heading: {
    '--ui-placeholder-width': '50%',
    '--ui-placeholder-height': 'var(--size-24)',
  },
  text: {
    '--ui-placeholder-width': '70%',
    '--ui-placeholder-height': 'var(--size-16)',
  },
}

@customElement('mm-ui-placeholder')
export class UiPlaceholder extends LitElement {
  static styles = css`
    :host {
      --ui-placeholder-width: 100%;
      --ui-placeholder-height: var(--size-80);
      --ui-placeholder-background-color: var(--primary-subtle-color);
      --ui-placeholder-border-radius: var(--border-radius-large);

      display: block;
      width: var(--ui-placeholder-width);
    }

    ${unsafeCSS(buildAttributeRules('variant', variantTokens))}
    ${unsafeCSS(buildAttributeRules('space', spaceTokens('--ui-placeholder-height')))}

    :host([space]) .placeholder {
      gap: var(--space-2);
      background: transparent;
    }

    :host([space]) .placeholder::before {
      content: '';
      align-self: stretch;
      width: var(--space-1);
      background: var(--primary-color);
    }

    .placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: var(--ui-placeholder-height);
      box-sizing: border-box;
      border: var(--border-transparent);
      border-radius: var(--ui-placeholder-border-radius);
      background: var(--ui-placeholder-background-color);
    }
  `

  /** 박스 모양. 아바타 원, 제목 줄, 본문 줄 중 하나이며 없으면 기본 박스다. */
  @property({ type: String, reflect: true }) variant?: UiPlaceholderVariant

  /** 박스 대신 그릴 간격 단계. 레이아웃 컴포넌트의 gap과 같은 단계를 쓴다. */
  @property({ type: String, reflect: true }) space?: Space

  render() {
    return html`
      <div class="placeholder" aria-hidden="true"><slot></slot></div>
    `
  }
}
