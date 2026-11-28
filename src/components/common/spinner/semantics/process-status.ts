import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { STATUS_ICONS, type StatusTone } from '@/components/common/icon/icon-names'
import '@/components/common/dot/dot'
import '@/components/common/icon'
import '@/components/common/separator/semantics/bullet'
import '@/components/common/spinner/spinner'
import '@/components/common/text/text'

type ProcessStatusVariant =
  | 'running'
  | 'pending'
  | Extract<StatusTone, 'success' | 'warning' | 'error'>

export interface ProcessStatusItem {
  label: string
  variant?: ProcessStatusVariant
  time?: string
}

@customElement('fff-process-status')
export class ProcessStatus extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .item {
      --process-status-icon-color: currentColor;

      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--foreground-subtle-color);
    }

    .item[variant='warning'] {
      --process-status-icon-color: var(--foreground-warning-color);
    }

    .item[variant='error'] {
      --process-status-icon-color: var(--foreground-danger-color);
    }

    /* 스피너·점·아이콘의 크기가 달라도 문구의 시작 위치가 같도록 같은 크기의 칸에 담는다. */
    .indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--size-16);
      height: var(--size-16);
    }

    fff-icon {
      color: var(--process-status-icon-color);
    }
  `
  @property({ type: Array }) items: ProcessStatusItem[] = []

  // 항목마다 live region이면 겹쳐 읽히므로, 목록 전체가 하나의 live region이 된다.
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
    this.setAttribute('aria-live', 'polite')
  }

  render() {
    return html`
      ${this.items.map(item => this.renderItem(item))}
    `
  }

  private renderItem({ label, variant = 'running', time }: ProcessStatusItem) {
    return html`
      <div class="item" role="listitem" variant=${variant}>
        <span class="indicator">${this.renderIndicator(variant)}</span>
        <fff-text>${label}</fff-text>
        ${this.renderTime(time)}
      </div>
    `
  }

  // 스피너도 아이콘도 옆 문구가 이미 말하는 것을 되풀이하므로 이름을 갖지 않는다.
  private renderIndicator(variant: ProcessStatusVariant) {
    if (variant === 'pending') {
      return html`
        <fff-dot></fff-dot>
      `
    }

    if (variant === 'running') {
      return html`
        <fff-spinner aria-hidden="true"></fff-spinner>
      `
    }

    return html`
      <fff-icon name=${STATUS_ICONS[variant]} aria-hidden="true"></fff-icon>
    `
  }

  private renderTime(time?: string) {
    if (!time) return nothing

    return html`
      <fff-bullet></fff-bullet>
      <fff-text>${time}</fff-text>
    `
  }
}
