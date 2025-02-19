<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import { taskColumns } from '@/utils/tableColumns/taskColumn'

import type { TasksWithProjects } from '@/utils/supaQueries'
import { useErrorStore } from '@/stores/error'

usePageStore().pageData.title = 'Tasks'
const tasks = ref<TasksWithProjects | null>()

// we want to call the API as soon as possile, so when page is loaded there is a hook cicle
// for that page or component, the first thing that is called is the setup function.
const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  // set error store with db error data
  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data
}

await getTasks()

useErrorStore().setError({ error: new Error('I am a very bad error') })
</script>

<template>
  <div>
    <DataTable v-if="tasks" :columns="taskColumns" :data="tasks" />
  </div>
</template>
