import type { OpenState } from '@/utils/open-state'
import type { ReactiveController, ReactiveControllerHost } from 'lit'

interface EscapeKeyOptions {
  /** 열려 있는지. 열린 순서대로 쌓여, ESC는 가장 나중에 열린 표면만 받는다 */
  isOpen: () => boolean
}

// 겹쳐 열린 표면이 ESC 한 번에 모두 닫히지 않도록, 열린 순서대로 쌓아 맨 위 하나만 받게 한다.
// document 리스너는 쌓인 표면이 있는 동안 하나만 건다.
const openSurfaces: EscapeKeyController[] = []

const handleDocumentKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return

  openSurfaces[openSurfaces.length - 1]?.dismiss()
}

const push = (controller: EscapeKeyController) => {
  if (openSurfaces.includes(controller)) return

  if (openSurfaces.length === 0) document.addEventListener('keydown', handleDocumentKeydown)
  openSurfaces.push(controller)
}

const remove = (controller: EscapeKeyController) => {
  const index = openSurfaces.indexOf(controller)
  if (index < 0) return

  openSurfaces.splice(index, 1)
  if (openSurfaces.length === 0) document.removeEventListener('keydown', handleDocumentKeydown)
}

/**
 * ESC 키를 누르면 콜백을 호출하는 ReactiveController.
 *
 * 열려 있는 표면을 열린 순서대로 쌓고 ESC는 맨 위 표면 하나만 처리한다. dialog 안에서 popover를 연 것처럼
 * 표면이 겹쳐 있어도 한 번에 한 겹씩 닫힌다. 맨 위 표면이 ESC로 닫히지 않는 modal이어도 아래 표면으로 넘기지 않는다.
 * 쌓고 빼는 일과 document 리스너는 이 컨트롤러가 연결·렌더·해제 시점에 맡으므로,
 * 컴포넌트마다 connectedCallback/disconnectedCallback에 같은 코드를 반복하지 않는다.
 * OutsideClickController와 함께 떠 있는 표면이 스스로 닫히는 수단을 이룬다.
 * `OpenState` 호스트는 콜백 없이 넘기면 `open`을 읽고 `close()`를 부른다.
 */
export class EscapeKeyController implements ReactiveController {
  private onEscape: () => void
  private isOpen: () => boolean

  constructor(host: ReactiveControllerHost & OpenState)
  constructor(host: ReactiveControllerHost, onEscape: () => void, options: EscapeKeyOptions)
  constructor(
    host: ReactiveControllerHost & Partial<OpenState>,
    onEscape?: () => void,
    options?: EscapeKeyOptions,
  ) {
    this.onEscape = onEscape ?? (() => host.close?.())
    this.isOpen = options?.isOpen ?? (() => !!host.open)
    host.addController(this)
  }

  hostConnected() {
    this.syncStack()
  }

  hostUpdated() {
    this.syncStack()
  }

  hostDisconnected() {
    remove(this)
  }

  /** 맨 위 표면이 ESC를 받으면 모듈의 document 리스너가 부른다. */
  dismiss() {
    this.onEscape()
  }

  // 열리면 맨 위에 쌓고 닫히면 뺀다. 이미 열려 있는 표면은 쌓인 자리를 유지한다.
  private syncStack() {
    if (this.isOpen()) push(this)
    else remove(this)
  }
}
