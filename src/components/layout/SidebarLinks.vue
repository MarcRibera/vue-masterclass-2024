<script setup lang="ts">
interface Link {
  title: string
  to: string
  icon: string
}

const props = defineProps<{
  links: Link[]
}>()
</script>

<template>
  <RouterLink
    exact-active-class="text-primary bg-muted"
    v-for="link in props.links"
    :key="link.title"
    :to="link.to"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>
</template>

<style scoped></style>
