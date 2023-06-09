import { defineConfig } from 'vitepress'



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
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'CI/CD', link: '/ci-cd/', activeMatch: '/ci-cd/'},
      {
        text: 'CI/CD',
        items: [
          {text: 'Git', link: '/git/', activeMatch: '/git/'},
          { text: 'Gitlab', link: '/gitlab/', activeMatch: '/gitlab/' },
          { text: 'Github', link: '/github/', activeMatch: '/github/'}
        ]
      },
      { text: 'Kubernetes', link: '/kubernetes/', activeMatch: '/kubernetes/'},
      { text: 'Docker', link: '/docker/', activeMatch: '/docker/'},
      { text: 'Infrastructure as Code',
        items: [
          { text: 'Terraform', link: '/terraform/', activeMatch: '/terraform/'},
          { text: 'Ansible', link: '/ansible/', activeMatch: '/ansible/'}
        ]
    }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ilham-suyadi/docs' },
      { icon: 'github', link: 'https://github.com/ilham-suyadi/docs/issues' }
    ],

    sidebar: {
      '/ci-cd/' : [
        {
          text: 'CI/CD',
          items: [
            { text: 'Git', link: '/ci-cd/git'},
          ]
        }
      ],
      '/kubernetes/' : [
        {
        text: 'Kubernetes',
        items: [
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
              { text: 'Blue Green deployment', link: '/kubernetes/blue_green_deployment' },
              { text: 'Canary Deployment', link: '/kubernetes/canary' },
              { text: 'Rollingout deployment', link: '/kuberntes/'},
              { text: 'Kubernetes Network Policy', link: '/kubernetes/networkPolicy'},
              { text: 'Cert Manager' , link: '/kubernetes/cert-manager'}
            ]
          },
          {
            text: 'Storage',
            collapsed: true,
            items: [
              { text: 'Rook Ceph', link: '/kubernetes/rook-ceph-kubectl' }
            ]
          },
          {
            text : 'Other',
            collapsed: true,
            items: [
              { text: 'K9s', link: '/kubernetes/k9s' },
              { text: 'HA Proxy', link: '/kubernetes/ha_proxy' },
              { text: 'ingress nginx', link: '/kubernetes/ingress' },
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
