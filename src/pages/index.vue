<template>
  <div>
    <h1>Home page</h1>

    <RouterLink :to="{ name: '/projects/' }"> Projects</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
