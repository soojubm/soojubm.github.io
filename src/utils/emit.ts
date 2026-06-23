/**
 * host에서 CustomEvent를 디스패치하는 헬퍼.
 *
 * 기본으로 shadow 경계를 넘는 bubbles/composed를 켜고 detail을 그대로 싣는다.
 * 내부 전용 이벤트처럼 전파를 막고 싶으면 init으로 덮어쓴다.
 * dispatchEvent 결과(boolean)를 반환하므로 cancelable 이벤트에도 쓸 수 있다.
 */
export const emit = <T = unknown>(
  host: EventTarget,
  type: string,
  detail?: T,
  init?: EventInit,
): boolean =>
  host.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail, ...init }))
