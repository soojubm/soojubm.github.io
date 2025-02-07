type KeyCode =
  | 'SPACE'
  | 'ENTER'
  | 'ESC'
  | 'ARROW_LEFT'
  | 'ARROW_UP'
  | 'ARROW_RIGHT'
  | 'ARROW_DOWN'
  | 'TAB'
  | 'SHIFT'
  | 'CTRL'
  | 'ALT'
  | 'BACKSPACE'
  | 'DELETE'

export const KEYCODE: { [key in KeyCode]: number } = {
  SPACE: 32,
  ENTER: 13,
  ESC: 27,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  TAB: 9,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  BACKSPACE: 8,
  DELETE: 46,
}
