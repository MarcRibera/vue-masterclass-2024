<template>
  <div>
    <h1>Project name {{ slug }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const slug = (route.params as { slug: string }).slug
</script>

<style scoped></style>
