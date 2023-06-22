import Chip from './chip'

import Tag from './tag'
import Badge from './badge'

import Avatar from './avatar'
import Tile from './tile'
import Textfield from './input'

import Checkbox from './checkbox'
import Radio from './Radio'

import Button from './button'
import Row from './row'
import Text from './text'

import Tablist from './tablist'
import Callout from './callout'

import MenuItem from './menuitem'

export function defineCustomElement() {
  if ('customElements' in window) {
    customElements.define('test-button', Button)
    customElements.define('test-chip', Chip)

    customElements.define('test-tag', Tag)
    customElements.define('test-badge', Badge)

    customElements.define('test-avatar', Avatar)
    customElements.define('test-textfield', Textfield)

    customElements.define('test-checkbox', Checkbox)
    customElements.define('test-radio', Radio)

    customElements.define('test-tile', Tile)
    customElements.define('test-row', Row)
    customElements.define('test-text', Text)

    customElements.define('test-tablist', Tablist)

    customElements.define('test-callout', Callout)

    customElements.define('test-menu-item', MenuItem)

    // customElements.define('close-button', CloseButton)

    // Define the new element
    // customElements.define('word-count', WordCount, { extends: 'p' })
  }
}

// export { Chip, Tag, Avatar, Tile, Textfield, Checkbox, Row }
