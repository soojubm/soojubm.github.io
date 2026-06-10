import { css } from 'lit'

export const avatarStyles = css`
  :host {
    --avatar-size: var(--size-medium);
    --avatar-background-color: var(--color-background-subtle);
    --avatar-border: var(--border-stronger);
    --avatar-border-color: transparent;
    --avatar-icon-color: var(--color-foreground);
    --avatar-radius: var(--radius);
    display: inline-flex;
  }

  figure {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--avatar-size);
    height: var(--avatar-size);
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--avatar-background-color);
    border-radius: var(--avatar-radius);
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 0 1px var(--avatar-border-color);
    --button-text-color: var(--avatar-icon-color);

    &[data-shape='circle'] {
      --avatar-radius: var(--radius-round);
    }
    &[data-size='huge'] {
      --avatar-size: var(--size-huge);
      font-size: var(--font-size-huge);
    }
    &[data-size='large'] {
      --avatar-size: var(--size-large);
      font-size: var(--font-size-large);
    }
    &[data-size='small'] {
      --avatar-size: var(--size-small);
    }
    &[data-variant='secondary'] {
      border: var(--border);
      --avatar-background-color: var(--color-background);
    }
    &[data-variant='tertiary'] {
      --avatar-background-color: transparent;
      border: none;
      box-shadow: none;
    }
  }

  img {
    width: 100%;
    height: inherit;
    border-radius: var(--avatar-radius);
    object-fit: cover;
  }

  /* brutal: variant가 element-level border를 설정하므로 :host-context로 덮어
     모든 아바타(figure)에 #000 보더 적용 */
  :host-context([data-theme='brutal']) figure {
    border: var(--avatar-border);
  }
`
