<template>
  <div>
    <h1>Projects</h1>
    <RouterLink to="/">go to home</RouterLink>
    <DataTable v-if="projects" :data="projects" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.ts'
import { h, ref } from 'vue'
import type { Tables } from '../../../database/types'

import DataTable from '@/components/ui/data-table/DataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'

const projects = ref<Tables<'projects'>[] | null>()

// we want to call the API as soon as possile, so when page is loaded there is a hook cicle
// for that page or component, the first thing that is called is the setup function
// auto called function. This is a way to fetch data from the server as soon as posible
;(async () => {
  const { data, error } = await supabase.from('projects').select()
  if (error) console.error(error)

  projects.value = data
})()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) =>
      h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      ),
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'ID'),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('id')),
  },
  {
    accessorKey: 'slug',
    header: () => h('div', { class: 'text-left' }, 'Slug'),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('slug')),
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) =>
      h('div', { class: 'text-left' }, JSON.stringify(row.getValue('collaborators'))),
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created At'),
    cell: ({ row }) =>
      h('div', { class: 'text-left' }, new Date(row.getValue('created_at')).toLocaleDateString()),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => h('div', { class: 'text-left font-semibold' }, row.getValue('status')),
  },
]
</script>
