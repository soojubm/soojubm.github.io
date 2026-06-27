import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import '@/components/text/semantics/caption'

@customElement('mm-thumbnail')
export class Thumbnail extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      --thumbnail-radius: var(--radius);
      --thumbnail-border: var(--border);
      --thumbnail-color-empty: var(--color-background-subtle);
    }

    .thumbnail-root {
      display: block;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .thumbnail-media.interactive {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    .thumbnail-media.interactive:hover {
      transform: scale(1.03);
    }
    .thumbnail-media:focus-visible {
      outline: 3px solid var(--color-focus, var(--color-primary));
      outline-offset: 2px;
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      background-color: var(--thumbnail-color-empty);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .thumbnail-media {
      display: block;
      width: 100%;
      padding: 0;
      border: var(--thumbnail-border, none);
      background: none;
      overflow: hidden;
      border-radius: var(--thumbnail-radius);
      text-decoration: none;
      color: inherit;
    }

    .thumbnail-caption {
      display: block;
      margin-top: var(--space-2, 8px);
    }
  `

  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''
  @property({ type: String }) ratio: '1:1' | '16:9' | '4:3' = '16:9'
  @property({ type: String }) loading: 'eager' | 'lazy' = 'lazy'
  @property({ type: String, attribute: 'fetchpriority' }) fetchPriority: 'high' | 'low' | 'auto' =
    'auto'

  @property({ type: String }) href = ''
  @property({ type: Boolean }) clickable = false
  @property({ type: String }) caption = ''

  @state() private hasError = false
  private fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E"

  private handleImageError() {
    this.hasError = true
  }

  render() {
    const displaySrc = this.hasError ? this.fallbackImage : this.src || this.fallbackImage
    const ratioMap = { '1:1': '1 / 1', '16:9': '16 / 9', '4:3': '4 / 3' }
    const imageWrapperStyle = {
      aspectRatio: ratioMap[this.ratio],
    }

    // 내부 알맹이(이미지 틀)를 변수로 분리하여 코드 중복을 최소화합니다.
    const innerTemplate = html`
      <div class="image-wrapper" style=${styleMap(imageWrapperStyle)}>
        <img
          src="${displaySrc}"
          alt="${this.alt}"
          loading="${this.loading}"
          decoding="async"
          fetchpriority="${this.fetchPriority}"
          @error=${this.handleImageError}
        />
      </div>
    `
    // 미디어(이미지 틀)를 감싸는 요소를 상황에 맞게 결정합니다.
    let media
    if (this.href) {
      // 1. 이동할 주소(href)가 있다면 <a> 태그로 출력
      media = html`
        <a href="${this.href}" class="thumbnail-media interactive">${innerTemplate}</a>
      `
    } else if (this.clickable) {
      // 2. 주소는 없지만 클릭 동작(clickable)이 필요하다면 <button> 태그로 출력
      media = html`
        <button type="button" class="thumbnail-media interactive">${innerTemplate}</button>
      `
    } else {
      // 3. 아무것도 없다면 단순 보기용 <div>로 출력
      media = html`
        <div class="thumbnail-media">${innerTemplate}</div>
      `
    }

    // thumbnail 자체가 <figure>이며, caption 값이 있으면 내부에 캡션을 함께 렌더링합니다.
    return html`
      <figure class="thumbnail-root">
        ${media}
        ${this.caption
          ? html`
              <mm-caption as="figcaption" class="thumbnail-caption">${this.caption}</mm-caption>
            `
          : ''}
      </figure>
    `
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
