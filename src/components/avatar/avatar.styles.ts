import { css } from 'lit'

export const avatarStyles = css`
  :host {
    --avatar-size: var(--size-medium);
    --avatar-background-color: var(--color-background-subtle);
    --avatar-border: var(--border-stronger);
    --avatar-radius: var(--radius);
    display: inline-flex;
  }

  img {
    width: 100%;
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
  }

  img {
    height: inherit;
    border-radius: var(--avatar-radius);
    object-fit: cover;
  }

  [data-shape='circle'] {
    --avatar-radius: var(--radius-round);
  }

  [data-size='huge'] {
    --avatar-size: var(--size-huge);
    font-size: var(--font-size-huge);
  }

  [data-size='large'] {
    --avatar-size: var(--size-large);
    font-size: var(--font-size-large);
  }

  [data-size='small'] {
    --avatar-size: var(--size-small);
  }

  [data-variant='secondary'] {
    border: var(--border);
    --avatar-background-color: var(--color-background);
  }

  [data-variant='tertiary'] {
    --avatar-background-color: transparent;
    border: none;
    box-shadow: none;
  }

`
