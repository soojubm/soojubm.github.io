const SKIPPED_TAGS = new Set(['STYLE', 'SCRIPT', 'SVG', 'CAPTION', 'COLGROUP', 'MM-ICON'])
const HEADING_LEVEL: Record<string, number> = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 }

/**
 * 렌더된 DOM을 shadow root와 slot 배치까지 따라가며 마크다운으로 옮긴다.
 * 블록 여부는 태그가 아니라 계산된 display로 판단해 커스텀 엘리먼트도 같은 규칙을 따른다.
 */
export const serializeToMarkdown = (
  root: Element,
  skip: (element: Element) => boolean = () => false,
) => {
  const blocks: string[] = []
  let line = ''
  // 제목·목록 기호는 내용이 블록 안에 한 번 더 감싸여 있어도 첫 텍스트 앞에 붙도록 따로 들고 있는다.
  let marker = ''

  const flush = () => {
    const text = line.replace(/\s+/g, ' ').trim()
    line = ''
    if (!text) return

    blocks.push(marker + text)
    marker = ''
  }

  const inlineText = (node: Node) => {
    const saved = line
    line = ''
    walkChildren(node)
    const text = line.replace(/\s+/g, ' ').trim()
    line = saved
    return text
  }

  const walkChildren = (node: Node) => {
    if (node instanceof HTMLSlotElement) {
      const assigned = node.assignedNodes({ flatten: true })
      const children = assigned.length ? assigned : [...node.childNodes]
      children.forEach(walk)
      return
    }

    const children =
      node instanceof Element && node.shadowRoot ? node.shadowRoot.childNodes : node.childNodes
    children.forEach(walk)
  }

  const walkTable = (table: HTMLTableElement) => {
    flush()
    const rows = [...table.rows].map(
      row => `| ${[...row.cells].map(cell => inlineText(cell)).join(' | ')} |`,
    )
    if (!rows.length) return

    const columnCount = table.rows[0].cells.length
    rows.splice(1, 0, `|${' --- |'.repeat(columnCount)}`)
    blocks.push(rows.join('\n'))
  }

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      line += node.textContent ?? ''
      return
    }
    if (!(node instanceof Element)) return
    if (SKIPPED_TAGS.has(node.tagName.toUpperCase()) || node.hasAttribute('hidden') || skip(node))
      return

    const style = getComputedStyle(node)
    if (style.display === 'none' || style.visibility === 'hidden') return

    if (node instanceof HTMLTableElement) return walkTable(node)

    if (node instanceof HTMLPreElement) {
      flush()
      blocks.push(`\`\`\`\n${node.textContent?.trim() ?? ''}\n\`\`\``)
      return
    }

    if (node instanceof HTMLAnchorElement && node.getAttribute('href')) {
      line += ` [${inlineText(node)}](${node.href}) `
      return
    }

    if (node.tagName === 'CODE') {
      line += ` \`${node.textContent?.trim() ?? ''}\` `
      return
    }

    if (node instanceof HTMLBRElement) return flush()

    // slot 등 display: contents는 자기 박스가 없으므로 줄을 끊지 않고 내용만 이어 붙인다.
    const isBlock = style.display !== 'contents' && !style.display.startsWith('inline')
    if (!isBlock) return walkChildren(node)

    flush()
    const level = HEADING_LEVEL[node.tagName]
    if (level) marker = `${'#'.repeat(level)} `
    if (node instanceof HTMLLIElement) marker = '- '
    walkChildren(node)
    flush()
    if (level || node instanceof HTMLLIElement) marker = ''
  }

  walk(root)
  flush()
  return blocks.join('\n\n')
}
