export interface MediaItem {
  releasedate?: number
  titlekorean: string
  titleenglish: string
  director: string
  country?: string
}

export function mediaCard(item: MediaItem): string {
  return `
    <article style="border:var(--border);padding:var(--space-3);border-radius:var(--radius)">
      <mm-flex direction="column" gap="1">
        <mm-flex justify-content="space-between" align-items="center" gap="2">
          <time style="font-size:var(--font-size-12);color:var(--foreground-subtle-color)">${
            item.releasedate ?? ''
          }</time>
          <mm-text size="12" color="light">${item.country ?? ''}</mm-text>
        </mm-flex>
        <mm-paragraph style="margin:0;font-weight:var(--font-weight-bold);line-height:1.3">${
          item.titlekorean
        }</mm-paragraph>
        <mm-paragraph style="margin:0;font-size:var(--font-size-12);color:var(--foreground-subtle-color)">${
          item.titleenglish
        }</mm-paragraph>
        <mm-paragraph style="margin:0;font-size:var(--font-size-14)">${item.director}</mm-paragraph>
      </mm-flex>
    </article>
  `
}
