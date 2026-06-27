import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import soojubmImage from '@/images/soojubm.png'
import '@/components/text/semantics/paragraph'
import { footerStyles } from '@/components/footer/footer.styles'

@customElement('mm-footer')
export class Footer extends LitElement {
  static styles = footerStyles

  render() {
    return html`
      <footer class="footer js-observer" id="footer" role="contentinfo">
        <figure hidden></figure>
        <mm-user-snippet
          name="수줍이"
          email="soojubm@gmail.com"
          phone="010 3121 7045"
          description="UI Designer"
          avatar-src=${soojubmImage}
          size="huge"
          avatar-variant="secondary"
        ></mm-user-snippet>

        <div class="footer-social-links">
          <mm-social-links
            notion="https://soojubm.notion.site/UI-Designer-9c18f4dd39eb4181b9f9c2ee76896618"
            github="https://github.com/soojubm"
          ></mm-social-links>
          <mm-flex class="footer-hidden-links" gap="2">
            <mm-link href="/my/films/">영화감상 목록</mm-link>
            <mm-link href="/my/books/">독서 목록</mm-link>
          </mm-flex>
        </div>

        <dl class="footer-address-info">
          <dd>주식회사 수줍당</dd>
          <dt>대표이사</dt>
          <dd>수줍이</dd>
          <span class="footer-address-break"></span>
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
        <small class="footer-copyright">© 2019 soojubm. All rights reserved.</small>
        <address>
          <mm-paragraph>Making things better.</mm-paragraph>
        </address>

        <aside class="footer-to-top">
          <mm-to-top-button></mm-to-top-button>
        </aside>
      </footer>
    `
  }
}

/*
        <nav>
          <mm-flex gap="4rem">
            <mm-paragraph hidden aria-hidden="true">사이트맵</mm-paragraph>
            <mm-flex direction="column">
              <mm-paragraph size="large">사이트맵 컴포넌트</mm-paragraph>
              <mm-paragraph href="#" color="light">샘플</mm-paragraph>
              <mm-paragraph href="#" color="light">사이트맵</mm-paragraph>
              <mm-paragraph href="#" color="light">
                사이트맵 샘플
              </mm-paragraph>
              <mm-paragraph href="#" color="light">
                사이트맵 컴포넌트 샘플
              </mm-paragraph>
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
