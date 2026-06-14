import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-footer')
export class Footer extends LitElement {
  // 전역 CSS(.footer 등)를 그대로 상속받기 위해 Light DOM 사용
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <footer class="footer js-observer" id="footer" role="contentinfo">
        <div class="footer-background"></div>
        <figure class="footer-logo" hidden></figure>
        <mm-user-snippet
          name="수줍이"
          email="soojubm@gmail.com"
          phone="010 3121 7045"
          description="UI Designer"
          avatar-src="/src/images/soojubm.png"
          avatar-size="huge"
          avatar-variant="secondary"
        ></mm-user-snippet>

        <div style="max-width: 240px; margin: 0.75rem 0 1.5rem">
          <mm-social-links
            notion="https://soojubm.notion.site/UI-Designer-9c18f4dd39eb4181b9f9c2ee76896618"
            github="https://github.com/soojubm"
          ></mm-social-links>
          <mm-flex gap="2" style="margin: var(--space-4) 0 0 0">
            <mm-link href="/my/films/">영화감상 목록</mm-link>
            <mm-link href="/my/books/">독서 목록</mm-link>
          </mm-flex>
        </div>

        <dl class="footer-address-info">
          <dd>주식회사 수줍당</dd>
          <dt>대표이사</dt>
          <dd>수줍이</dd>
          <span style="width: 100%"></span>
          <dt>사업자등록번호</dt>
          <dd>888-88-88888</dd>
          <dt>주소</dt>
          <dd>서울시 강서구 까치산로 182, 1028호</dd>
          <dt>대표전화</dt>
          <dd>02-1234-5678</dd>
          <dt>통신판매업신고번호</dt>
          <dd>2018-서울강서구-1234</dd>
          <abbr title="phone"></abbr>
        </dl>
        <small class="footer-copyright" style="margin: var(--space-3) 0 0 0">
          © 2019 soojubm. All rights reserved.
        </small>
        <address class="footer-address">
          <p class="footer-address-slogan">Making things better.</p>
        </address>

        <aside class="footer-scroll" style="margin: 1.5rem 0 0 0">
          <mm-to-top-button></mm-to-top-button>
        </aside>
      </footer>
    `
  }
}

/*
        <nav>
          <mm-flex gap="4rem">
            <mm-text hidden aria-hidden="true" size="14">사이트맵</mm-text>
            <mm-flex direction="column">
              <mm-paragraph size="large">사이트맵 컴포넌트</mm-paragraph>
              <mm-text href="#" size="14" color="var(--color-foreground-light)">샘플</mm-text>
              <mm-text href="#" size="14" color="var(--color-foreground-light)">사이트맵</mm-text>
              <mm-text href="#" size="14" color="var(--color-foreground-light)">
                사이트맵 샘플
              </mm-text>
              <mm-text href="#" size="14" color="var(--color-foreground-light)">
                사이트맵 컴포넌트 샘플
              </mm-text>
            </mm-flex>
            <mm-flex direction="column">
              <mm-paragraph size="large">꺼이꺼이</mm-paragraph>
              <mm-paragraph size="large">호이호이</mm-paragraph>
            </mm-flex>
          </mm-flex>
        </nav>
*/

declare global {
  interface HTMLElementTagNameMap {
    'mm-footer': Footer
  }
}
