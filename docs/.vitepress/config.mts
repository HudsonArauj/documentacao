import { Header } from 'react-native/Libraries/NewAppScreen'
import { defineConfig } from 'vitepress'
import {VPTeamMembers } from  'vitepress/theme'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Documentação projeto Computação em Nuvem",
  description: "Documentaçã o do projeto",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Etapas', link: '/etapas' },
    ],
  
    sidebar: [
      {
        text: 'Etapas',
        items: [
          { text: 'Etapas', link: '/etapas' },
          { text: 'Projeto', link: '/projeto' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HudsonArauj' }
    ],

   // outras opções alem do dark mode

    
  }
})
