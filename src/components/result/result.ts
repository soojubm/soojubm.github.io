import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import '../button/button-group'
import { resultStyles } from './result.styles'

@customElement('mm-result')
class Result extends LitElement {
  @property({ type: String, attribute: 'avatarIcon' }) avatarIcon = ''
  @property({ type: String, attribute: 'avatar-icon' }) avatarIconAlias = ''
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''
  @state() private hasDefaultContent = false
  @state() private hasActionContent = false

  static styles = [resultStyles]

  private get effectiveAvatarIcon() {
    return this.avatarIcon || this.avatarIconAlias
  }

  private handleSlotChange(kind: 'default' | 'action', event: Event) {
    const slot = event.target as HTMLSlotElement
    const hasContent = slot
      .assignedNodes({ flatten: true })
      .some(
        node =>
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
          node.nodeType === Node.ELEMENT_NODE,
      )

    if (kind === 'default') this.hasDefaultContent = hasContent
    if (kind === 'action') this.hasActionContent = hasContent
  }

  render() {
    return html`
      <div role="status" class="result">
        <slot name="avatar">
          ${this.effectiveAvatarIcon
            ? html`<mm-avatar size="huge" variant="secondary" icon=${this.effectiveAvatarIcon}></mm-avatar>`
            : nothing}
        </slot>
        <mm-title-with-description
          level="3"
          title=${this.title}
          description=${this.description}
          center
        ></mm-title-with-description>
        <div class="result-content" ?hidden=${!this.hasDefaultContent}>
          <slot @slotchange=${(event: Event) => this.handleSlotChange('default', event)}></slot>
        </div>
        <mm-button-group
          class="result-actions"
          justify="center"
          wrap
          ?hidden=${!this.hasActionContent}
        >
          <slot
            name="action"
            @slotchange=${(event: Event) => this.handleSlotChange('action', event)}
          ></slot>
        </mm-button-group>
      </div>
    `
  }
}

export default Result

// static get observedAttributes() {
//   return ['title', 'description', 'avataricon'];
// }

// attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
//   if (!this.shadowRoot || oldValue === newValue) return;

//   switch (name) {
//     case 'title':
//       this.updateTitle(newValue);
//       break;
//     case 'description':
//       this.updateDescription(newValue);
//       break;
//     case 'avataricon':
//       this.updateAvatarIcon(newValue);
//       break;
//   }
// }

// // 개별 렌더링 함수들
// private updateTitle(value: string | null) {
//   const el = this.shadowRoot?.querySelector('mm-text');
//   if (el) el.textContent = value || '';
// }

// private updateDescription(value: string | null) {
//   const el = this.shadowRoot?.querySelector('.result-description');
//   if (el) el.textContent = value || '';
// }

// private updateAvatarIcon(value: string | null) {
//   const avatar = this.shadowRoot?.querySelector('mm-avatar');
//   if (avatar) avatar.setAttribute('icon', value || '');
// }

// get avatarIcon() {
//   return this.getAttribute('avataricon') || '';
// }

// set avatarIcon(value: string) {
//   this.setAttribute('avataricon', value);
// }

// myResult.avatarIcon = 'happy'; // 내부적으로 setAttribute로 반영됨
