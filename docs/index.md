---
layout: home

hero:
  name: "Documentação projeto Computação em Nuvem."
  text: "Aplicação de conceitos de computação em nuvem."
  tagline: "Descrição/projeto"
  actions:
    - theme: brand
      text: Etapas
      link: /etapas
    - theme: alt
      text: Projeto
      link: /projeto

members:
  - avatar: 'assets/foto.jpg'
    name: 'Hudson Araujo'
    title: 'Autor'
    links:
    - icon: 'github' 
      link: 'https://github.com/HudsonArauj'
---


<script setup>
  import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
</script>

<VPTeamPage class="VPHomeDocTeamPage">
  <VPTeamMembers size="small" :members="$frontmatter.members" />
</VPTeamPage>

