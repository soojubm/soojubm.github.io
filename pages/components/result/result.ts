import type { ActionConfig } from '@/components/action-config'

import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

type ResultElement = HTMLElement & {
  primaryAction?: ActionConfig
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)

  const result = document.querySelector<ResultElement>('#result-primary-action-example')
  if (!result) return

  result.primaryAction = {
    label: '주문내역 보기',
    onClick: () => {},
  }
})
