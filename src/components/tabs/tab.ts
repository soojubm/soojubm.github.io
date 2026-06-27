import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { emit } from '../../utils/emit'
import type { AriaBoolean } from '../../types/aria'

@customElement('mm-tab')
export default class Tab extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-flex;
      z-index: 1; /* pill indicator 위에 텍스트가 렌더링되도록 stacking context 생성 */

      --tab-height: var(--size-medium);
      --tab-padding-inline: var(--space-3);
      --tab-font-size: var(--font-size-14);
      --tab-text-color: var(--color-foreground-light);
    }

    .tab-content {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--tab-height);
      padding: 0 var(--tab-padding-inline);
      font-size: var(--tab-font-size);
      color: var(--tab-text-color);
      cursor: pointer;
      user-select: none;
      transition: color 0.25s ease, font-weight 0.25s ease;
    }

    :host([aria-selected='true']) .tab-content {
      color: var(--selection-foreground);
    }

    :host(:focus-visible) {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    /* 부모 탭리스트가 pill 형태일 때 활성화된 글자 색상을 커스텀하고 싶다면 하단 주석 해제 */
    /* :host-context(mm-tab-list[variant="pill"])[active] { color: var(--selection-foreground); } */
  `

  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false
  @property({ type: String, reflect: true }) role = 'tab'
  @property({ type: String, attribute: 'aria-selected', reflect: true }) ariaSelected: AriaBoolean =
    'false'

  public select() {
    emit(this, 'tab-select', { value: this.value })
  }

  private handleClick = () => {
    this.focus()
    this.select()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('active')) return

    this.ariaSelected = this.active ? 'true' : 'false'
    this.tabIndex = this.active ? 0 : -1
  }

  render() {
    return html`
      <div class="tab-content" @click=${this.handleClick}>
        <slot></slot>
      </div>
    `
  }
}
