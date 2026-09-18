import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { interactiveRowStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common'

export interface CastMember {
  name: string
  /** 감독·주연처럼 크레딧에 적히는 배역 표기. */
  credit: string
  href: string
  imageSrc?: string
}

/**
 * 작품에 참여한 인물과 그 인물의 상세로 가는 링크를 묶어 보여주는 목록.
 * 행이 눌리지만 명령이 아니라 탐색이므로 menu가 아닌 list로 읽히고, 각 링크가 저마다 Tab 순서를 갖는다.
 */
@customElement('mm-cast-list')
export class CastList extends LitElement {
  static styles = [
    resetStyles,
    interactiveRowStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
    `,
  ]
  @property({ type: String, reflect: true }) role = 'list'
  @property({ attribute: false }) casts: CastMember[] = []

  render() {
    return this.casts.map(cast => this.renderCast(cast))
  }

  private renderCast(cast: CastMember) {
    return html`
      <div role="listitem">
        <a href=${cast.href}>
          <mm-list-item
            size="medium"
            label=${cast.name}
            description=${cast.credit}
            avatar-src=${cast.imageSrc ?? ''}
            avatar-shape="circle"
          ></mm-list-item>
        </a>
      </div>
    `
  }
}
