import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/icon'
import '@/components/common/spinner/spinner'
import '@/components/common/text/text'

type TaskStatusVariant = 'running' | 'success' | 'warning' | 'danger'

const variantIcons: Record<Exclude<TaskStatusVariant, 'running'>, string> = {
  success: ICON_NAMES.SUCCESS,
  warning: ICON_NAMES.WARNING,
  danger: ICON_NAMES.DANGER,
}

/**
 * 진행률을 알 수 없는 작업의 현재 상태를 한 줄로 알린다.
 * 채울 막대가 없으므로 시도 횟수·경과 시간처럼 기다릴지 판단할 근거를 글로 준다.
 * 스스로 갱신되는 영역이라 host가 live region을 갖고, 안의 표식은 이름을 갖지 않는다.
 */
@customElement('mm-task-status')
export class TaskStatus extends LitElement {
  static styles = css`
    :host {
      --task-status-icon-color: currentColor;

      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--foreground-subtle-color);
    }

    :host([variant='success']) {
      --task-status-icon-color: var(--foreground-success-color);
    }

    :host([variant='warning']) {
      --task-status-icon-color: var(--foreground-warning-color);
    }

    :host([variant='danger']) {
      --task-status-icon-color: var(--foreground-danger-color);
    }

    mm-icon {
      color: var(--task-status-icon-color);
    }

    .meta {
      display: flex;
      gap: var(--space-2);
    }

    .meta mm-text::before {
      content: '·';
      margin-inline-end: var(--space-2);
    }
  `
  @property({ type: String, reflect: true, useDefault: true }) variant: TaskStatusVariant =
    'running'
  @property({ type: String }) label = ''
  @property({ type: Array }) meta: string[] = []

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'status')
  }

  render() {
    return html`
      ${this.renderIndicator()}
      <mm-text>${this.label}</mm-text>
      ${this.renderMeta()}
    `
  }

  // 스피너도 아이콘도 옆 문구가 이미 말하는 것을 되풀이하므로 이름을 갖지 않는다.
  private renderIndicator() {
    if (this.variant === 'running') {
      return html`
        <mm-spinner aria-hidden="true"></mm-spinner>
      `
    }

    return html`
      <mm-icon name=${variantIcons[this.variant]} aria-hidden="true"></mm-icon>
    `
  }

  private renderMeta() {
    if (!this.meta.length) return nothing

    return html`
      <div class="meta">
        ${this.meta.map(
          item => html`
            <mm-text>${item}</mm-text>
          `,
        )}
      </div>
    `
  }
}
