import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { OutsideClickController } from '@/controllers/outside-click-controller'
import type { IconName } from '@/components/icon-button/semantics/icon-names'
import '@/components/button/button'
import '@/components/button/button-group'
import '@/components/flex/flex'
import '@/components/icon/icon'
import '@/components/text/text'
import '@/components/text/semantics/paragraph'
import { emit } from '@/utils/emit'

/**
 * AI 응답 출처 소스 칩. 클릭 시 inline sheet로 상세 정보를 표시합니다.
 * mm-chat-source-group 안에서 사용합니다.
 */
@customElement('mm-chat-source')
export class ChatSource extends LitElement {
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

  @property({ type: String }) href = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) label = ''
  @property({ type: String }) icon?: IconName

  @state() private open = false

  render() {
    return html`
      <mm-button
        variant="tertiary"
        size="small"
        aria-expanded=${String(this.open)}
        aria-haspopup="dialog"
        @click=${this.handleClick}
      >
        ${this.icon
          ? html`
              <mm-icon name=${this.icon}></mm-icon>
            `
          : ''}
        ${this.domain}
      </mm-button>
    `
  }

  setOpen(open: boolean) {
    this.open = open
  }

  private get domain() {
    if (this.label) return this.label
    try {
      return new URL(this.href).hostname.replace(/^www\./, '')
    } catch {
      return this.href
    }
  }

  private handleClick(e: Event) {
    e.stopPropagation()
    emit(this, 'source-toggle', { source: this, open: !this.open })
  }
}

/**
 * 소스 칩 그룹 + inline sheet 컨테이너.
 * <mm-chat-source-group> 안에 <mm-chat-source>를 넣으면,
 * 칩 클릭 시 그룹 바로 아래에 inline sheet가 열립니다.
 */
@customElement('mm-chat-source-group')
export class ChatSourceGroup extends LitElement {
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

        transform: translateY(-4px);
        opacity: 0;
        transition: opacity 160ms ease, transform 200ms cubic-bezier(0.18, 1.25, 0.4, 1);
      }

      .sheet[data-open] {
        transform: translateY(0);
        opacity: 1;
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

  @state() private activeSource: ChatSource | null = null

  // 바깥을 누르면 열려 있는 소스 시트를 닫는다.
  private outsideClick = new OutsideClickController(
    this,
    () => {
      this.activeSource?.setOpen(false)
      this.activeSource = null
    },
    { isActive: () => this.activeSource !== null },
  )

  render() {
    const src = this.activeSource
    return html`
      <mm-button-group wrap @source-toggle=${this.handleToggle}>
        <slot></slot>
      </mm-button-group>

      ${src
        ? html`
            <mm-flex
              class="sheet"
              data-open
              direction="column"
              gap="2"
              role="dialog"
              aria-label=${src.heading || this.domain}
            >
              ${src.href
                ? html`
                    <mm-flex class="sheet-header" gap="2" align-items="center">
                      ${src.icon
                        ? html`
                            <mm-icon class="sheet-icon" name=${src.icon}></mm-icon>
                          `
                        : ''}
                      <mm-text class="sheet-domain" size="12" color="light">${this.domain}</mm-text>
                    </mm-flex>
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
            </mm-flex>
          `
        : ''}
    `
  }

  private handleToggle(e: CustomEvent) {
    const source = e.detail.source as ChatSource
    const opening = e.detail.open as boolean

    if (!opening) {
      source.setOpen(false)
      this.activeSource = null
      return
    }

    // Close previously open source
    if (this.activeSource && this.activeSource !== source) {
      this.activeSource.setOpen(false)
    }

    source.setOpen(true)
    this.activeSource = source
  }

  private get domain() {
    if (!this.activeSource) return ''
    if (this.activeSource.label) return this.activeSource.label
    try {
      return new URL(this.activeSource.href).hostname.replace(/^www\./, '')
    } catch {
      return this.activeSource.href
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-source': ChatSource
    'mm-chat-source-group': ChatSourceGroup
  }
}
