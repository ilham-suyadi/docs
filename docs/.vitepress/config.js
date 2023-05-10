import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "Ilham Suyadi",
  description: "My Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'kubernetes', link: '/kubernetes/' }
    ],

    sidebar: [
      {
        text: 'Kubernetes',
        items: [
          { text: 'Kubernetes Dashboard', link: '/kubernetes/dashboard' },
          { text: 'Deployment', link: '/kubernetes/deployment' },
          { text: 'Metrics Server', link: '/kubernetes/metric' },
          { text: 'green and Blue deployment', link: '/kubernetes/deployment' },
          { text: 'ingress nginx', link: '/kubernetes/ingress' }
        ]
      }
    ]
  }
})
