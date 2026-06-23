import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { OutsideClickController } from '../../../controllers/outside-click-controller'
import type { IconName } from '../../icon-button/semantics/icon-names'
import '../../button/button'
import '../../button/button-group'
import '../../icon/icon'
import '../../text/text'
import '../../text/semantics/paragraph'
import { emit } from '../../../utils/emit'

/**
 * AI 응답 출처 소스 칩. 클릭 시 inline sheet로 상세 정보를 표시합니다.
 * mm-chat-source-group 안에서 사용합니다.
 */
@customElement('mm-chat-source')
export class ChatSource extends LitElement {
  /** 소스 URL */
  @property({ type: String }) href = ''
  /** 시트에 표시할 제목 */
  @property({ type: String }) heading = ''
  /** 시트에 표시할 설명 */
  @property({ type: String }) description = ''
  /** 칩에 표시할 레이블 (없으면 도메인 자동 추출) */
  @property({ type: String }) label = ''
  /** 칩/시트에 표시할 Iconoir 아이콘 이름 */
  @property({ type: String }) icon?: IconName

  @state() private _open = false

  _setOpen(open: boolean) {
    this._open = open
  }

  private get _domain() {
    if (this.label) return this.label
    try {
      return new URL(this.href).hostname.replace(/^www\./, '')
    } catch {
      return this.href
    }
  }

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-block;
      }

      mm-icon {
        font-size: 0.875rem;
      }
    `,
  ]

  private _handleClick(e: Event) {
    e.stopPropagation()
    emit(this, 'source-toggle', { source: this, open: !this._open })
  }

  render() {
    return html`
      <mm-button
        variant="tertiary"
        size="small"
        aria-expanded=${String(this._open)}
        aria-haspopup="dialog"
        @click=${this._handleClick}
      >
        ${this.icon
          ? html`
              <mm-icon name=${this.icon}></mm-icon>
            `
          : ''}
        ${this._domain}
      </mm-button>
    `
  }
}

/**
 * 소스 칩 그룹 + inline sheet 컨테이너.
 * <mm-chat-source-group> 안에 <mm-chat-source>를 넣으면,
 * 칩 클릭 시 그룹 바로 아래에 inline sheet가 열립니다.
 */
@customElement('mm-chat-source-group')
export class ChatSourceGroup extends LitElement {
  @state() private _activeSource: ChatSource | null = null

  // 바깥을 누르면 열려 있는 소스 시트를 닫는다.
  private _outsideClick = new OutsideClickController(
    this,
    () => {
      this._activeSource?._setOpen(false)
      this._activeSource = null
    },
    { isActive: () => this._activeSource !== null },
  )

  private _handleToggle(e: CustomEvent) {
    const source = e.detail.source as ChatSource
    const opening = e.detail.open as boolean

    if (!opening) {
      source._setOpen(false)
      this._activeSource = null
      return
    }

    // Close previously open source
    if (this._activeSource && this._activeSource !== source) {
      this._activeSource._setOpen(false)
    }

    source._setOpen(true)
    this._activeSource = source
  }

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      /* inline sheet */
      .sheet {
        margin-top: var(--space-2);
        background: var(--color-background);
        border: var(--border);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: var(--space-3);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        transform: translateY(-4px);
        opacity: 0;
        transition: opacity 160ms ease, transform 200ms cubic-bezier(0.18, 1.25, 0.4, 1);
      }

      .sheet[data-open] {
        transform: translateY(0);
        opacity: 1;
      }

      .sheet-header {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }

      .sheet-icon {
        font-size: 1rem;
        flex-shrink: 0;
        color: var(--color-foreground-light);
      }

      .sheet-domain {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      mm-paragraph {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .sheet-link {
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        font-size: var(--font-size-12);
        color: var(--color-accent);
        text-decoration: none;
        margin-top: var(--space-1);
      }

      .sheet-link:hover {
        text-decoration: underline;
      }
    `,
  ]

  private get _domain() {
    if (!this._activeSource) return ''
    if (this._activeSource.label) return this._activeSource.label
    try {
      return new URL(this._activeSource.href).hostname.replace(/^www\./, '')
    } catch {
      return this._activeSource.href
    }
  }

  render() {
    const src = this._activeSource
    return html`
      <mm-button-group gap="1" wrap @source-toggle=${this._handleToggle}>
        <slot></slot>
      </mm-button-group>

      ${src
        ? html`
            <div class="sheet" data-open role="dialog" aria-label="${src.heading || this._domain}">
              ${src.href
                ? html`
                    <div class="sheet-header">
                      ${src.icon
                        ? html`
                            <mm-icon class="sheet-icon" name=${src.icon}></mm-icon>
                          `
                        : ''}
                      <span class="sheet-domain">${this._domain}</span>
                    </div>
                  `
                : ''}
              ${src.heading
                ? html`
                    <mm-paragraph>${src.heading}</mm-paragraph>
                  `
                : ''}
              ${src.description
                ? html`
                    <mm-paragraph size="small">${src.description}</mm-paragraph>
                  `
                : ''}
              ${src.href
                ? html`
                    <a
                      class="sheet-link"
                      href=${src.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      방문하기 ↗
                    </a>
                  `
                : ''}
            </div>
          `
        : ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-source': ChatSource
    'mm-chat-source-group': ChatSourceGroup
  }
}
