<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import { taskColumns } from '@/utils/tableColumns/taskColumn'

import type { TasksWithProjects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Tasks'
const tasks = ref<TasksWithProjects | null>()

// we want to call the API as soon as possile, so when page is loaded there is a hook cicle
// for that page or component, the first thing that is called is the setup function.
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery
  if (error) console.error(error)

  tasks.value = data
}

await getTasks()
// ---------------------
</script>

<template>
  <div>
    <DataTable v-if="tasks" :columns="taskColumns" :data="tasks" />
  </div>
</template>
