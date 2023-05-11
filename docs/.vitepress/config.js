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
      { text: 'CI/CD', link: '/ci-cd/', activeMatch: '/ci-cd/'},
      { text: 'Kubernetes', link: '/kubernetes/', activeMatch: '/kubernetes/'},
      { text: 'Docker', link: '/docker/', activeMatch: '/docker/'},
      { text: 'Infrastructure as Code', link: '/infrastructure-as-code/', activeMatch: '/infrastructure-as-code/'}
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ilham-suyadi/docs' }
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
