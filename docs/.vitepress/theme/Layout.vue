<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'


const { Layout } = DefaultTheme
const { frontmatter } = useData()

</script>

<template>
  <template v-if="frontmatter.layout === 'home-doc'">
    <HomeDoc />
  </template>

  <Layout />
</template>