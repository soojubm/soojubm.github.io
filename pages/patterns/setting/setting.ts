import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'
import { findSitemapItem } from '@/sitemap'

document.addEventListener('DOMContentLoaded', () => {
  const page = findSitemapItem('setting')
  document.body.innerHTML = renderLayout(main, { closeSidebar: true, navbar: !page?.hideNavbar })

  document.getElementById('setting-top-bar')?.addEventListener('navclick', () => {
    history.back()
  })
})
