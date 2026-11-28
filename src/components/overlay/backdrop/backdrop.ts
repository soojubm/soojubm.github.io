import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { backdropStyles } from '@/components/overlay/overlay.styles'

@customElement('fff-backdrop')
export class Backdrop extends LitElement {
  static styles = backdropStyles
}
