import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resultStyles } from './result.styles'

@customElement('mm-result')
class Result extends LitElement {
  @property({ type: String, attribute: 'avatarIcon' }) avatarIcon = ''
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''

  static styles = [resultStyles]

  render() {
    return html`
      <div role="status" class="result">
        <mm-avatar size="huge" variant="secondary" icon="${this.avatarIcon}"></mm-avatar>
        <mm-title-with-description
          level="3"
          title="${this.title}"
          description="${this.description}"
          center
        ></mm-title-with-description>
        <slot name="action"></slot>
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
