import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  // lastUpdated: true,
  search: {
    provider: 'local'
  },
  title: "Ilham Suyadi",
  description: "My Documentation",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'kubernetes', link: '/kubernetes/', activeMatch: '/kubernetes/'},
      { text: 'docker', link: '/docker/', activeMatch: '/docker/'}
    ],

    sidebar: {
      '/kubernetes/' : [
        {
        text: 'Kubernetes',
        items: [
          { text: 'ingress nginx', link: '/kubernetes/ingress' },
          {
            text: 'Basic',
            collapsed: true,
            items: [
              { text: 'Deployment', link: '/kubernetes/deployment' },
            ],
          },
          {
            text: 'Monitoring',
            collapsed: true,
            items: [
              { text: 'Kubernetes Dashboard', link: '/kubernetes/dashboard' },
              { text: 'Metrics Server', link: '/kubernetes/metric' },
            ],
          },
          {
            text : 'Deployment Advanced',
            collapsed: true,
            items: [
              { text: 'Green-Blue', link: '/kubernetes/green_blue_deployment' },
            ]
          }
        ]
        }
      ],
      
      '/docker/' : [
        {
        text: 'docker',
        items: [
          { text: 'index', link: '/docker/' },
          { text: 'docker', link: '/docker/about' }
        ]
        }
      ]
    }
  }
})
