import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { footerStyles } from '@/components/layouts/footer/footer.styles'
import '@/components/common'
import soojubmImage from '@/images/soojubm.png'
import '@/components/domains/user-snippet/index'
import '@/components/domains/social-links/index'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-footer')
export class Footer extends LitElement {
  static styles = [resetStyles, footerStyles]

  /* eslint-disable lit-a11y/accessible-emoji -- ©는 이모지가 아니라 활자 기호이고,
     스크린리더가 "저작권"으로 그대로 읽는다. role=img로 감싸면 오히려 읽기가 나빠진다. */
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
          avatar-variant="secondary"
        ></mm-user-snippet>

        <div class="footer-links">
          <mm-social-links
            notion="https://soojubm.notion.site/UI-Designer-9c18f4dd39eb4181b9f9c2ee76896618"
            github="https://github.com/soojubm"
          ></mm-social-links>
        </div>

        <dl class="footer-address-info">
          <dt>상호</dt>
          <dd>주식회사 수줍당</dd>
          <dt>대표이사</dt>
          <dd>수줍이</dd>
          <div class="footer-address-break"></div>
          <dt>사업자등록번호</dt>
          <dd>888-88-88888</dd>
          <dt>주소</dt>
          <dd>서울시 강서구 까치산로 182, 1028호</dd>
          <dt>대표전화</dt>
          <dd>02-1234-5678</dd>
          <dt>통신판매업신고번호</dt>
          <dd>2018-서울강서구-1234</dd>
        </dl>
        <mm-caption>© 2019 soojubm. All rights reserved.</mm-caption>
        <address>
          <mm-paragraph size="large">Making things better.</mm-paragraph>
        </address>

        <mm-to-top-button></mm-to-top-button>
      </footer>
    `
  }
  /* eslint-enable lit-a11y/accessible-emoji */
}
