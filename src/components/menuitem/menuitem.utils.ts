import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import '../list-row/list-row'

export interface MenuItemProps {
  label: string
  description: string
  icon: string
  emoji: string
  avatarSrc: string
  avatarSize: string
  avatarVariant: string
}

export function renderMenuItemContent(props: MenuItemProps, action: unknown) {
  return html`
    <mm-list-row
      label=${props.label}
      description=${props.description}
      icon=${ifDefined(props.icon || undefined)}
      emoji=${ifDefined(props.emoji || undefined)}
      avatar-src=${ifDefined(props.avatarSrc || undefined)}
      avatar-size=${props.avatarSize}
      avatar-variant=${props.avatarVariant}
    >
      ${props.label
        ? nothing
        : html`
            <slot name="label"><slot></slot></slot>
          `}
      ${action}
    </mm-list-row>
  `
}
