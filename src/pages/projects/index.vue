<script setup lang="ts">
import { projectsQuery } from '@/utils/supaQueries'
import { projectColumns } from '@/utils/tableColumns/projectColumns'
import type { Projects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>()

// we want to call the API as soon as possile, so when page is loaded there is a hook cicle
// for that page or component, the first thing that is called is the setup function
// auto called function. This is a way to fetch data from the server as soon as posible
const getProjects = async () => {
  const { data, error } = await projectsQuery
  if (error) console.error(error)

  projects.value = data
}

await getProjects()
</script>

<template>
  <div>
    <DataTable v-if="projects" :data="projects" :columns="projectColumns" />
  </div>
</template>
