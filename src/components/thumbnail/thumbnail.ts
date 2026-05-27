import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('mm-thumbnail')
export class Thumbnail extends LitElement {
  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''
  @property({ type: String }) ratio: '1:1' | '16:9' | '4:3' = '16:9'

  // 💡 [치트키 1] 링크 주소가 들어오면 내부에서 자동으로 <a> 태그를 켭니다.
  @property({ type: String }) href = ''
  // 💡 [치트키 2] true면 내부에서 자동으로 <button> 태그를 켭니다.
  @property({ type: Boolean }) clickable = false

  @state() private _hasError = false
  private _fallbackImage = 'https://via.placeholder.com/300?text=No+Image'

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    /* 💡 최외곽 루트 태그들(a, button, div)의 스타일을 컴포넌트가 완벽히 통제 */
    .thumbnail-root {
      display: block;
      width: 100%;
      padding: 0;
      margin: 0;
      border: none;
      background: none;
      overflow: hidden;
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
    }

    /* 인터랙션이 가능한 상태(Link 또는 Button)일 때만 호버 효과 강제 */
    .thumbnail-root.interactive {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    .thumbnail-root.interactive:hover {
      transform: scale(1.03);
    }
    .thumbnail-root:focus-visible {
      outline: 3px solid #2563eb;
      outline-offset: 2px;
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      background-color: #f3f4f6;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `

  render() {
    const displaySrc = this._hasError ? this._fallbackImage : this.src || this._fallbackImage
    const ratioMap = { '1:1': '1 / 1', '16:9': '16 / 9', '4:3': '4 / 3' }

    // 내부 알맹이(이미지 틀)를 변수로 분리하여 코드 중복을 최소화합니다.
    const innerTemplate = html`
      <div class="image-wrapper" style="aspect-ratio: ${ratioMap[this.ratio]}">
        <img
          src="${displaySrc}"
          alt="${this.alt}"
          loading="lazy"
          @error=${() => (this._hasError = true)}
        />
      </div>
    `
    // 1. 이동할 주소(href)가 있다면 자동으로 <a> 태그로 출력
    if (this.href) {
      return html`
        <a href="${this.href}" class="thumbnail-root interactive"> ${innerTemplate} </a>
      `
    }

    // 2. 주소는 없지만 클릭 동작(clickable)이 필요하다면 <button> 태그로 출력
    if (this.clickable) {
      return html`
        <button type="button" class="thumbnail-root interactive">${innerTemplate}</button>
      `
    }

    // 3. 아무것도 없다면 단순 보기용 <div>로 출력
    return html` <figure class="thumbnail-root">${innerTemplate}</figure> `
  }
}

// .media {
//   padding-top: 50%;
//   overflow: hidden;
//   border-radius: var(--radius);
//   border: var(--border);
//   box-sizing: border-box;
//   position: relative;
// }

// .media img {
//   display: block;
//   width: auto;
//   height: auto;
//   max-width: 100%;
//   max-height: 130%;
//   margin: auto;
//   position: absolute;
//   left: -1px;
//   right: -1px;
//   top: -1px;
//   bottom: -1px;
// }
