// .vitepress/config.js
export default {
  // site-level options
  title: 'Página inicial',
  description: 'Site de documentação do projeto de Computação em Nuvem',
  base : '/documentacao/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Etapas', link: '/etapas' },
      { text: 'Projeto', link: '/projeto' },
    ],
    siderbar: [
      { text: 'Home', link: '/' },
      { text: 'Etapas', link: '/etapas' },
      { text: 'Projeto', link: '/projeto' },
    ],
    socialLinks: [
      { icon: 'GitHub', link: 'https://github.com/HudsonArauj/documentacao' },
    ],

  }
}

