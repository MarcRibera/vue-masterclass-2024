<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient.ts'

import type { Tables } from '../../../database/types'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const tasks = ref<Tables<'tasks'>[] | null>()

// we want to call the API as soon as possile, so when page is loaded there is a hook cicle
// for that page or component, the first thing that is called is the setup function
// auto called function. This is a way to fetch data from the server as soon as posible
;(async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (error) console.error(error)

  tasks.value = data
})()

// ---------------------

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project ID'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.getValue('project_id'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, JSON.stringify(row.getValue('collaborators')))
    },
  },
]
</script>

<template>
  <div>
    <h1>Tasks</h1>
    <RouterLink to="/projects">go to projects</RouterLink>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}, in project -> {{ task.project_id }}
      </li>
    </ul>

    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
