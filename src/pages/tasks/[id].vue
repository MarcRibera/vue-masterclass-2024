<template>
  <div>
    <h1>Task ID {{ id }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = (route.params as { id: string }).id
</script>

<style scoped></style>
