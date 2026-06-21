import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { IconName } from '../icon-button/semantics/icon-names'
import '../list-row/list-row'

export interface MenuItemProps {
  size: string
  label: string
  description: string
  icon?: IconName
  emoji: string
  avatarSrc: string
  avatarVariant: string
}

export function renderMenuItemContent(props: MenuItemProps, action: unknown) {
  return html`
    <mm-list-row
      size=${props.size}
      label=${props.label}
      description=${props.description}
      icon=${ifDefined(props.icon || undefined)}
      emoji=${ifDefined(props.emoji || undefined)}
      avatar-src=${ifDefined(props.avatarSrc || undefined)}
      avatar-variant=${props.avatarVariant}
    >
      ${props.label
        ? nothing
        : html`
            <slot></slot>
          `}
      ${action}
    </mm-list-row>
  `
}
