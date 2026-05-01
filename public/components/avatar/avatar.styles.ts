import { css } from 'lit'

export const avatarStyles = css`
  img {
    width: 100%;
  }

  .avatar {
    margin: 0 !important;
    --avatar-size: var(--size-medium);
    --avatar-background-color: var(--color-background-weak);
    --avatar-border: var(--border-stronger);
    --avatar-radius: var(--radius);
    --avatar-badge-size: var(--size-tiny);
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

  .avatar img {
    height: inherit;
    border-radius: var(--radius);
    object-fit: cover;
  }

  .avatar[data-size='huge'] {
    --avatar-size: var(--size-huge);
    font-size: var(--font-size-huge);
  }

  .avatar[data-size='large'] {
    --avatar-size: var(--size-large);
    font-size: var(--font-size-large);
  }

  .avatar[data-size='medium'] {
    --avatar-badge-size: 8px;
  }

  .avatar[data-size='small'] {
    --avatar-size: var(--size-small);
  }

  .avatar[data-variant='secondary'] {
    border: var(--border);
    --avatar-background-color: var(--color-background);
  }

  .avatar[data-variant='tertiary'] {
    --avatar-background-color: transparent;
    border: none;
    box-shadow: none;
  }

  [slot='badge'] {
    position: absolute;
    left: -0.25rem;
    top: -0.25rem;
  }
`
