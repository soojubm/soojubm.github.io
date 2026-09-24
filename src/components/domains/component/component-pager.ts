import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/link/semantics/pager'
import { findAdjacentDocs } from '@/sitemap'
import { getCurrentPageId } from '@/utils'

/** 문서 페이지 끝에서 사이트맵 순서의 이전·다음 문서로 이동한다. */
@customElement('mm-component-pager')
export class ComponentPager extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  private docs = findAdjacentDocs(getCurrentPageId())

  render() {
    const { previous, next } = this.docs

    return html`
      <mm-pager
        aria-label="문서 이동"
        .previous=${previous && {
          href: `${previous.id}.html`,
          heading: previous.name,
          description: '이전 문서',
        }}
        .next=${next && { href: `${next.id}.html`, heading: next.name, description: '다음 문서' }}
      ></mm-pager>
    `
  }
}
