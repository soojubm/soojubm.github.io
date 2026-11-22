import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AvatarShape, AvatarVariant } from '@/components/common/avatar/avatar'
import type { IconName } from '@/components/common/icon/icon-names'
import type { ListItem, ListItemSize } from '@/components/common/list-item/list-item'
import type { Constructor } from '@/utils'

import { toggleState } from '@/utils'

import '@/components/common/list-item/list-item'

/**
 * menu-item 계열이 공유하는 표시 prop의 공개 인터페이스.
 * 행 콘텐츠 prop은 mm-list-item의 계약에서 파생해 두 곳이 어긋나면 컴파일 에러로 잡히게 한다.
 * destructive는 행으로 전달되지 않는 host 스타일 상태로, CSS 상속을 통해 행 내부 색에 영향을 준다.
 */
/** 메뉴 항목은 명령을 고르는 행이라, 아바타로 개체를 대표하는 large는 갖지 않는다. */
export type MenuItemSize = Exclude<ListItemSize, 'large'>

export type MenuItemPresentation = Pick<
  ListItem,
  'label' | 'description' | 'icon' | 'emoji' | 'avatarSrc' | 'avatarVariant' | 'avatarShape'
> & { size: MenuItemSize; destructive: boolean }

/**
 * 표시 prop을 한 곳에서 선언하는 mixin. role·상태·이벤트 같은 시멘틱은 각 컴포넌트가 소유하고,
 * 행 콘텐츠로 흐르는 반복 prop과 host 스타일 상태(destructive)만 공유한다.
 */
export const withMenuItemPresentation = <T extends Constructor<LitElement>>(Base: T) => {
  class MenuItemPresentationElement extends Base {
    @property({ type: String, reflect: true }) size: MenuItemSize = 'small'
    @property({ type: Boolean, reflect: true }) destructive = false
    @property({ type: String }) label = ''
    @property({ type: String }) description = ''
    @property({ type: String }) icon?: IconName
    @property({ type: String }) emoji = ''
    @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
    @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant =
      'tertiary'
    @property({ type: String, attribute: 'avatar-shape' }) avatarShape: AvatarShape = 'square'
  }

  return MenuItemPresentationElement as Constructor<MenuItemPresentation> & T
}

/** 행이 포커스됐을 때 Enter·Space를 클릭과 같은 활성화로 처리한다. */
export function activateOnKeydown(event: KeyboardEvent, activate: () => void) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  activate()
}

export function renderMenuItemContent(props: MenuItemPresentation, trailing: unknown) {
  return html`
    <mm-list-item
      size=${props.size}
      label=${props.label}
      description=${props.description}
      icon=${ifDefined(props.icon)}
      emoji=${ifDefined(props.emoji || undefined)}
      avatar-src=${ifDefined(props.avatarSrc || undefined)}
      avatar-variant=${props.avatarVariant}
      avatar-shape=${props.avatarShape}
    >
      ${trailing}
    </mm-list-item>
  `
}

export interface MenuItemToggleState {
  disabled: boolean
  checked: boolean
  value: string
  activate: () => void
}

/**
 * menu-item-checkbox·menu-item-switch가 공유하는 checked 상태와 토글 배선.
 * 트레일링 컨트롤(mm-checkbox/mm-switch)만 각 컴포넌트가 소유한다.
 */
export const withMenuItemToggleState = <T extends Constructor<LitElement>>(Base: T) => {
  class MenuItemToggleStateElement extends Base {
    @property({ type: Boolean }) disabled = false
    @property({ type: Boolean }) checked = false
    @property({ type: String }) value = ''
    activate = () => {
      toggleState(this, 'checked')
    }
  }

  return MenuItemToggleStateElement as Constructor<MenuItemToggleState> & T
}
