import { makeStyleSheet } from '../../javascripts/components/utils'

class Result extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const shadow = this.shadowRoot!

    const container = document.createElement('div')
    container.role = 'status'
    container.classList.add('result')

    const title = document.createElement('mm-text')
    title.setAttribute('variant', 'subhead')
    title.innerText = this.title

    const description = document.createElement('mm-text')
    description.classList.add('result-description')
    description.setAttribute('variant', 'body')
    description.innerText = this.description

    const avatar = document.createElement('mm-avatar')
    avatar.setAttribute('size', 'huge')
    avatar.setAttribute('variant', 'secondary')
    avatar.setAttribute('icon', this.avatarIcon)

    // const style = this.getAttribute('style')
    // container.setAttribute('style', style || '')

    shadow.appendChild(container)
    container.appendChild(avatar)
    container.appendChild(title)
    if (this.description) container.appendChild(description)
    container.append(...this.childNodes)
    container.append(makeStyleSheet('result'))
  }

  get avatarIcon() {
    return this.getAttribute('avatarIcon') || ''
  }
  get title() {
    return this.getAttribute('title') || ''
  }
  get description() {
    return this.getAttribute('description') || ''
  }

  disconnectedCallback() {}
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
