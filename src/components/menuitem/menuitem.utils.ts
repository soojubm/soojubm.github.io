import { html, nothing } from 'lit'
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
      icon=${props.icon || nothing}
      emoji=${props.emoji || nothing}
      avatar-src=${props.avatarSrc || nothing}
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
