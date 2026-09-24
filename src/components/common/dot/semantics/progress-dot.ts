import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import '@/components/common/dot/dot'
import '@/components/common/text/text'
import {
  progressToneMap,
  tagToneStyles,
  type ProgressVariant,
} from '@/components/common/tag/tag.styles'

/**
 * 작업이 어느 단계에 있는지 점과 라벨로 보이는 태그.
 * 면 없이 점의 색만으로 단계를 가르므로 mm-tag의 테두리·배경을 쓰지 않는다.
 * 이름은 라벨이 맡으므로 점은 장식인 mm-dot을 쓴다.
 */
@customElement('mm-progress-tag')
export class ProgressTag extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      white-space: nowrap;
    }
  `
  @property({ type: String }) variant: ProgressVariant = 'todo'

  render() {
    const tone = progressToneMap[this.variant] ?? 'default'
    /* 점은 면이 작아 배경 틴트로는 색이 드러나지 않는다. tone이 테두리로 쓰는 값을 채운다. */
    const dotStyle = { '--dot-background-color': tagToneStyles[tone].borderColor }

    return html`
      <mm-dot style=${styleMap(dotStyle)}></mm-dot>
      <mm-text size="12">
        <slot>${this.variant}</slot>
      </mm-text>
    `
  }
}
