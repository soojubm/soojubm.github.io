import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { STATUS_ICONS, type StatusTone } from '@/components/common/icon/icon-names'
import '@/components/common/dot/dot'
import '@/components/common/icon'
import '@/components/common/separator/semantics/bullet'
import '@/components/common/spinner/spinner'
import '@/components/common/text/text'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

type ProcessStatusVariant =
  | 'running'
  | 'pending'
  | Extract<StatusTone, 'success' | 'warning' | 'error'>

const processStatusVariantTokens: AttributeTokens<
  Exclude<ProcessStatusVariant, 'running' | 'pending' | 'success'>
> = {
  warning: { '--process-status-icon-color': 'var(--foreground-warning-color)' },
  error: { '--process-status-icon-color': 'var(--foreground-danger-color)' },
}

/**
 * 진행률을 알 수 없는 작업의 현재 상태를 한 줄로 알린다.
 * 채울 막대가 없으므로 시도 횟수·경과 시간처럼 기다릴지 판단할 근거를 글로 준다.
 * 스스로 갱신되는 영역이라 host가 live region을 갖고, 안의 표식은 이름을 갖지 않는다.
 * 여러 단계를 이어 보여 줄 때는 mm-process-status-list로 묶고, 아직 시작 전인 단계는 pending으로 둔다.
 */
@customElement('mm-process-status')
export class ProcessStatus extends LitElement {
  static styles = css`
    :host {
      --process-status-icon-color: currentColor;

      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--foreground-subtle-color);
    }

    ${unsafeCSS(buildAttributeRules('variant', processStatusVariantTokens))}

    /* 스피너·점·아이콘의 크기가 달라도 문구의 시작 위치가 같도록 같은 크기의 칸에 담는다. */
    .indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--size-16);
      height: var(--size-16);
    }

    mm-icon {
      color: var(--process-status-icon-color);
    }

    .meta {
      display: flex;
      gap: var(--space-2);
    }
  `
  @property({ type: String, reflect: true, useDefault: true }) variant: ProcessStatusVariant =
    'running'
  @property({ type: String }) label = ''
  @property({ type: Array }) meta: string[] = []

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'status')
  }

  render() {
    return html`
      <span class="indicator">${this.renderIndicator()}</span>
      <mm-text>${this.label}</mm-text>
      ${this.renderMeta()}
    `
  }

  // 스피너도 아이콘도 옆 문구가 이미 말하는 것을 되풀이하므로 이름을 갖지 않는다.
  private renderIndicator() {
    if (this.variant === 'pending') {
      return html`
        <mm-dot></mm-dot>
      `
    }

    if (this.variant === 'running') {
      return html`
        <mm-spinner aria-hidden="true"></mm-spinner>
      `
    }

    return html`
      <mm-icon name=${STATUS_ICONS[this.variant]} aria-hidden="true"></mm-icon>
    `
  }

  private renderMeta() {
    if (!this.meta.length) return nothing

    return html`
      <div class="meta">
        ${this.meta.map(
          item => html`
            <mm-bullet></mm-bullet>
            <mm-text>${item}</mm-text>
          `,
        )}
      </div>
    `
  }
}
