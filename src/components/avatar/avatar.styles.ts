import { css } from 'lit'

export const avatarStyles = css`
  :host {
    --avatar-size: var(--size-medium);
    --avatar-background-color: var(--color-background-subtle);
    --avatar-border-color: transparent;
    --avatar-icon-color: var(--color-foreground);
    --avatar-border-radius: var(--radius);
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
    border: var(--avatar-border, none);
    border-radius: var(--avatar-border-radius);
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 0 1px var(--avatar-border-color);
    color: var(--avatar-icon-color);
  }

  :host([shape='circle']) {
    --avatar-border-radius: var(--radius-round);
  }

  :host([size='huge']) {
    --avatar-size: var(--size-huge);
    font-size: var(--font-size-huge);
  }

  :host([size='large']) {
    --avatar-size: var(--size-large);
    font-size: var(--font-size-large);
  }

  :host([size='small']) {
    --avatar-size: var(--size-small);
  }

  :host([variant='secondary']) {
    --avatar-background-color: var(--color-background);
    --avatar-border: var(--border);
  }

  :host([variant='tertiary']) {
    --avatar-background-color: transparent;
  }

  :host([variant='tertiary']) figure {
    box-shadow: none;
  }

  img {
    width: 100%;
    height: inherit;
    border-radius: var(--avatar-border-radius);
    object-fit: cover;
  }
`
