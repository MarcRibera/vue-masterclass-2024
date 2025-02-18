<template>
  <div>
    <h1>Project name {{ slug }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = (route.params as { slug: string }).slug
</script>

<style scoped></style>
