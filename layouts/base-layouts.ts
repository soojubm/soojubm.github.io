// /layouts/baseLayout.ts
import navbar from '/public/components/navbar/navbar.html'
import footer from '/public/components/footer/footer.html'

import '/pages/components/components.css'
import '/public/stylesheets/shared.css'

export const renderLayout = (content: string) => {
  return `
    ${navbar}
    <main>
      ${content}
    </main>
    ${footer}
  `
}
