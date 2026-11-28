import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { withTogglePressed } from '@/components/common/button/button.utils'
import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import {
  iconButtonSelectedStyles,
  iconButtonStyles,
  iconButtonVariantSkin,
} from '@/components/common/icon-button/icon-button.styles'
import { renderIconButton } from '@/components/common/icon-button/icon-button.utils'
import '@/components/common/icon'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-bookmark-button')
export class BookmarkButton extends withTogglePressed(LitElement) {
  static styles = [
    resetStyles,
    iconButtonStyles,
    iconButtonSelectedStyles,
    css`
      :host {
        ${iconButtonVariantSkin('ghost')}
      }
    `,
  ]
  @property({ type: String, attribute: 'tooltip-placement' })
  tooltipPlacement: TooltipPlacement = 'bottom-start'
  @property({ type: String }) shape: 'star' | 'bookmark' | 'heart' = 'star'

  render() {
    return html`
      ${renderIconButton({
        icon: this.iconName,
        ariaLabel: this.actionLabel,
        ariaPressed: this.pressed ? 'true' : 'false',
        tooltipPlacement: this.tooltipPlacement,
        disabled: this.disabled,
        onClick: this.handleToggleClick,
      })}
    `
  }

  private get iconName() {
    const filled = {
      star: ICON_NAMES.FAVORITE_SELECTED,
      bookmark: ICON_NAMES.BOOKMARK_SELECTED,
      heart: ICON_NAMES.LIKE_SELECTED,
    }
    const outline = {
      star: ICON_NAMES.FAVORITE,
      bookmark: ICON_NAMES.BOOKMARK,
      heart: ICON_NAMES.LIKE,
    }
    return this.pressed ? filled[this.shape] : outline[this.shape]
  }

  private get actionLabel() {
    const labels = { star: '즐겨찾기', bookmark: '북마크', heart: '좋아요' }
    return labels[this.shape]
  }
}
