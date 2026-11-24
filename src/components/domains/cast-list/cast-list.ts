import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { listItemInteractiveStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common'

export interface CastMember {
  name: string
  /** 감독·주연처럼 크레딧에 적히는 배역 표기. */
  credit: string
  href: string
  imageSrc?: string
}

@customElement('mm-cast-list')
export class CastList extends LitElement {
  static styles = [
    resetStyles,
    css`
      a {
        ${listItemInteractiveStyles}
      }
    `,
    css`
      :host {
        display: block;
      }
    `,
  ]
  @property({ attribute: false }) casts: CastMember[] = []

  render() {
    return html`
      <mm-list-item-group>${this.casts.map(cast => this.renderCast(cast))}</mm-list-item-group>
    `
  }

  private renderCast(cast: CastMember) {
    return html`
      <div>
        <a href=${cast.href}>
          <mm-list-item
            size="large"
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
