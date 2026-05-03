// /layouts/baseLayout.ts
import navbar from '/src/components/navbar/navbar.html'
import footer from '/src/components/footer/footer.html'

import '/pages/components/components.css'
import '/src/stylesheets/shared.css'

export const renderLayout = (content: string) => {
  return `
    ${navbar}
    <main>
      ${content}
    </main>
    ${footer}
  `
}
